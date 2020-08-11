import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _arrayBufferToBase64 } from '../../SettingsAndImageProcessors/_arrayBufferToBase64';
import './profile.css';

class Profile extends Component {
  appliedJobsClickHandler = (e) => {
    e.target.parentElement.childNodes[1].classList.toggle(
      'applied-jobs-list-closed'
    );
  };

  render() {
    //injecting the profile picture into the src for the img tag
    let profilePicture = `data:image/jpg;base64,${this.props.account.auth.userAccount.avatar}`;
    let companyPicture = null;

    //check if the company data is dispatched to the state
    if (this.props.account.auth.userAccount.companyInfo) {
      let companyPictureBuffer = this.props.account.auth.userAccount.companyInfo
        .avatar.data;
      //injecting the company picture into the src for the img tag
      companyPicture = `data:image/jpg;base64,${_arrayBufferToBase64(
        companyPictureBuffer
      )}`;
    }

    return (
      <div className="profile profile-content">
        <div className="profile-cover"></div>
        <div>
          <img src={profilePicture} alt="no image Avalable" />
          <img src={companyPicture} alt="no image Avalable" />
        </div>
        <div className="">
          <div>
            <p className="full-name">
              {this.props.account.auth.userAccount.firstName}{' '}
              {this.props.account.auth.userAccount.lastName}
            </p>
            <p className="email">{this.props.account.auth.userAccount.email}</p>
          </div>

          <div>
            <div className="applied-jobs">
              <div
                className="applied-jobs-button"
                onClick={this.appliedJobsClickHandler}
              >
                Jobs Applied to
              </div>
              <ul className="applied-jobs-list applied-jobs-list-closed">
                <li>
                  <a href="#">Job 1</a>
                </li>
                <li>
                  <a href="#">Job 2</a>
                </li>
                <li>
                  <a href="#">Job 3</a>
                </li>
                <li>
                  <a href="#">Job 4</a>
                </li>
                <li>
                  <a href="#">Job 5</a>
                </li>
              </ul>
            </div>

            <h2>Company Name</h2>
            <h2>Company description</h2>
            <h2>Location</h2>
            <h2>ALL THE JOB POSTS</h2>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state,
  };
};

//   const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//       authenticateUser: () => {
//         dispatch(auth(document.cookie));
//         console.log('dsa');
//       },
//     };
//   };

export default connect(mapStateToProps)(Profile);
