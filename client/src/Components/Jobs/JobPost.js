import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJobDetailsFromDB } from '../../store/actions/jobActions.js';

//loaded is a variable to chech if the page loaded the job post data, if not the function will not be called again
let loaded = false;

class JobPost extends Component {
  componentWillUnmount() {
    loaded = false;
  }
  render() {
    if (!loaded) {
      this.props.getJobPostDetails();
      loaded = true;
    }

    let num = 1;
    return (
      <div className="job-post">
        <h1 className="job-title">{this.props.jobPostDetails.job.catagory}</h1>
        <h2>Description: {this.props.jobPostDetails.job.jobDescription}</h2>
        <p className="company-name">
          {this.props.jobPostDetails.job.companyName}
        </p>
        <p className="location">{this.props.jobPostDetails.job.location}</p>
        <p className="salary">{this.props.jobPostDetails.job.salary}</p>
        <p className="time-of-post">
          {this.props.jobPostDetails.job.createdAt}
        </p>
        <div className="skills-list">
          <h3>Required Skills:</h3>
          <ul>
            {this.props.jobPostDetails.job.requiredSkills.map(
              (requiredSkill) => (
                <li key={num++}>{requiredSkill}</li>
              )
            )}
          </ul>
        </div>
        <div className="skills-list">
          <h3>responsabilities:</h3>
          <ul>
            {this.props.jobPostDetails.job.responsabilities.map(
              (responsability) => (
                <li key={num++}>{responsability}</li>
              )
            )}
          </ul>
        </div>
        <div className="skills-list">
          <h3>advantages:</h3>
          <ul>
            {this.props.jobPostDetails.job.advantages.map((advantage) => (
              <li key={num++}>{advantage}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    jobPostDetails: state.jobPostDetails,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getJobPostDetails: () => {
      dispatch(getJobDetailsFromDB(ownProps));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPost);
