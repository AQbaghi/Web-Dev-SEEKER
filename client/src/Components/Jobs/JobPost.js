import React from 'react';
import { connect } from 'react-redux';

const JobPost = (props) => {
  let num = 1;
  return (
    <div className="job-post">
      <h1 className="job-title">{props.jobPost.catagory}</h1>
      <h2>Description: {props.jobPost.jobDescription}</h2>
      <p className="company-name">{props.jobPost.companyName}</p>
      <p className="location">{props.jobPost.location}</p>
      <p className="salary">{props.jobPost.salary}</p>
      <p className="time-of-post">{props.jobPost.createdAt}</p>
      <div className="skills-list">
        <h3>Required Skills:</h3>
        <ul>
          {props.jobPost.requiredSkills.map((requiredSkill) => (
            <li key={num++}>{requiredSkill}</li>
          ))}
        </ul>
      </div>
      <div className="skills-list">
        <h3>responsabilities:</h3>
        <ul>
          {props.jobPost.responsabilities.map((responsability) => (
            <li key={num++}>{responsability}</li>
          ))}
        </ul>
      </div>
      <div className="skills-list">
        <h3>advantages:</h3>
        <ul>
          {props.jobPost.advantages.map((advantage) => (
            <li key={num++}>{advantage}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const passStateToProps = (state, ownProps) => {
  return {
    jobPost: state.jobPosts.find(
      (jobPost) => jobPost._id === ownProps.match.params._id
    ),
  };
};

export default connect(passStateToProps)(JobPost);
