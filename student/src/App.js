import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Condition from './components/Condition';
import Feelings from './components/Feelings';
import Finish from './components/Finish';
import Store from './Store';
import { observer } from 'mobx-react';

class App extends Component {

  screenSelector() {
    if (Store.screen === "login") {
      return (
        <div>
          <Header />
          <Login />
        </div>
      );
    } else if (Store.screen === "condition") {
      return (
        <div>
          <Header />
          <Condition />
        </div>
      );
    }
    else if (Store.screen === "feelings") {
      return (
        <div>
          <Header />
          <Feelings />
        </div>
      );
    }
    else if (Store.screen === "finish") {
      return (
        <div>
          <Header />
          <Finish />
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
