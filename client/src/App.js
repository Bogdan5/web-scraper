import React, { Component } from 'react';
// import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Register from './components/Register.js';
import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

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