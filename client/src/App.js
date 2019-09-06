import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, NavLink } from 'react-router-dom';
import Register from './component/Register.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  render(){
    return (
      <div className='App'>
        <Switch>
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;