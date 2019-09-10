import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { browserHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

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
    this.props.registerUser(user, this.props.history);
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  registerUser: () => dispatch(registerUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
