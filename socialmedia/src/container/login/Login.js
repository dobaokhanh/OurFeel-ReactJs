import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

import classes from './login.module.css';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import { updateObject } from '../../shared/Utility';
import * as actions from '../../store/actions/Index';

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

    componentDidMount() {

    }

    clickedHandler = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        axios.post('/login', userData)
            .then(res => {
                console.log(res);
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            });


    }

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


        return (
            <Container className={classes.formContent}>
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
        authRedirectpath: state.auth.authRedirectpath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);