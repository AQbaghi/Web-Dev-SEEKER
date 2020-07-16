import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import './jobs.css';

class Jobs extends Component {
  state = {
    jobPosts: [],
  };

  getJobPosts = async () => {
    const jobsPromise = await fetch('/api/job/all-job?limit=10&skip=0?');
    const jobsJSON = await jobsPromise.json();
    this.setState({
      jobPosts: [...jobsJSON],
    });
  };

  componentDidMount() {
    this.getJobPosts();
  }

  JobDashBaurd = () => {
    return (
      <div className="jobs-dashbaurd">
        <div className="previous-searches">previous searches</div>
        <div className="job-postings">
          {this.state.jobPosts.map((jobPost) => {
            return (
              <div className="job-post" key={jobPost._id}>
                <h1 className="job-title">{jobPost.catagory}</h1>
                <p className="company-name">{jobPost.companyName}</p>
                <p className="location">{jobPost.location}</p>
                <p className="salary">{jobPost.salary}</p>
                <p className="time-of-post">{jobPost.createdAt}</p>
              </div>
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

export default Jobs;
