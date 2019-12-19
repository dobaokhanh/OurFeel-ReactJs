import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './login.module.css';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import Spinner from '../../component/UI/Spinner/Spinner';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Login extends Component {

    state = {
        controls: {
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
    };

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value
            })
        })
        this.setState({ controls: updatedControls });
    }

    submitHanlder = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render() {

        const inputArray = [];

        for (let key in this.state.controls) {
            inputArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let loginForm = inputArray.map(inputElement => (
            <Input
                key={inputElement.id}
                inputConfig={inputElement.config.inputConfig}
                value={inputElement.config.value}
                changed={(event) => this.inputChangeHandler(event, inputElement.id)} />
        ));

        if (this.props.loading) {
            loginForm = <Spinner />;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        return (
            <Container className={classes.formContent}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHanlder}>
                    <h1>Login</h1>
                    {loginForm}
                    <Button value='Login' />
                </form>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);