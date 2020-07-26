import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cteareJobPost } from '../../store/actions/companyActions.js';
import '../Signup-and-Login/signup.css';
import './company.css';

let uniqueKey = 0;
let keyWord = null;
let requiredSkill = null;
let responsability = null;
let advantage = null;

let keyWords = [];
let requiredSkills = [];
let responsabilities = [];
let advantages = [];

class CreateJobPost extends Component {
  state = {
    jobTitle: null,
    catagory: 'Web Development',
    jobDescription: null,
    keyWords: [],
    requiredSkills: [],
    responsabilities: [],
    advantages: [],
    salary: null,
  };

  inputChangeHandler = (e) => {
    //taking the inputs from the forms and setting variables with the name to add into its array ready for state
    switch (e.target.id) {
      case 'keyWords':
        keyWord = e.target.value;
        break;
      case 'requiredSkills':
        console.log('lol');
        requiredSkill = e.target.value;
        break;
      case 'responsabilities':
        responsability = e.target.value;
        break;
      case 'advantages':
        advantage = e.target.value;
        break;
      default:
        this.setState({
          [e.target.id]: e.target.value,
        });
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.setState(() => {
      //checking if input exists to add in array to set state with new array value
      if (keyWord) {
        keyWords = [...this.state.keyWords, keyWord];
        keyWord = null;
      }
      if (requiredSkill) {
        requiredSkills = [...this.state.requiredSkills, requiredSkill];
        requiredSkill = null;
      }
      if (responsability) {
        responsabilities = [...this.state.responsabilities, responsability];
        responsability = null;
      }
      if (advantage) {
        advantages = [...this.state.advantages, advantage];
        advantage = null;
      }
      //returning the values in the state, for one or for all new values
      return {
        ...this.state,
        keyWords,
        requiredSkills,
        responsabilities,
        advantages,
      };
    });
    //resetting all forms
    document.querySelector('.form1').reset();
    document.querySelector('.form2').reset();
    document.querySelector('.form3').reset();
    document.querySelector('.form4').reset();
  };

  submitFormHandler = (e) => {
    e.preventDefault();
    this.props.dispatchJobPostInfo(this.state);
  };

  render() {
    return (
      <div className="form-container">
        <div></div>
        <div>
          <div>
            <h1>Create a Job Post</h1>
          </div>

          <div className="form">
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="jobTitle" className="label-name">
              <span className="content-name">Job Title</span>
            </label>
          </div>

          <div className="textarea-form">
            <label htmlFor="jobDescription" className="label-name">
              <span className="content">Job Description</span>
            </label>
            <textarea
              type="text"
              id="jobDescription"
              name="jobDescription"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            ></textarea>
          </div>

          <div className="form">
            <input
              type="text"
              name="salary"
              id="salary"
              required
              autoComplete="off"
              onChange={this.inputChangeHandler}
            />
            <label htmlFor="salary" className="label-name">
              <span className="content-name">Salary</span>
            </label>
          </div>

          <form onSubmit={this.submitHandler} className="form1">
            <div className="key-words">
              {this.state.keyWords.map((keyWord) => {
                uniqueKey++;
                return (
                  <li className="key-word" key={uniqueKey}>
                    {keyWord}
                  </li>
                );
              })}
            </div>

            <div className="form">
              <input
                type="text"
                name="keyWords"
                id="keyWords"
                required
                autoComplete="off"
                onChange={this.inputChangeHandler}
              />
              <label htmlFor="keyWords" className="label-name">
                <span className="content-name">
                  Add Key Words to help with the Search
                </span>
              </label>
            </div>
            <button className="description-button">Add Key Word</button>
          </form>

          <ul>
            {this.state.requiredSkills.map((requiredSkill) => {
              uniqueKey++;
              return (
                <li className="item-in-list" key={uniqueKey}>
                  {requiredSkill}
                </li>
              );
            })}
          </ul>

          <form onSubmit={this.submitHandler} className="form2">
            <div className="form">
              <input
                type="text"
                name="requiredSkills"
                id="requiredSkills"
                required
                autoComplete="off"
                onChange={this.inputChangeHandler}
              />
              <label htmlFor="requiredSkills" className="label-name">
                <span className="content-name">Required Skills</span>
              </label>
            </div>
            <button className="description-button">Add Requirement</button>
          </form>

          <ul>
            {this.state.responsabilities.map((responsability) => {
              uniqueKey++;
              return (
                <li className="item-in-list" key={uniqueKey}>
                  {responsability}
                </li>
              );
            })}
          </ul>

          <form onSubmit={this.submitHandler} className="form3">
            <div className="form">
              <input
                type="text"
                name="responsabilities"
                id="responsabilities"
                required
                autoComplete="off"
                onChange={this.inputChangeHandler}
              />
              <label htmlFor="responsabilities" className="label-name">
                <span className="content-name">Responsabilities</span>
              </label>
            </div>
            <button className="description-button">Add Responsability</button>
          </form>

          <ul>
            {this.state.advantages.map((advantage) => {
              uniqueKey++;
              return (
                <li className="item-in-list" key={uniqueKey}>
                  {advantage}
                </li>
              );
            })}
          </ul>

          <form onSubmit={this.submitHandler} className="form4">
            <div className="form">
              <input
                type="text"
                name="advantages"
                id="advantages"
                required
                autoComplete="off"
                onChange={this.inputChangeHandler}
              />
              <label htmlFor="advantages" className="label-name">
                <span className="content-name">Advantages</span>
              </label>
            </div>
            <button className="description-button">Add Advantage</button>
          </form>

          <button
            className="signup-login-button"
            onClick={this.submitFormHandler}
          >
            Submit
          </button>
        </div>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticatedUser: state.auth.userAccount,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchJobPostInfo: (formState) => {
      dispatch(cteareJobPost(formState, ownProps));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobPost);

{
  /* <div className="form">
<input
  type="text"
  name="catagory"
  list="jobCatagoty"
  id="catagory"
  required
  autoComplete="off"
  onChange={this.inputChangeHandler}
/>
<datalist id="jobCatagoty">
  <option>web development</option>
  <option>cloud engineer</option>
  <option>electrical engineer</option>
  <option>graphic designer</option>
  <option>network engineer</option>
  <option>penatration tester</option>
  <option>customer service</option>
  <option>help desk</option>
  <option>software engineer</option>
</datalist>
<label htmlFor="catagory" className="label-name">
  <span className="content">catagory</span>
</label>
</div> */
}
