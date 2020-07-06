import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './Components/Nav/NavBar.js';
import Jobs from './Components/Jobs/Jobs.js';
import ApplyJob from './Components/ApplyJob/ApplyJob.js';
import CreateJob from './Components/CreateJob/CreateJob.js';
import Dashbaurd from './Components/Dashbaurd/Dashbaurd.js';
import Signup from './Components/signup/signup.js';
import User from './Components/User/User.js';
import Login from './Components/Login/Login.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Dashbaurd} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/create" component={CreateJob} />
          <Route path="/apply" component={ApplyJob} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
        </Switch>
        <p>
          If I click on a navigation link, I can see that the slug has changed
          but the component is not rendering. I have to manually refresh the
          page in order to see the component, while the page should re-render by
          itself on route/slug change.
        </p>
        <p>
          If I click on a navigation link, I can see that the slug has changed
          but the component is not rendering. I have to manually refresh the
          page in order to see the component, while the page should re-render by
          itself on route/slug change.
        </p>
        <p>
          If I click on a navigation link, I can see that the slug has changed
          but the component is not rendering. I have to manually refresh the
          page in order to see the component, while the page should re-render by
          itself on route/slug change.
        </p>
        <p>
          If I click on a navigation link, I can see that the slug has changed
          but the component is not rendering. I have to manually refresh the
          page in order to see the component, while the page should re-render by
          itself on route/slug change.
        </p>
        <p>
          If I click on a navigation link, I can see that the slug has changed
          but the component is not rendering. I have to manually refresh the
          page in order to see the component, while the page should re-render by
          itself on route/slug change.
        </p>
        <p>
          If I click on a navigation link, I can see that the slug has changed
          but the component is not rendering. I have to manually refresh the
          page in order to see the component, while the page should re-render by
          itself on route/slug change.
        </p>
        <p>
          If I click on a navigation link, I can see that the slug has changed
          but the component is not rendering. I have to manually refresh the
          page in order to see the component, while the page should re-render by
          itself on route/slug change.
        </p>
        <p>
          If I click on a navigation link, I can see that the slug has changed
          but the component is not rendering. I have to manually refresh the
          page in order to see the component, while the page should re-render by
          itself on route/slug change.
        </p>
      </div>
    );
  }
}

export default App;
