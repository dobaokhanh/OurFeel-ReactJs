import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { updateObject } from '../../../../shared/utility';

class EditProfile extends Component {

    state = {
        controls: {
            name: {
                label: 'User Name',
                type: 'text',
                value: ''
            },
            bio: {
                label: 'Bio',
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

    submitHandler = (event) => {
        event.preventDefault();
        const newUserData = {
            
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value
            })
        });
        this.setState({ controls: updatedControls});
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
            <Form.Group key={inputElement.id}>
                <Form.Label>{inputElement.config.label}</Form.Label>
                <Form.Control 
                    type={inputElement.config.type}
                    value={inputElement.config.value}
                    onChange={(event) => this.inputChangedHandler(event, inputElement.id)} />
            </Form.Group>
        ));

        return (
            <Modal>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Information</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                        {editProfileForm}
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
export default EditProfile;