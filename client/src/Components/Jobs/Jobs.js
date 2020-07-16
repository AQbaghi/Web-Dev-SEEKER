import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import './jobs.css';

class Jobs extends Component {
  JobDashBaurd = () => {
    return (
      <div className="jobs-dashbaurd">
        <div className="previous-searches">previous searches</div>
        <div className="job-postings">
          <div className="job-post">
            <h1 className="job-title">Web Developer</h1>
            <p className="company-name">Amazon</p>
            <p className="location">Manchester</p>
            <p className="salary">35,000£</p>
            <p className="time-of-post">5 hours ago</p>
          </div>
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
