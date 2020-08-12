import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getJobsFromDB } from '../../store/actions/jobActions.js';
import { _arrayBufferToBase64 } from '../../SettingsAndImageProcessors/_arrayBufferToBase64';
import SearchBar from './SearchBar.js';
import './jobs.css';
import defaultCompanyImage from '../../images/PRIVATE-LIMITE.jpg';

class Jobs extends Component {
  componentWillMount() {
    this.props.getJobPosts();
  }
  render() {
    console.log(this.props.jobPosts.companyAvatar);
    return (
      <div className="jobs no-outline">
        <SearchBar />
        <div className="jobs-dashbaurd">
          <div className="previous-searches">previous searches</div>
          <div className="job-postings">
            {this.props.jobPosts.map((jobPost) => {
              let companyPictureBuffer = null;
              let companyPicture = null;
              if (jobPost.companyAvatar) {
                //getting the image buffer from jobs list array
                companyPictureBuffer = jobPost.companyAvatar.data;
                //injecting the company picture into the src for the img tag
                companyPicture = `data:image/jpg;base64,${_arrayBufferToBase64(
                  companyPictureBuffer
                )}`;
              }
              return (
                <Link
                  className="job-post"
                  key={jobPost._id}
                  to={'/jobs/' + jobPost._id}
                >
                  <div className="jobPost-header">
                    {jobPost.companyAvatar ? (
                      <img
                        className="little-company-image"
                        src={companyPicture}
                      />
                    ) : (
                      <img
                        className="little-company-image"
                        src={defaultCompanyImage}
                      />
                    )}
                    <h1 className="job-title">{jobPost.jobTitle}</h1>
                  </div>

                  <p className="company-name">{jobPost.companyName}</p>
                  <p className="location">{jobPost.location}</p>
                  <p className="salary">{jobPost.salary}</p>
                  <p className="time-of-post">{jobPost.createdAt}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobPosts: state.job.jobPosts,
    authenticatedUser: state.job.userAccount,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getJobPosts: () => {
      dispatch(getJobsFromDB(ownProps));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
