import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from "../layout/Spinner";
import Moment from 'react-moment';
import { getPost } from "../../actions/post";

const Post = ({ getPost, post: {post, loading}, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return loading || post === null ? (<Spinner /> ): (
    <Fragment>
        <Link to='/posts' className = 'btn'>
            Back to Posts
        </Link>
        <div class="post bg-white p-1 my-1">
          <div>
              <img
                class="round-img"
                src={post.avatar}
                alt=""
              />
              <h4>{post.name}</h4>
          </div>
          <div>
            <p class="my-1">
              {post.text}
            </p>
             <p class="post-date">
                Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment>
            </p>
            </div>
            </div>
    </Fragment>
    
    )
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post)
