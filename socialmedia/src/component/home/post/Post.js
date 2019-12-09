import React from 'react';
import { FaRegHeart, FaCommentDots, FaHeart } from 'react-icons/fa';
import { Media, Card, Button } from 'react-bootstrap';
import classes from './post.module.css';

const Post = (props) => (
    <Card className={classes.card}>
        <Media>
            <img width={64} height={64} className="mr-3" src={props.avatar} alt="Avatar" />
            <Media.Body className={classes.mediaBody}>
                <h5>{props.name}</h5>
                <p>{props.createAt}</p>
                <p>{props.content}</p>
                <p className={classes.showNo}>{props.like} likes, {props.comment} comments</p>
                <Button variant="light" xs={6} onClick={props.likeClicked}> {props.isLike ? <FaHeart /> : <FaRegHeart />} {props.like} Like </Button>.
                <Button variant="light" xs={6} ><FaCommentDots /> {props.comment} Comment </Button>
            </Media.Body>
        </Media>
    </Card>
);

export default Post;