import React, { Component } from 'react';
import logo from './ic_child_care_white_24px.svg';
import './App.css';
import CreatePage from './CreatePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Trivselsbarometer</h1>
        </header>
        <CreatePage />
      </div>
    );
  }
}

export default App;
