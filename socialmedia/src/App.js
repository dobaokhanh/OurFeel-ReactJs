import React, { Component } from 'react';
import { withRouter, Route, Switch} from 'react-router-dom';

import Layout from './hoc/layout/Layout';
import Login from './container/login/Login';
import Home from './container/home/Home';
import Signup from './container/signup/Signup';
import './App.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <Layout />
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/signup' component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
