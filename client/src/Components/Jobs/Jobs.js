import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getJobsFromDB } from '../../store/actions/jobActions.js';
import SearchBar from './SearchBar.js';
import './jobs.css';

//loaded is a variable to chech if the page loaded the job post data, if not the function will not be called again
let loaded = false;

class Jobs extends Component {
  JobDashBaurd = () => {
    if (!loaded) {
      this.props.getJobPosts();
      loaded = true;
    }

    return (
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
                <h1 className="job-title">{jobPost.catagory}</h1>
                <p className="company-name">{jobPost.companyName}</p>
                <p className="location">{jobPost.location}</p>
                <p className="salary">{jobPost.salary}</p>
                <p className="time-of-post">{jobPost.createdAt}</p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="jobs no-outline">
        <SearchBar />
        <this.JobDashBaurd />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobPosts: state.jobPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobPosts: () => {
      dispatch(getJobsFromDB());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
