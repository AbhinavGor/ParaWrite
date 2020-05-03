import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Pagination from 'react-js-pagination';


const Posts = ({ getPosts, auth,  user, post: {posts, loading, _id, text, name, avatar, likes, date}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome to ParaWrite
            </p>
            <div className='bg-primary p'>
                <h3 className='danger'>Submissions closed</h3>
                <small>Results will be announced on 7th May.</small>
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
