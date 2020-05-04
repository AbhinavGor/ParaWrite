import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';


const Posts = ({ getPosts, auth,  user, post: {posts, loading, _id, text, name, avatar, likes, date}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                {auth.user.member &&(<div><h1><i className='fas fa-user-lock'></i> Welcome to ParaWrite</h1><h4 className='successalert'>Admin Access</h4></div>)}
                {!auth.user.member &&(<div><i className='fas fa-user'></i> Welcome to ParaWrite<div className='bg-primary p'><small>Results will be announced on 7th May.</small> </div></div>)}
            </p>
            <div className='primary-bg p'>
            <h3 className='dangeralert'>Submissions closed</h3>
            </div>
            <PostForm />
            {auth.user.hasposted &&(
                <div className='posts'>
                {posts.map(post => (
                    <PostItem key = {post.id} post={post} />
                ))}
            </div>
            )}
        </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth,
    user: state.user,
});
export default connect(mapStateToProps, {getPosts})(Posts);
