import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getJobDetailsFromDB } from '../../store/actions/jobActions.js';

class JobPost extends Component {
  componentWillUnmount() {
    this.props.getJobPostDetails();
  }
  componentDidMount() {
    this.props.getJobPostDetails();
  }
  render() {
    let num = 1;

    return (
      <div className="job-post">
        <h1 className="job-title">{this.props.jobPostDetails.job.jobTitle}</h1>
        <h2 className="company-name">
          {this.props.jobPostDetails.job.companyName}
        </h2>
        <p>{this.props.jobPostDetails.job.jobDescription}</p>
        {this.props.jobPostDetails.job.location ? (
          <h3 className="location">{this.props.jobPostDetails.job.location}</h3>
        ) : null}
        <p className="salary">{this.props.jobPostDetails.job.salary}</p>
        <p className="time-of-post">
          {this.props.jobPostDetails.job.createdAt}
        </p>
        {this.props.jobPostDetails.job.requiredSkills[0] ? (
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
        ) : null}
        {this.props.jobPostDetails.job.responsabilities[0] ? (
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
        ) : null}
        {this.props.jobPostDetails.job.advantages[0] ? (
          <div className="skills-list">
            <h3>advantages:</h3>
            <ul>
              {this.props.jobPostDetails.job.advantages.map((advantage) => (
                <li key={num++}>{advantage}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    jobPostDetails: state.job.jobPostDetails,
    authenticatedUser: state.job.userAccount,
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
