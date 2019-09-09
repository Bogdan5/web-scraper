import React, { Component } from 'react';
// import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import { Nav } from 'react-bootstrap';

import Register from './components/Register.js';
import Login from './components/Login.js';

import { Provider } from "react-redux";
import store from "./store";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      registered: false
    };
  }

  render(){
    const { registered } = this.state;
    return (
      <Provider store={store}>
        <div className='App'>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link as={Link} eventKey="1" to='/' exact >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} eventKey="2" active={registered} to='/login'>
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} eventKey="3" to='/register'>
                Register
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;