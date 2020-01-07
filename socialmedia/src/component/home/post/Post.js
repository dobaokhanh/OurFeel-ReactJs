import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Media, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import DeletePost from './delete_post/DeletePost';
import Comments from './comments/Comments';
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

    isPostCanBeDeleted = () => {
        if (this.props.credentials && this.props.credentials.userId === this.props.userId) {
            return true;
        }
        return false;
    }

    likePostHandler = (event) => {
        event.preventDefault();
        let index = this.props.posts.findIndex((post) => post.postId === this.props.postId);
        this.props.posts[index].likeCount++;
        this.props.onLikeCountChange(this.props.postId, this.props.posts[index].likeCount);
        this.props.onLikePost(this.props.postId, this.props.dataId);
        if (this.props.userId !== this.props.credentials.userId) {
            const notification = {
                recipientName: this.props.name,
                recipientId: this.props.userId,
                senderName: this.props.credentials.userName,
                senderId: this.props.credentials.userId,
                createdAt: new Date(),
                type: 'liked',
                read: false,
            };
            this.props.onSendNotification(notification);
        }
    }

    unlikePostHandler = (event) => {
        event.preventDefault();
        let index = this.props.posts.findIndex((post) => post.postId === this.props.postId);
        this.props.posts[index].likeCount--;
        let likeIndex = this.props.likes.findIndex((like) => like.postId === this.props.postId);
        this.props.onUnlikePost(this.props.likes[likeIndex].name, this.props.dataId);
        this.props.onLikeCountChange(this.props.postId, this.props.posts[index].likeCount);
    }

    render() {
        return (
            <Card className={classes.card}>
                <Media>
                    <Media.Body className={classes.mediaBody}>
                        <h5>
                            <Link
                                to={'/home/' + this.props.userId}
                                className={classes.name}>{this.props.name}
                            </Link>
                            {this.isPostCanBeDeleted()
                                ? <DeletePost postId={this.props.postId} />
                                : null}</h5>
                        <p className={classes.createdAt}>{this.props.createdAt}</p>
                        <p>{this.props.body}</p>
                        <p className={classes.showNo}>{this.props.likeCount} likes, {this.props.commentCount} comments</p>
                        {this.isPostLiked()
                            ? <Button variant="light" xs={6}
                                onClick={this.unlikePostHandler}><FaHeart /> Unlike </Button>
                            : <Button variant="light" xs={6}
                                onClick={this.likePostHandler}> <FaRegHeart /> Like </Button>}
                        <Comments
                            postId={this.props.postId}
                            userName={this.props.name}
                            userId={this.props.userId}
                            createdAt={this.props.createdAt}
                            body={this.props.body}
                            likeCount={this.props.likeCount}
                            commentCount={this.props.commentCount}
                            showModal={this.props.showModal} />
                    </Media.Body>
                </Media>
            </Card>
        )
    }
};

const mapStateToProps = state => {
    return {
        dataId: state.user.dataId,
        credentials: state.user.credentials,
        likes: state.user.likes,
        posts: state.data.posts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLikePost: (postId, dataId) => dispatch(actions.likePost(postId, dataId)),
        onUnlikePost: (name, dataId) => dispatch(actions.unlikePost(name, dataId)),
        onLikeCountChange: (postId, likeCount) => dispatch(actions.likeCountChange(postId, likeCount)),
        onSendNotification: (notification) => dispatch(actions.sendNotification(notification))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Post, axios));