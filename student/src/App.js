import React, { Component } from 'react';
import logo from './ic_child_care_white_24px.svg';
import './App.css';
import LoginPage from './LoginPage';
import Store from './Store';
import { observer } from 'mobx-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Trivselsbarometer</h1>
          Deltagelse {Store.myData}
        </header>
        <LoginPage />
      </div>
    );
  }
}

export default observer(App);
