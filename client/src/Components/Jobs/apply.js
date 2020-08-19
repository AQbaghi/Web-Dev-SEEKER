import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../Signup-and-Login/signup.css';

class Apply extends Component {
  state = {};

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.userAccount ? (
          <div className="form-container">
            <div className="form-inner-comtainer">
              <form
                className="white-background main-form"
                onSubmit={this.submitHandler}
                method="post"
                encType="multipart/form-data"
                action="/upload"
              >
                <div>
                  <h1 className="form-title">Apply to Job</h1>
                </div>
                <div className="form">
                  <input
                    type="text"
                    name="additionalInformation"
                    id="additionalInformation"
                    autoComplete="off"
                    onChange={this.inputChangeHandler}
                  />
                  <label htmlFor="additionalInformation" className="label-name">
                    <span className="content-name">Additional information</span>
                  </label>
                </div>
                <div className="profile-picture-input">
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      name="inpFile"
                      id="inpFile"
                      onChange={this.selectImageHandler}
                      className="input-avatar"
                    />
                    Attach your CV
                  </label>
                  <div className="image-preview" id="imagePreview">
                    <img src="" alt="" className="image-preview__image" />
                    <span className="image-preview__default-text">CV</span>
                  </div>
                </div>
                <button className="signup-login-button">Submit</button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.auth.userAccount,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     dispatchSignupInfo: (formState) => {
//       console.log(formState);
//       dispatch(signupUserAccount(formState, ownProps));
//     },
//   };
// };

export default connect(mapStateToProps)(Apply);
