import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import './jobs.css';

class Jobs extends Component {
  JobDashBaurd = () => {
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

export default connect(mapStateToProps)(Jobs);
