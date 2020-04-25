import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Footer = ({auth:{ isAuthenticated, loading}, logout}) => {

  const guestLinks = (
    <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
  );
    return (
    <div className='ff'>
        <div></div>
      <div className='footer bg-dark'>
        <h1 className='left'>&copy; The Hindu Education Plus Club 2014-2020. All Rights Reserved.</h1>
        <div className='right'>For any technical difficulties, contact : tech@thepcvit.com.</div>
      </div>
      </div>
    )
};

Footer.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Footer);