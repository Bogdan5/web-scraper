import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

// import { browserHistory } from 'react-router';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  handler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  submit = (e) => {
    const { username, email, password, password2 } = this.state;
    e.preventDefault();
    const user = { username, email, password, password2 };
    axios.post('/register', user)
      .then((res) => {
        if (res.data.success) {
          console.log('Response is: ', res);
          res.redirect('/');
        } else {
          console.log('if false');
          var error = new Error('Error ' + res.status + ': ' + res.statusText);
          error.res = res;
          throw error;
        }
      }
    )
    .catch(err => console.log(err));
  }

  render(){
    return (
      <div>
        <form noValidate onSubmit={this.submit}>
          <label htmlFor='username'>Username</label>
          <input type='text' placeholder='Username'
          onChange={this.handler} id='username' />
          <label htmlFor='email'>Email</label>
          <input type='text' placeholder='Email'
          onChange={this.handler} id='email' />
          <label htmlFor='password'>Password</label>
          <input type='text' placeholder='Password'
          onChange={this.handler} id='password' />
          <label htmlFor='password2'>Confirm password</label>
          <input type='text' placeholder='Confirm password'
          onChange={this.handler} id='password2' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
