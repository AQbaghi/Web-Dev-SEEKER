import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCompany } from '../../store/actions/companyActions.js';
import '../Signup-and-Login/signup.css';

class StartCompany extends Component {
  state = {
    companyName: null,
    description: null,
    location: null,
    avatar: null,
    formData: null,
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
          <form className="white-background" onSubmit={this.submitHandler}>
            <div>
              <h1 className="form-title">Start your Company</h1>
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
            <div className="profile-picture-input">
              <label class="custom-file-upload">
                <input
                  type="file"
                  name="inpFile"
                  id="inpFile"
                  onChange={this.selectImageHandler}
                  className="input-avatar"
                />
                Company Picture Upload
              </label>
              <div className="image-preview" id="imagePreview">
                <img src="" alt="" className="image-preview__image" />
                <span className="image-preview__default-text">
                  Profile Picture
                </span>
              </div>
            </div>
            <button className="signup-login-button">Submit</button>
          </form>
        </div>
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
    authenticatedUser: state.auth.userAccount,
    error: state.companyReducer.error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchCompanyInfo: (formState) => {
      console.log(formState);
      dispatch(startCompany(formState, ownProps));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartCompany);
