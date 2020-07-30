import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCompany } from '../../store/actions/companyActions.js';
import '../Signup-and-Login/signup.css';

class StartCompany extends Component {
  state = {
    companyName: null,
    description: null,
    location: null,
  };

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.dispatchCompanyInfo(this.state);
  };

  render() {
    return (
      <div className="form-container">
        <div></div>
        <form className="white-background" onSubmit={this.submitHandler}>
          <div>
            <h1>Start your Company</h1>
          </div>
          <div className="error-box">
            <p>{this.props.error.error}</p>
          </div>
          <div className="form">
            <input
              type="text"
              name="companyName"
              id="companyName"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="companyName" className="label-name">
              <span className="content-name">Company Name</span>
            </label>
          </div>
          <div className="form">
            <input
              type="text"
              name="companyDescription"
              id="companyDescription"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="companyDescription" className="label-name">
              <span className="content-name">Company Description</span>
            </label>
          </div>
          <div className="form">
            <input
              type="text"
              name="location"
              id="location"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="location" className="label-name">
              <span className="content-name">Company Location</span>
            </label>
          </div>
          <button className="signup-login-button">Submit</button>
        </form>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticatedUser: state.auth.userAccount,
    error: state.companyReducer.error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchCompanyInfo: (formState) => {
      dispatch(startCompany(formState, ownProps));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartCompany);
