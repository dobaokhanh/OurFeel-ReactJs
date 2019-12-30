import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaMapMarked, FaRegCalendarAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import Spinner from '../../../component/UI/Spinner/Spinner';
import EditProfile from './edit_profile/EditProfile';
import classes from './profile.module.css';
import Auxiliary from '../../../hoc/auxiliary/Auxiliary';
import * as actions from '../../../store/actions/index';

class Profile extends Component {

    state = {
        setEditProfileShow: false
    }

    componentDidMount() {
        this.props.onInitUserData(this.props.token, this.props.userId);
    };

    signoutClickedHandler = () => {
        this.props.onLogoutUser();
    };

    render() {
        let profile = <Spinner />;

        if (this.props.credentials) {
            profile = (
                <Card className={classes.card}>
                    <Card.Header>
                        <Card.Title>{this.props.credentials.userName}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{this.props.credentials.bio}</Card.Text>
                        <Card.Text><FaMapMarked />  {this.props.credentials.location}</Card.Text>
                        <Card.Text><FaRegCalendarAlt /> Joined {dayjs(this.props.credentials.createdAt).format('DD MMM YYYY')}</Card.Text>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip><strong>Logout</strong></Tooltip>
                            }>
                            <FaSignOutAlt className={classes.signout} onClick={this.signoutClickedHandler} />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip><strong>Edit</strong></Tooltip>
                            }>
                            <FaUserEdit className={classes.edit} onClick={() => this.setState({ setEditProfileShow: true })} />
                        </OverlayTrigger>
                        <EditProfile
                            show={this.state.setEditProfileShow}
                            onHide={() => this.setState({ setEditProfileShow: false })} />
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
        credentials: state.user.credentials,
        loading: state.user.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitUserData: (token, userId) => dispatch(actions.getUserData(token, userId)),
        onLogoutUser: () => dispatch(actions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);