import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaCommentDots, FaRegHeart } from 'react-icons/fa';

import Auxiliary from '../../../../hoc/auxiliary/Auxiliary';
import Comment from './comment/Comment';
import * as actions from '../../../../store/actions/index';
import classes from './comments.module.css';

class Comments extends Component {

    state = {
        setShowComment: false,
        comment: null
    };

    commentClickedHandler = () => {
        this.props.onInitComments(this.props.postId);
        this.setState({ setShowComment: true })
    }

    commentChangeHandler = (event) => {
        this.setState({ comment: event.target.value });
    };

    commentSubmitHandler = (event) => {
        event.preventDefault();
        const newComment = {
            comment: this.state.comment,
            userId: this.props.userId,
            userName: this.props.userName,
            createdAt: new Date()
        };
        this.props.onAddNewComment(this.props.postId, newComment);
        const commentCount = this.props.commentCount + 1;
        this.props.onCommentCountChange(this.props.postId, commentCount);
    };

    render() {

        let comments = null;

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
                    type='submit'
                    variant="light" xs={6}
                    onClick={this.commentClickedHandler}>
                    <FaCommentDots /> Comment </Button>
                <Modal
                    show={this.state.setShowComment}
                    onHide={() => this.setState({ setShowComment: false })}
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
                            required />
                        <Button
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
        comments: state.data.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitComments: (postId) => dispatch(actions.fetchComments(postId)),
        onAddNewComment: (postId, comment) => dispatch(actions.addNewComment(postId, comment)),
        onCommentCountChange: (postId, commentCount) => dispatch(actions.commentCountChange(postId, commentCount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);