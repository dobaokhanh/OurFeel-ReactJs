import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import StaticProfile from '../../../component/home/profile/static_profile/StaticProfile';
import Post from '../../../component/home/post/Post';
import Spinner from '../../../component/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

class UserPage extends Component {

    state = {
        credentials: null,
        postsFetchedByUserId: [],
        postIdParam: null,
        error: null
    }

    componentDidUpdate (prevProps) {
        const postId = this.props.match.params.postId; 
        if (prevProps.match.params !== this.props.match.params) {
            this.setState({ postIdParam: postId })
        }
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        if (postId) {
            this.setState({ postIdParam: postId })
        }

        const queryParam = '?auth=' + this.props.token + '&orderBy="credentials/userId"&equalTo="' + this.props.match.params.userId + '"';
        axios.get('/users.json' + queryParam)
            .then(res => {
                let userData = null;
                for (let key in res.data) {
                    userData = {
                        ...res.data[key].credentials,
                    };
                };
                this.setState({credentials: userData});
            })
            .catch(err => {
                this.setState({error: err});
            });

        const postsFetchById = this.props.posts.filter(post => post.userId === this.props.match.params.userId);
        this.setState({postsFetchedByUserId: postsFetchById});
    };

    render() {
        dayjs.extend(relativeTime);
        let postsFetched = <Spinner />;
        if (this.state.postsFetchedByUserId) {
            this.state.postsFetchedByUserId.sort((a, b) => {
                return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
            });
            postsFetched = this.state.postsFetchedByUserId.map(post => {
                if (post.postId !== this.state.postIdParam)
                    return <Post
                        key={post.postId}
                        postId={post.postId}
                        userId={post.userId}
                        name={post.userName}
                        body={post.body}
                        createdAt={dayjs(post.createdAt).fromNow()}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount}
                    />;
                else return <Post
                    key={post.postId}
                    postId={post.postId}
                    userId={post.userId}
                    name={post.userName}
                    body={post.body}
                    createdAt={dayjs(post.createdAt).fromNow()}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    showModal
                />
            });
        }

        return (
            <Container>
                <Row>
                    <Col xs={12} md={8} >
                        {postsFetched}
                    </Col>
                    <Col xs={12} md={4}>
                        <StaticProfile credentials={this.state.credentials} />
                    </Col>
                </Row>
            </Container>
        );
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        posts: state.data.posts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUserData: (token, userId) => dispatch(actions.getUserData(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserPage, axios));