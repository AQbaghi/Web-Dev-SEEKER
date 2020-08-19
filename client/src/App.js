import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from './store/actions/authActions.js';
import NavBar from './Components/Nav/NavBar.js';
import SearchDashbaurd from './Components/Jobs/SearchDashbaurd.js';
import Jobs from './Components/Jobs/Jobs.js';
import JobPost from './Components/Jobs/JobPost.js';
import Signup from './Components/Signup-and-Login/Signup.js';
import login from './Components/Signup-and-Login/Login.js';
import Profile from './Components/Company/Profile.js';
import StartCompany from './Components/Company/StartCompany.js';
import CreateJobPost from './Components/Company/CreateJob.js';
import Apply from './Components/Jobs/apply.js';
import './App.css';

let authenticated = false;
let companyAuthenticated = false;
let authCount = true;

class App extends Component {
  logout = async (token) => {
    await fetch('/api/users/logout', {
      headers: {
        Authorization: token.replace('token=', 'Bearer '),
      },
      method: 'POST',
    });
  };

  clickedAnywhereHandler = (e) => {
    console.log('do the nav bar button');
  };

  render() {
    if (this.props.userAccount.email) {
      authenticated = true;
    }
    if (authCount) {
      this.props.authenticateUser();
      authCount = false;
    }
    if (this.props.userAccount.ownesCompany) {
      companyAuthenticated = true;
    }

    return (
      <div className="App" onClick={this.clickedAnywhereHandler}>
        <NavBar
          signup={authenticated}
          login={authenticated}
          logout={authenticated}
          companyAuthenticated={companyAuthenticated}
        />
        <Switch>
          <Route exact path="/" component={SearchDashbaurd} />
          <Route exact path="/searchdashbaurd" component={SearchDashbaurd} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/jobs/:_id" component={JobPost} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={login} />
          <Route exact path="/startcompany" component={StartCompany} />
          <Route exact path="/createjobpost" component={CreateJobPost} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/apply/:_id" component={Apply} />
          <Route
            exact
            path="/logout"
            component={() => {
              this.logout(document.cookie);
              window.location.href = '/';
            }}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.auth.userAccount,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticateUser: () => {
      dispatch(auth(document.cookie));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
