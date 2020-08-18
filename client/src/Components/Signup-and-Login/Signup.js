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
    showPopUP: false,
    verificationCode: null,
    error: null,
  };

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  //create the temp user in the datebase
  submitHandler = async (e) => {
    e.preventDefault();

    //check if password is 8 charachers long____________!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! add the letters check too
    if (this.state.password.length < 8) {
      this.setState({
        error:
          'sorry, passwords must be at lease 8 characters long, and contain capital and lowercase letters.',
      });
      return;
    }

    //create a temp user with a verification code value in the
    const tempUserAccountPropmise = await fetch('/api/users/verifyemail', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      }),
    });
    const tempUserAccount = await tempUserAccountPropmise.json();
    console.log(tempUserAccount);
    if (tempUserAccount.verifyEmail) {
      this.setState({
        showPopUP: true,
      });
    } else {
      this.setState({
        error: 'sorry, this email adress is already in use.',
      });
    }
  };

  createAccountHandler = (e) => {
    e.preventDefault();
    console.log(this.state.verificationCode);
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
        <div className="form-inner-comtainer">
          <form
            className="white-background main-form"
            onSubmit={this.submitHandler}
            method="post"
            encType="multipart/form-data"
            action="/upload"
          >
            <div>
              <h1 className="form-title">Sign Up</h1>
            </div>
            <div className="error-box">
              <p>{this.state.error}</p>
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
              <label class="custom-file-upload">
                <input
                  type="file"
                  name="inpFile"
                  id="inpFile"
                  onChange={this.selectImageHandler}
                  className="input-avatar"
                />
                Profile Picture Upload
              </label>
              <div className="image-preview" id="imagePreview">
                <img src="" alt="" className="image-preview__image" />
                <span className="image-preview__default-text">
                  Profile Picture
                </span>
              </div>
            </div>
            <button className="signup-login-button">Signup</button>
          </form>
        </div>
        {this.state.showPopUP ? (
          <div id="verification-popUp">
            <div id="popUp">
              <form onSubmit={this.createAccountHandler} id="inner-popUp">
                <h2>Enter Verification Code</h2>
                <div className="form">
                  <input
                    type="text"
                    name="code"
                    id="verificationCode"
                    required
                    autoComplete="off"
                    onChange={this.inputChangeHandler}
                  />
                  <label htmlFor="Code" className="label-name">
                    <span className="content-name">Code</span>
                  </label>
                </div>
                <button className="signup-login-button">Verify</button>
              </form>
            </div>
          </div>
        ) : null}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
