import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUserAccount } from '../../store/actions/userActions.js';
import './signup.css';

class Login extends Component {
  state = {
    email: null,
    password: null,
  };

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.dispatchSignupInfo(this.state);
  };

  render() {
    return (
      <div className="form-container">
        <div></div>
        <form className="white-background" onSubmit={this.submitHandler}>
          <div>
            <h1>Log In</h1>
          </div>
          <div className="error-box">
            <p>{this.props.error.error}</p>
          </div>
          <div className="form">
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="email" className="label-name">
              <span className="content-name">Email</span>
            </label>
          </div>
          <div className="form">
            <input
              type="password"
              name="password"
              id="password"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="password" className="label-name">
              <span className="content-name">Password</span>
            </label>
          </div>
          <button className="signup-login-button">Login</button>
        </form>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchSignupInfo: (formState) => {
      dispatch(loginUserAccount(formState, ownProps));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
