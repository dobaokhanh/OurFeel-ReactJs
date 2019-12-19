import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import Spinner from '../../component/UI/Spinner/Spinner';
import classes from './signup.module.css';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';

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
        this.props.onSignup(newUserData);
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

        if (this.props.loading) signupForm = <Spinner />;

        let errorMessage = null;
        if (this.props.error)  errorMessage = (<p>{this.props.error.message}</p>);
        let authRedirect = null;
        if (this.props.authRedirectPath)   authRedirect = < Redirect to={this.props.authRedirectPath} />

        return (
            <Container className={classes.formContent}>
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    <h1>Sign Up</h1>
                    {signupForm}
                    <Button value='Sign up' />
                </form>
            </Container>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup : (newUserData) => dispatch(actions.signUp(newUserData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);