import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './Components/Nav/NavBar.js';
import Jobs from './Components/Jobs/Jobs.js';
import JobPost from './Components/Jobs/JobPost.js';
import Signup from './Components/Signup-and-Login/Signup.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" prop="this is the prop" component={Jobs} />
          <Route exact path="/jobs" prop="this is the prop" component={Jobs} />
          <Route exact path="/jobs/:_id" component={JobPost} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;
