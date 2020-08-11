import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUserAccount } from '../../store/actions/userActions.js';
import './signup.css';

class Signup extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    profilePicture: null,
    formData: null,
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

  //image handler
  selectImageHandler = (e) => {
    //selecting the dom elements to preview image
    const prefviewDefaultText = document.querySelector(
      '.image-preview__default-text'
    );
    const previewImage = document.querySelector('.image-preview__image');

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const formData = new FormData();
      //display image
      prefviewDefaultText.style.display = 'none';
      previewImage.style.display = 'block';

      //inload event and set state to image data url
      reader.addEventListener('load', () => {
        previewImage.setAttribute('src', reader.result);
        this.setState({
          ...this.state,
          avatar: reader,
          formData: formData,
        });
      });

      formData.append('avatar', file);
      console.log(formData);

      //reading the file as data url
      reader.readAsDataURL(file);
    } else {
      //display default text in dom
      prefviewDefaultText.style.display = null;
      previewImage.style.display = null;
    }
  };

  render() {
    return (
      <div className="form-container">
        <div></div>
        <form
          className="white-background"
          onSubmit={this.submitHandler}
          method="post"
          encType="multipart/form-data"
          action="/upload"
        >
          <div>
            <h1>Sign Up</h1>
          </div>
          <div className="error-box">
            <p>{this.props.error.message}</p>
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
          <div className="profile-picture-input">
            <input
              type="file"
              name="inpFile"
              id="inpFile"
              onChange={this.selectImageHandler}
            />
            <div className="image-preview" id="imagePreview">
              <img src="" alt="" className="image-preview__image" />
              <span className="image-preview__default-text">
                Profile Picture
              </span>
            </div>
          </div>
          <button className="signup-login-button">Signup</button>
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
      console.log(formState);
      dispatch(signupUserAccount(formState, ownProps));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
