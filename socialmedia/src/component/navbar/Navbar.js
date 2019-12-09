import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classes from './navbar.module.css';

const navbar = (props) => (
    <Navbar className={classes.navbar}>
        <Nav className={classes.nav}>
            <Nav.Link as={Link} to='/'>Login</Nav.Link>
            <Nav.Link as={Link} to='/home'>Home</Nav.Link>
            <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
        </Nav>
    </Navbar>
);

export default navbar;