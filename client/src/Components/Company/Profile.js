import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyCompanyJobsFromDB } from '../../store/actions/jobActions.js';
import { _arrayBufferToBase64 } from '../../SettingsAndImageProcessors/_arrayBufferToBase64';
import './profile.css';
import defaultImage from '../../images/default-user.jpg';
import defaultCompanyImage from '../../images/PRIVATE-LIMITE.jpg';
let loaded = false;
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
    let ownesCompany = this.props.account.auth.userAccount.companyInfo;

    //check if the company data is dispatched to the state
    if (this.props.account.auth.userAccount.companyInfo) {
      //checking if company is in props then fetch the company jobs once
      if (!loaded) {
        //dispatch to get company jobs
        this.props.getMyCompanyJobPosts(
          this.props.account.auth.userAccount.companyInfo._id
        );
        loaded = true;
      }
      if (this.props.account.auth.userAccount.companyInfo.avatar) {
        let companyPictureBuffer = this.props.account.auth.userAccount
          .companyInfo.avatar.data;
        //injecting the company picture into the src for the img tag
        companyPicture = `data:image/jpg;base64,${_arrayBufferToBase64(
          companyPictureBuffer
        )}`;
      }
    }

    return (
      <div className="profile profile-content">
        <div className="profile-cover"></div>
        <div className="displayImage">
          <img
            className="profilePicture"
            src={
              this.props.account.auth.userAccount.avatar
                ? profilePicture
                : defaultImage
            }
            alt={defaultImage}
          />
        </div>
        <div>
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

            {ownesCompany ? (
              <div className="companyInfo">
                <div>
                  <img
                    id="companyImage"
                    src={companyPicture ? companyPicture : defaultCompanyImage}
                    alt={defaultImage}
                  />
                </div>

                <p className="full-name">
                  {this.props.account.auth.userAccount.companyInfo.companyName}
                </p>
                <p id="company-description">
                  Description:{' '}
                  {this.props.account.auth.userAccount.companyInfo.description}
                </p>

                <h3>
                  {this.props.account.auth.userAccount.companyInfo.location}
                </h3>

                <div className="applied-jobs">
                  <div
                    className="applied-jobs-button"
                    onClick={this.appliedJobsClickHandler}
                  >
                    View Jops Posted
                  </div>
                  <ul className="applied-jobs-list applied-jobs-list-closed">
                    {this.props.account.job.myCompanyJobs
                      ? this.props.account.job.myCompanyJobs.map(
                          (companyJob) => {
                            console.log(companyJob);
                            let linkToJobPost = `/jobs/${companyJob._id}`;
                            return (
                              <li key={companyJob._id}>
                                <Link to={linkToJobPost}>
                                  {companyJob.jobTitle}
                                  <p>{companyJob.createdAt}</p>
                                </Link>
                              </li>
                            );
                          }
                        )
                      : null}
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="profileToStartCompany">
                <Link className="profileToStartCompanyLink" to="/startCompany">
                  Start a Company
                </Link>
              </div>
            )}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMyCompanyJobPosts: (owner) => {
      dispatch(getMyCompanyJobsFromDB(owner));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
