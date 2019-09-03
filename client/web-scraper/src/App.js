import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { threadId } from 'worker_threads';
import Axios from 'axios';

class App extends Component {
  constructor(){
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: ''
    }
  }

  handler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  buttonClick = (e) => {
    const { username, email, password, password2 } = this.state;
    e.preventDefault();
    const user = {
      username,
      email,
      password,
      password2

    };
    axios.post('/register', user)
      .then((res) => {
        if (res.data.success) {
          
        } else {
          console.log('if false');
          var error = new Error('Error ' + res.status + ': ' + res.statusText);
          error.res = res;
          throw error;
        }
      })
      .catch(err => {
        console.log('Error: ', err)
        // this.setState({ errors: err.response.data });
      });
  }

  render(){
    return (
      <div className="App">
        <form>
          <input type='text' onChange={this.inputHandler} name='username' />
          <input type='text' onChange={this.inputHandler} name='email' />
          <input type='text' onChange={this.inputHandler} name='password' />
          <input type='text' onChange={this.inputHandler} name='password2' />
          <button type='button' onClick={this.buttonClick} />
        </form>
      </div>
    );
  }
}

export default App;
