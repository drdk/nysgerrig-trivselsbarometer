import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
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
