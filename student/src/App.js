import React, { Component } from 'react';
import logo from './ic_child_care_white_24px.svg';
import './App.css';
import LoginPage from './LoginPage';
import Header from './Header';
import Store from './Store';
import { observer } from 'mobx-react';

class App extends Component {

  screenSelector() {
    if (Store.screen === "login") {
      return (
        <div>
          <Header />
          <LoginPage />
        </div>
      );
    } else if (Store.screen === "state") {
      return (
        <div>
          <Header />
          <LoginPage />
        </div>
      );
    }
    else if (Store.screen === "emotions") {
      return (
        <div>
          <Header />
          <LoginPage />
        </div>
      );
    }
    else if (Store.screen === "finish") {
      return (
        <div>
          <Header />
          <LoginPage />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        {this.screenSelector()}
      </div>
    );
  }
}

export default observer(App);
