import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';

import { updateObject } from '../../shared/utility';
import Post from '../../component/home/post/Post';
import Profile from '../../component/home/profile/Profile';

class Home extends Component {

    componentDidMount() {

    }

    likeClickedHandler = () => {
        let updatedPost = null;
        if (!this.state.post.isLike) {
            updatedPost = updateObject(this.state.post, {
                interact: {
                    likeCount: this.state.post.interact.likeCount + 1,
                    commentCount: this.state.post.interact.commentCount
                },
                isLike: true
            });
        } else {
            updatedPost = updateObject(this.state.post, {
                interact: {
                    likeCount: this.state.post.interact.likeCount - 1,
                    commentCount: this.state.post.interact.commentCount
                },
                isLike: false
            });
        }
        this.setState({ post: updatedPost });
    }

    render() {
        dayjs.extend(relativeTime);
        return (
            <Container>
                <Row>
                    <Col xs={12} md={8} />
                    {/* <Post
                            name={this.props.post.name}
                            avatar={this.props.post.avatar}
                            content={this.props.post.content}
                            createAt={dayjs(this.props.post.createAt).fromNow()}
                            like={this.props.post.interact.likeCount}
                            comment={this.props.post.interact.commentCount}
                            isLike={this.props.post.isLike}
                            likeClicked={this.likeClickedHandler} /> </Col> */}
                    <Col xs={12} md={4}>
                        <Profile />
                    </Col>
                </Row>
            </Container>
        )
    }
}

 
export default Home;