import React, { Component } from 'react';
import '../App.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  submit = (e) => {
    const { username, password } = this.state;
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);

    // const user = { username, password };
    // axios.post('/login', user)
    //   .then((res) => {
    //     if (res.data.success) {
    //       return res.status(200).send('Signed in!');
    //     }
    //     console.log('Error ');
    //     return res.status(400).send('Error');

    //   })
    //   .catch((err) => {
    //     console.log('Error ', err);
    //     throw err;
    //   })
  }

  render(){
    return(
      <div className='Login'>
        <form onSubmit={this.submit}>
          <label htmlFor='' />
          <input type='text' id='username' placeholder='Username' onChange={this.handler} />
          <label htmlFor='' />
          <input type='text' id='password' placeholder='Password' onChange={this.handler} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
