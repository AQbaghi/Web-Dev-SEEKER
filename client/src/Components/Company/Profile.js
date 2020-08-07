import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    console.log(this.props.account);
    return (
      <div>
        <h1>Profile Picture</h1>
        <h1>company Picture</h1>
        <h1>firstName lastname</h1>
        <h1>email</h1>
        <h2>Company Name</h2>
        <h2>Company description</h2>
        <h2>Location</h2>
        <h2>ALL THE JOB POSTS</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state,
  };
};

//   const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//       authenticateUser: () => {
//         dispatch(auth(document.cookie));
//         console.log('dsa');
//       },
//     };
//   };

export default connect(mapStateToProps)(Profile);
