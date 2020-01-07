import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { FaMapMarked, FaRegCalendarAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import Auxiliary from '../../../../hoc/auxiliary/Auxiliary';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './staticProfile.module.css';

class StaticProfile extends Component {

    render() {
        let profile = <Spinner />

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
                    </Card.Body>
                </Card>
            );
        };

        return (
            <Auxiliary>
                {profile}
            </Auxiliary>
        );
    };
};

export default StaticProfile;