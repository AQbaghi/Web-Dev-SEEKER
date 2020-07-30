import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyProfileFromDb } from '../../store/actions/userActions.js';
import proPic from './53469344.jpg';

class Profile extends Component {
  componentDidMount() {
    this.props.getMyProfile();
  }

  render() {
    console.log(this.props.companyReducer);
    console.log(this.props.auth);
    return (
      <div>
        <h2>
          {this.props.auth.userAccount.firstName}{' '}
          {this.props.auth.userAccount.lastName}
        </h2>
        <img src={proPic} alt="" />
      </div>
    );
  }
}

//  /api/company/me

const mapStateToProps = (state) => {
  return {
    companyReducer: state.companyReducer,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyProfile: () => {
      dispatch(getMyProfileFromDb());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
