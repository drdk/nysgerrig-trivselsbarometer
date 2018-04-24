import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import Condition from './components/Condition';
import Feelings from './components/Feelings';
import Finish from './components/Finish';
import Store from './Store';
import { observer } from 'mobx-react';

class App extends Component {

  componentWillMount() {
    let params = (new URL(document.location)).searchParams;
    let screen = params.get("screen");
    if (screen && screen.length > 0) {
      Store.screen = screen.toLowerCase();
    }
  }

  screenSelector() {
    if (Store.screen === "login") {
      return (
        <div>
          <Header />
          <LoginPage />
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
