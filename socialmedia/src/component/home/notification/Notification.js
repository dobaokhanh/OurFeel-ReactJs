import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Dropdown } from 'react-bootstrap';
import dayjs from 'dayjs';
import { FaHeart, FaCommentAlt, FaBell } from 'react-icons/fa';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Auxiliary from '../../../hoc/auxiliary/Auxiliary';
import classes from './notification.module.css';


class Notification extends Component {

    render() {
        let noti = (<p>You do not have any notification </p>);

        if (this.props.notifications) {
            this.props.notifications.sort((a, b) => {
                return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
            });
            noti = this.props.notifications.map(notification => (
                <Dropdown.Item
                    as={Link}
                    to={{
                        pathname: '/' + notification.recipientId + '/post/' + notification.postId,
                        notificationId: notification.notificationId
                    }}
                    key={notification.notificationId}
                    className={classes.link}
                >
                    {notification.type === 'liked' ? <FaHeart /> : <FaCommentAlt />} &nbsp;
                    <strong>{notification.senderName} </strong> &nbsp;
                    {notification.type} your post &emsp;
                    {dayjs(notification.createdAt).fromNow()}
                    <hr />
                </Dropdown.Item>
            ));
        }

        return (
            <Auxiliary>
                <Dropdown>
                    <Dropdown.Toggle className={classes.dropdown}>
                        <FaBell className={classes.notification} />
                        <Badge className={classes.badge}>
                            <strong>
                                {this.props.notifications
                                    .filter(noti => !noti.read)
                                    .length > 0 ? this.props.notifications.length : null}
                            </strong>
                        </Badge>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {noti}
                    </Dropdown.Menu >
                </Dropdown>
            </Auxiliary>
        );
    };
};

const mapStateToProps = state => {
    return {
        notifications: state.user.notifications
    };
};

export default connect(mapStateToProps)(withErrorHandler(Notification, axios));