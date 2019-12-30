import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Form } from 'react-bootstrap';
import * as actions from '../../../../store/actions/index';
import Button from '../../../UI/Button/Button';

class NewPost extends Component {

    state = {
        newpost: null
    }

    inputChangedHandler = (event) => {
        this.setState({newpost: event.target.value});
    };

    submitHandler = (event) => {
        event.preventDefault();
        const newPostData = {
            body: this.state.newpost,
            userName: this.props.credentials.userName,
            createdAt: new Date(),
            commentCount: 0,
            likeCount: 0
        };
        this.props.onAddNewPost(newPostData);
        this.props.onHide();
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group>
                            <Form.Label>New Post</Form.Label>
                            <Form.Control
                                as='textarea'
                                onChange={this.inputChangedHandler}
                                placeholder='How do you feel !!' 
                                required />
                        </Form.Group>
                        <Button value="Submit" />
                    </Form>
                </Modal.Body>
            </Modal>
        );
    };
};

const mapStateToProps = state => {
    return {
        credentials: state.user.credentials
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddNewPost: (newPost) => dispatch(actions.addNewPost(newPost))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);