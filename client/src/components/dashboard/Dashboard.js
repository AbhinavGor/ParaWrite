import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';


const Dashboard = ({getCurrentProfile, auth:{user}, profile:{profile, loading}}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);


    return loading && profile === null ? <Spinner /> : <Fragment>
        <p className = 'large'>
            <i className= 'fas fa-user'></i> Welcome <strong>{user && user.name}</strong>
        </p>
        <Fragment>
            <h1 className='large text-primary'>Rules and Conditions</h1>
            <div className='indent1'>
                <ol>
                    <li>Choose a topic of your own and write a news article.</li>
                    <li>The article should contain a minimum of 200 words and a maximum of 820 words.</li>
                    <li>Only <strong>one submission</strong> is allowed.</li>
                </ol>
            </div>
            <h1 className='large text-primary'>Evaluation Criteria</h1>
            <div className='indent1'>
                <h3>Composition</h3>
                <div className='indent2'>
                    <ol>
                        <li>The submission has to be well-structured and has to cover who, what, where, why, when and how.</li>
                        <li>The article has to have a beginning, middle and end.</li>
                    </ol>
                </div>
            </div>
            <div className='indent1'>
                <h3>Fair, balanced and objective reporting</h3>
                <div className='indent2'>
                    <ol>
                        <li>The submission has to be balanced and fair in terms of representing different sides of an argument prior to offering a suggestion of potential solutions.</li>
                        <li>The quotes used have to be from real, credible sources.</li>
                        <li>Scientific and statistical reporting must be accurate and should be supported by sources/footnotes.</li>
                    </ol>
                </div>
            </div>
            <div className='indent1'>
                <h3>Others</h3>
                <div className='indent2'>
                    <ol>
                        <li>The submission should cover relevant historical, economic, social and/or political implications and possible consequences.</li>
                        <li>Solution presented has to be thoroughly explained, well argued and justified.</li>
                    </ol><br />
                    {/* <Link to={`/posts`} class='btn btn-primary'>
                Upload Here
            </Link> */}
                </div>
            </div>
            <br /><br /><br />
        </Fragment>
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile})(Dashboard);
