import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Image } from 'react-bootstrap';
import { FaMapMarked, FaRegCalendarAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import BurgerLogo from '../../../assets/images/burger-logo.png';
import Spinner from '../../../component/UI/Spinner/Spinner';
import classes from './profile.module.css';
import Auxiliary from '../../../hoc/auxiliary/Auxiliary';
import * as actions from '../../../store/actions/index';

class Profile extends Component {

    componentDidMount() {
        this.props.onInitUserData(this.props.token, this.props.userId);
    }

    render() {

        let profile = <Spinner />;

        if (this.props.userData) {
            profile = (
                <Card className={classes.card}>
                    <Image roundedCircle className={classes.cardImg} src={BurgerLogo}></Image>
                    <Card.Body>
                        <Card.Title>{this.props.userData.userName}</Card.Title>
                        <Card.Text>{this.props.userData.bio}</Card.Text>
                        <Card.Text><FaMapMarked />  {this.props.userData.location}</Card.Text>
                        <Card.Text><FaRegCalendarAlt /> Joined {this.props.userData.createdAt}</Card.Text>
                        <FaSignOutAlt className={classes.signout} onClick={this.signoutClickedHandler} />
                        <FaUserEdit className={classes.edit} />
                    </Card.Body>
                </Card>
            );
        }

        return (
            <Auxiliary>

                {profile}
            </Auxiliary>
        );
    };

};

const mapStateToProps = state => {
    return {
        userData: state.user.userData,
        loading: state.user.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitUserData: (token, userId) => dispatch(actions.getUserData(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);