import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost} from '../../actions/post';

const PostItem = ( {addLike, removeLike, deletePost, auth, post:  {_id, text, name, avatar, user, likes, date}, showActions}) => 
        
        <div class="post bg-white p-1 my-1">
          <div>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
          </div>
          <div>
            <p class="my-1">
              {text.slice(0,800)} . . . . . . . . . .
            </p>
             <p class="post-date">
                Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            
            <Fragment>
            
                
                   <Fragment>
                    <span>
                    {auth.user.member && (<button onClick = {e => addLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-arrow-up"></i> 
              <span>{likes.length > 0 && (
                  <span > {likes.length}</span>
              )}</span>
            </button>)}</span>
            <span>{auth.user.member && (<button onClick = {e => removeLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-arrow-down"></i> 
              <span>{likes.length > 0 && (
                  <span > </span>
              )}</span>
            </button>)}</span>
            
            <Link to={`/posts/${_id}`} class='btn btn-primary'>
                View Post
            </Link>
            {/* {!auth.loading && user === auth.user._id &&(
                <button onClick = { e => deletePost(_id)} type="button" class="btn btn-danger">
                      <i class="fas fa-times"></i>
                </button>)} */}
                  </Fragment>
                    
                  
                </Fragment>     
          </div>
        </div>

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem);
