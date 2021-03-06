import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:'',
    });

    const {name, email, password, password2} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match', 'danger');
        }else{
            register({name, email, password});
        }
    };

    if(isAuthenticated){
      setAlert('Registration Successful you can submit articles from 27th April.', 'success');
      return <Redirect to='/login' />
    }
    return <Fragment>
      <h1 className="large text-primary-login">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit = {e => onSubmit(e)}>
        <div className="form-group">
          <input className="text-box" type="text" placeholder="Name" name="name" value = {name} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input className="text-box" type="email" placeholder="Email Address" name="email" value = {email} onChange={e => onChange(e)}/>     
        </div>
        <div className="form-group">
          <input
            className="text-box"
            type="password"
            placeholder="Password"
            name="password"
            value = {password} 
            onChange={e => onChange(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            className="text-box effect-2"
            type="password"
            placeholder="Confirm Password"
            name='password2'
            value = {password2}
            onChange={e => onChange(e)}
            
          /><span class="focus-border"></span>
        </div>
        <input type="submit" className="signup" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
}

Register.propTypes = {
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register)