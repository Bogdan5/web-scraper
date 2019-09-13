import React, { Component } from 'react';
import '../App.scss';
// import axios from 'axios';
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

  componentDidUpdate(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      console.log('Auth');
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    // if (Object.keys(nextProps.errors).length) {
    //   console.log('Errors', nextProps.errors);
    //   this.setState({
    //     errors: nextProps.errors
    //   });
    // }
  }

  handler = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  submit = (e) => {
    const { username, password } = this.state;
    e.preventDefault();
    const userData = { username, password };
    this.props.loginUser(userData);
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
