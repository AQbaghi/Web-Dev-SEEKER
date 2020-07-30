import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { getJobsFromDB } from '../../store/actions/jobActions.js';
import SearchBar from './SearchBar.js';
import './jobs.css';

//loaded is a variable to chech if the page loaded the job post data, if not the function will not be called again

class Jobs extends Component {
  componentWillMount() {
    this.props.getJobPosts();
  }
  render() {
    return (
      <div className="jobs no-outline">
        <SearchBar />
        <div className="jobs-dashbaurd">
          <div className="previous-searches">previous searches</div>
          <div className="job-postings">
            {this.props.jobPosts.map((jobPost) => {
              return (
                <Link
                  className="job-post"
                  key={jobPost._id}
                  to={'/jobs/' + jobPost._id}
                >
                  <h1 className="job-title">{jobPost.jobTitle}</h1>
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
