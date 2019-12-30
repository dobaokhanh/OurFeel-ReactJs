import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaRegHeart, FaCommentDots, FaHeart, FaRegTrashAlt } from 'react-icons/fa';
import { Media, Card, Button } from 'react-bootstrap';
import * as actions from '../../../store/actions/index';
import classes from './post.module.css';

class Post extends Component {

    isPostLiked = () => {
        if (this.props.likes && this.props.likes.find(like => (
            like.postId === this.props.postId
        ))) {
            return true;
        }
        return false;
    }

    likePostHandler = (event) => {
        event.preventDefault();
        let index = this.props.posts.findIndex( (post) => post.postId === this.props.postId);
        this.props.posts[index].likeCount++ ;
        this.props.onLikeCountChange(this.props.postId, this.props.posts[index].likeCount);
        this.props.onLikePost(this.props.postId);
    }

    unlikePostHandler = (event) => {
        event.preventDefault();
        let index = this.props.posts.findIndex( (post) => post.postId === this.props.postId);
        this.props.posts[index].likeCount--;
        let likeIndex = this.props.likes.findIndex( (like) => like.postId === this.props.postId);
        this.props.onUnlikePost(this.props.likes[likeIndex].name);
        this.props.onLikeCountChange(this.props.postId, this.props.posts[index].likeCount);
    }

    render() {
        return (
            <Card className={classes.card}>
                <Media>
                    <Media.Body className={classes.mediaBody}>
                        <h5>{this.props.name} </h5>  
                        <p className={classes.createdAt}>{this.props.createdAt}</p>
                        <p>{this.props.body}</p>
                        <p className={classes.showNo}>{this.props.likeCount} likes, {this.props.commentCount} comments</p>
                        {this.isPostLiked() ? <Button variant="light" xs={6} onClick={this.unlikePostHandler}><FaHeart /> Unlike </Button>
                            : <Button variant="light" xs={6} onClick={this.likePostHandler}> <FaRegHeart /> Like </Button>}
                        <Button variant="light" xs={6} ><FaCommentDots /> {this.props.comment} Comment </Button>
                    </Media.Body>
                </Media>
            </Card>
        )
    }
};

const mapStateToProps = state => {
    return {
        likes: state.user.likes,
        posts: state.data.posts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLikePost: (postId) => dispatch(actions.likePost(postId)),
        onUnlikePost: (name) => dispatch(actions.unlikePost(name)),
        onLikeCountChange: (postId, likeCount) => dispatch(actions.likeCountChange(postId, likeCount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);