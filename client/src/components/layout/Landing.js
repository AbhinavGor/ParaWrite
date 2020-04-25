import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


export const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }
    return (
        <section className="landing">
          <div className='landing-inner'>
          <h1 className="x-large">ParaWrite</h1>
          <p className='lead2'>Choose a topic of your own and write a news article. The solution presented has to be thoroughly explained well-argued and justified. It has to make link to a bigger global picture. <br /><strong>May the force be with you.</strong></p>
          <p className="lead">
            Login/Register to participate
          </p>
          <div className="buttons">
            <Link to="/register" className="signup">Sign Up</Link>
            <Link to="/login" className="login">Login</Link>
            </div>
          </div>
    </section>
    )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
