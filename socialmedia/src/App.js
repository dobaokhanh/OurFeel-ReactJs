import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import NavBar from './component/navbar/Navbar';
import Login from './container/login/Login';
import * as actions from './store/actions/index';

const asyncHome = asyncComponent(() => {
  return import('./container/home/Home');
});

const asyncUserPage = asyncComponent(() => {
  return import('./container/home/user_homepage/UserPage');
});

const asyncSignup = asyncComponent(() => {
  return import('./container/signup/Signup');
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path='/signup' component={asyncSignup} />
        <Route exact path='/' component={Login} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path='/' component={asyncHome} />
          <Route exact path='/home/:userId' component={asyncUserPage} />
          <Route exact path='/:userId/post/:postId' component={asyncUserPage} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div>
        <NavBar />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
