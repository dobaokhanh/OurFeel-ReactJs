import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import classes from './signup.module.css';
import { updateObject } from '../../shared/Utility';
import * as actions from '../../store/actions/Index';

class Signup extends Component {

    state = {
        controls: {
            name: {
                inputConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                value: ''
            },
            email: {
                inputConfig: {
                    type: 'email',
                    placeholder: 'Enter email'
                },
                value: ''
            },
            password: {
                inputConfig: {
                    type: 'password',
                    placeholder: 'Enter password'
                },
                value: ''
            }
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value
            })
        });
        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        event.preventDefault();
        const newUserData = {
            name: this.state.controls.name.value,
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        };
        this.props.onSignup(newUserData, this.props.history);
    }

    render() {

        let inputElementArray = [];

        for (let key in this.state.controls) {
            inputElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let signupForm = inputElementArray.map(inputElement => (
            <Input
                key={inputElement.id}
                inputConfig={inputElement.config.inputConfig}
                value={inputElement.config.value}
                changed={(event) => this.inputChangedHandler(event, inputElement.id)} />
        ));

        return (
            <Container className={classes.formContent}>
                <form onSubmit={this.submitHandler}>
                    <h1>Sign Up</h1>
                    {signupForm}
                    <Button value='Sign up' />
                </form>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup : (newUserData) => dispatch(actions.signUp(newUserData))
    }
}

export default connect(null, mapDispatchToProps)(Signup);