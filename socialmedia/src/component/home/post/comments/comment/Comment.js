import React from 'react';

import { Card } from 'react-bootstrap';
import classes from './comment.module.css';

const comment = (props) => (
    <Card className={classes.card}>
        <Card.Body>
            <h5>{props.userName} <p className={classes.createdAt}>{props.createdAt}</p></h5>
            <p>{props.body}</p>
        </Card.Body>
    </Card>
);

export default comment;