import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUserAccount } from '../../store/actions/jobActions.js';
import './signup.css';

class Signup extends Component {
  state = {
    firstName: null,
    lastName: null,
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
        <form onSubmit={this.submitHandler}>
          <div>
            <h1>Sign Up</h1>
          </div>
          <div className="form">
            <input
              type="text"
              name="first-name"
              id="firstName"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="first-name" className="label-name">
              <span className="content-name">Fist Name</span>
            </label>
          </div>
          <div className="form">
            <input
              type="text"
              name="last-name"
              id="lastName"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="last-name" className="label-name">
              <span className="content-name">Last Name</span>
            </label>
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
          <button className="signup-login-button">Signup</button>
        </form>
        <div></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchSignupInfo: (formState) => {
      dispatch(signupUserAccount(formState));
    },
  };
};

export default connect(null, mapDispatchToProps)(Signup);
