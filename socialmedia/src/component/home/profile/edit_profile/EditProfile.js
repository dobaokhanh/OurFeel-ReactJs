import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

import { updateObject } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';
import Button from '../../../UI/Button/Button';
import classes from './editProfile.module.css';

class EditProfile extends Component {

    state = {
        controls: {
            userName: {
                label: 'User Name',
                type: 'text',
                value: ''
            },
            bio: {
                label: 'Bio Quote',
                type: 'text',
                value: ''
            },
            location: {
                label: 'Location',
                type: 'text',
                value: ''
            }
        }
    };

    componentDidMount() {
        let initControlsInformation = updateObject(this.state.controls, {});
        for (let key in initControlsInformation) {
            initControlsInformation[key].value = this.props.credentials[key];
        }
        this.setState({ controls: initControlsInformation });
    };

    submitHandler = (event) => {
        event.preventDefault();
        const editedInformation = updateObject(this.props.credentials, {});
        for (let key in this.state.controls) {
            editedInformation[key] = this.state.controls[key].value;
        }
        this.props.onSaveUserData(this.props.token, this.props.userId, editedInformation);
        this.props.onHide();
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value
            })
        });
        this.setState({ controls: updatedControls });
    };

    render() {

        let inputElementArray = [];

        for (let key in this.state.controls) {
            inputElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let editProfileForm = inputElementArray.map(inputElement => (
            <Form.Group key={inputElement.id} >
                <Form.Label>{inputElement.config.label}</Form.Label>
                <Form.Control
                    type={inputElement.config.type}
                    value={inputElement.config.value}
                    onChange={(event) => this.inputChangedHandler(event, inputElement.id)} />
            </Form.Group>
        ));
        return (
            <Modal className={classes.modal}
                show={this.props.show}
                onHide={this.props.onHide}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Information</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                        {editProfileForm}
                        <Button value="Submit" />
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        credentials: state.user.credentials,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveUserData: (token, userId, userData) => dispatch(actions.saveUserData(token, userId, userData)),
        onGetUserData: (token, userId) => dispatch(actions.getUserData(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);