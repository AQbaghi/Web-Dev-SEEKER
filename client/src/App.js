import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from './store/actions/jobActions.js';
import NavBar from './Components/Nav/NavBar.js';
import Jobs from './Components/Jobs/Jobs.js';
import JobPost from './Components/Jobs/JobPost.js';
import Signup from './Components/Signup-and-Login/Signup.js';
import './App.css';

let authenticated = false;

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
    if (!this.props.authenticatedUser.email) {
      this.props.authenticateUser();
    }
    if (this.props.authenticatedUser.email) {
      authenticated = true;
    }

    return (
      <div className="App">
        <NavBar
          signup={authenticated}
          login={authenticated}
          logout={authenticated}
        />
        <Switch>
          <Route exact path="/" prop="this is the prop" component={Jobs} />
          <Route exact path="/jobs" prop="this is the prop" component={Jobs} />
          <Route exact path="/jobs/:_id" component={JobPost} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Signup} />
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
    authenticatedUser: state.userAccount,
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
