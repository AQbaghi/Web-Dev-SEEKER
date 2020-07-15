import React, { Component } from 'react';
import './jobs.css';

class Jobs extends Component {
  render() {
    return (
      <div className="jobs no-outline">
        <div className="search-form">
          <input typr="text" name="search" autoComplete="off" required />
          <label htmlFor="search" className="label-search">
            <span className="content-search">Search</span>
          </label>
        </div>
      </div>
    );
  }
}

export default Jobs;
