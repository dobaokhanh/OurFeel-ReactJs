import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Post from '../../component/home/post/Post';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Profile from '../../component/home/profile/Profile';

class Home extends Component {

    componentDidMount() {
        this.props.onFetchPosts(this.props.token);
    }

    render() {
        dayjs.extend(relativeTime);

        let postsFetched = <Spinner />;

        if (!this.props.posts) postsFetched = null;

        if (this.props.posts) {
            this.props.posts.sort((a, b) => {
                return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
            });
            postsFetched = this.props.posts.map(post => (
                <Post
                    key={post.postId}
                    postId={post.postId}
                    userId={post.userId}
                    name={post.userName}
                    body={post.body}
                    createdAt={dayjs(post.createdAt).fromNow()}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                />
            ));
        }

        return (
            <Container>
                <Row>
                    <Col xs={12} md={8} >
                        {postsFetched}
                    </Col>
                    <Col xs={12} md={4}>
                        <Profile />
                    </Col>
                </Row>
            </Container>
        );
    };
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        posts: state.data.posts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(actions.fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Home, axios));