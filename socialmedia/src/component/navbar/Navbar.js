import React, { Component } from 'react';

import { Navbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaPlus, FaHome } from 'react-icons/fa';

import Auxiliary from '../../hoc/auxiliary/Auxiliary';
import NewPost from '../../component/home/post/new_post/NewPost';
import Notification from '../../component/home/notification/Notification';
import classes from './navbar.module.css';

class NavBar extends Component {

    state = {
        newPostShow: false
    }

    render() {
        let navbar = (
            <Navbar className={classes.navbar}>
                <Nav className={classes.nav}>
                    <Nav.Link as={Link} to='/'>Login</Nav.Link>
                    <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                </Nav>
            </Navbar>
        );

        if (this.props.authenticated) {
            navbar = (
                <Navbar className={classes.navbar}>
                    <Nav className={classes.nav}>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip><strong>New</strong></Tooltip>
                            }>
                            <FaPlus className={classes.button} onClick={() => this.setState({ newPostShow: true })} />
                        </OverlayTrigger>
                        <NewPost
                            show={this.state.newPostShow}
                            onHide={() => this.setState({ newPostShow: false })} />
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip><strong>Home</strong></Tooltip>
                            }>
                            <Link to='/home'><FaHome className={classes.button} /></Link>
                        </OverlayTrigger>
                        <Notification />
                    </Nav>
                </Navbar>
            )
        }

        return (
            <Auxiliary>
                {navbar}
            </Auxiliary>
        );
    };
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(NavBar);