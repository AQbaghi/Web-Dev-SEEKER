import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from './store/actions/authActions.js';
import NavBar from './Components/Nav/NavBar.js';
import Jobs from './Components/Jobs/Jobs.js';
import JobPost from './Components/Jobs/JobPost.js';
import Signup from './Components/Signup-and-Login/Signup.js';
import login from './Components/Signup-and-Login/Login.js';
import StartCompany from './Components/Company/StartCompany.js';
import CreateJonPost from './Components/Company/CreateJob.js';
import './App.css';

let authenticated = false;
let companyAuthenticated = false;

class App extends Component {
  logout = async (token) => {
    await fetch('/api/users/logout', {
      headers: {
        Authorization: token.replace('token=', 'Bearer '),
      },
      method: 'POST',
    });
  };

  render() {
    if (this.props.userAccount.email) {
      authenticated = true;
    }
    if (this.props.userAccount.email && !this.props.userAccount.ownesCompany) {
      this.props.authenticateUser();
    }
    if (this.props.userAccount.ownesCompany) {
      companyAuthenticated = true;
    }

    return (
      <div className="App">
        <NavBar
          signup={authenticated}
          login={authenticated}
          logout={authenticated}
          companyAuthenticated={companyAuthenticated}
        />
        <Switch>
          <Route exact path="/" component={Jobs} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/jobs/:_id" component={JobPost} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={login} />
          <Route exact path="/startcompany" component={StartCompany} />
          <Route exact path="/createjobpost" component={CreateJonPost} />
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
