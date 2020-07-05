import React, { Component } from 'react';

class Jobs extends Component {
  state = {
    jobs: [],
  };

  async componentDidMount() {
    const jobPromise = await fetch('/api/jobs');
    const jobs = await jobPromise.json();
    this.setState({
      jobs,
    });
  }

  render() {
    return (
      <div>
        <h1>hello React!!</h1>
        <ul>
          {this.state.jobs.map((job) => (
            <li key={job.id}>{job.jobTitle}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Jobs;
