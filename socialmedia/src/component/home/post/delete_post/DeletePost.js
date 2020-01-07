import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, OverlayTrigger, Tooltip, Form, Button } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa';

import axios from '../../../../axios-orders';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import Auxiliary from '../../../../hoc/auxiliary/Auxiliary';
import * as actions from '../../../../store/actions/index';
import classes from './deletePost.module.css';

class DeletePost extends Component {

    state = {
        setDeleteDialogShow: false
    };

    deletePostHandler = () => {
        this.props.onDeletePost(this.props.postId);
        this.setState({ setDeleteDialogShow: false });
    }

    render() {
        return (
            <Auxiliary>
                <OverlayTrigger
                    placement='bottom'
                    overlay={
                        <Tooltip><strong>Delete</strong></Tooltip>
                    }>
                    <FaRegTrashAlt className={classes.delete} onClick={() => this.setState({ setDeleteDialogShow: true })} />
                </OverlayTrigger>

                <Modal
                    show={this.state.setDeleteDialogShow}
                    onHide={() => this.setState({ setDeleteDialogShow: false })}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>Are you sure you want to delete this post ?</Form.Label>
                            <Form.Group>
                                <Button variant='danger' onClick={this.deletePostHandler}> Delete </Button>
                                <Button variant='secondary' onClick={() => this.setState({ setDeleteDialogShow: false })}> Cancel </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Auxiliary>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeletePost: (postId) => dispatch(actions.deletePost(postId))
    }
}

export default connect(null, mapDispatchToProps)(withErrorHandler(DeletePost, axios));