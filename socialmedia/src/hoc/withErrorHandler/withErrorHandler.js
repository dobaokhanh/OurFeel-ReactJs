import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Auxiliary from '../auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios, token) => {
    return class extends Component {

        state = {
            showModal: false,
            error: null
        };

        UNSAFE_componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(config => {
                this.setState({ error: null })
                config.params = {
                    auth: localStorage.getItem('token')
                }
                return config;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error,
                    showModal: true
                })
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        };

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.showModal}
                        onHide={() => this.setState({ error: null, showModal: false })}
                        centered>
                        <Modal.Header>{this.state.error ? this.state.error.message : null}</Modal.Header>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}



export default withErrorHandler;