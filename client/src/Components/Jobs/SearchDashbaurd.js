import React, { Component } from 'react';
import './SearchDashbaurd.css';

//loaded is a variable to chech if the page loaded the job post data, if not the function will not be called again

class SearchDashbaurd extends Component {
  searchForJob = (e) => {
    e.preventDefault();
    const jobTitle = document.querySelector('.input-feild #jobTitle').value;
    const location = document.querySelector('.input-feild #location').value;
    this.props.history.push(`/jobs?jobTitle=${jobTitle}&location=${location}`);
  };

  render() {
    return (
      <div className="dashbaurd">
        <div></div>
        <form onSubmit={this.searchForJob} className="job-search-form">
          <div className="header">
            <h1>Jump Start your Career</h1>
          </div>
          <div className="input-feild">
            <input
              placeholder="Job title, company, keyword"
              type="text"
              id="jobTitle"
              name="jobTitle"
              autoComplete="off"
            />
          </div>
          <div className="input-feild">
            <input
              placeholder="Where"
              type="text"
              id="location"
              name="location"
              autoComplete="off"
            />
          </div>
          <div className="filter"></div>
          <button className="signup-login-button">Search</button>
        </form>
        <div></div>
      </div>
    );
  }
}

export default SearchDashbaurd;
