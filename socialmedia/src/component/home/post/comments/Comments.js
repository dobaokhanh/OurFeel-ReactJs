import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaCommentDots, FaRegHeart } from 'react-icons/fa';

import axios from '../../../../axios-orders';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import Auxiliary from '../../../../hoc/auxiliary/Auxiliary';
import Comment from './comment/Comment';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../../store/actions/index';
import classes from './comments.module.css';

class Comments extends Component {

    state = {
        setShowComment: false,
        comment: '',
        loading: this.props.loading
    };

    static getDerivedStateFromProps(props, state) {
        if (props.loading !== state.loading) {
            return {
                ...state,
                comment: '',
                loading: props.loading
            };
        }
        return null;
    };

    componentDidMount() {
        if (this.props.showModal) {
            this.commentClickedHandler();
        }
    };

    commentHideHandler = () => {
        this.setState({ setShowComment: false });
        this.props.onClearComments();
    };

    commentClickedHandler = () => {
        this.props.onInitComments(this.props.postId);
        this.setState({ setShowComment: true })
    };

    commentChangeHandler = (event) => {
        this.setState({ comment: event.target.value });
    };

    commentSubmitHandler = (event) => {
        event.preventDefault();
        const newComment = {
            comment: this.state.comment,
            userId: this.props.credentials.userId,
            userName: this.props.credentials.userName,
            createdAt: new Date()
        };
        this.props.onAddNewComment(this.props.postId, newComment);
        const commentCount = this.props.commentCount + 1;
        this.props.onCommentCountChange(this.props.postId, commentCount);
        if (this.props.userId !== this.props.credentials.userId) {
            const notification = {
                postId: this.props.postId,
                recipientName: this.props.userName,
                recipientId: this.props.userId,
                senderName: this.props.credentials.userName,
                senderId: this.props.credentials.userId,
                createdAt: new Date(),
                type: 'commented',
                read: false,
            };
            this.props.onSendNotification(notification);
        }
    };

    render() {

        let comments = null;

        if (this.props.loading) {
            comments = <Spinner />
        }

        if (this.props.comments) {
            this.props.comments.sort((a, b) => {
                return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
            });

            comments = this.props.comments.map(comment => (
                <Comment
                    key={comment.commentId}
                    userName={comment.userName}
                    createdAt={dayjs(comment.createdAt).fromNow()}
                    body={comment.comment}
                />
            ));
        }

        return (
            <Auxiliary>
                <Button
                    variant="light" xs={6}
                    onClick={this.commentClickedHandler}>
                    <FaCommentDots /> Comment </Button>
                <Modal
                    show={this.state.setShowComment}
                    onHide={this.commentHideHandler}
                    centered>
                    <Modal.Header>
                        <h5>@{this.props.userName} </h5>
                        <p>{this.props.createdAt}</p>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.body}</p>
                        <p> <FaRegHeart /> {this.props.likeCount} Likes <FaCommentDots />  {this.props.commentCount} Comments</p>
                        <Form.Control
                            className={classes.textArea}
                            as='textarea'
                            onChange={this.commentChangeHandler}
                            placeholder='Comment'
                            value={this.state.comment}
                            required />
                        <Button
                            type='submit'
                            variant='primary'
                            onClick={this.commentSubmitHandler}>Submit</Button>
                        {comments}
                    </Modal.Body>
                </Modal>
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        credentials: state.user.credentials,
        comments: state.data.comments,
        loading: state.data.loadingComments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitComments: (postId) => dispatch(actions.fetchComments(postId)),
        onClearComments: () => dispatch(actions.clearComment()),
        onAddNewComment: (postId, comment) => dispatch(actions.addNewComment(postId, comment)),
        onCommentCountChange: (postId, commentCount) => dispatch(actions.commentCountChange(postId, commentCount)),
        onSendNotification: (notification) => dispatch(actions.sendNotification(notification)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Comments, axios));