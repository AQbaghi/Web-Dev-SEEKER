import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './Components/Nav/NavBar.js';
import Jobs from './Components/Jobs/Jobs.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Jobs} />
        </Switch>
      </div>
    );
  }
}

export default App;
