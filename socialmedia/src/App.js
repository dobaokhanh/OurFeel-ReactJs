import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './component/navbar/Navbar';
import Login from './container/login/Login';
import Home from './container/home/Home';
import Signup from './container/signup/Signup';
import * as actions from './store/actions/index';
import './App.css';

class App extends Component{

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {

    let routes = (
      <Switch>
          <Route path='/signup' component={Signup} />
          <Route exact path='/' component={Login} />
          <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
           <Route path='/home' component={Home} />
           <Redirect to='/home' />
        </Switch>
      )
    }

    return (
      <div className="App">
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
