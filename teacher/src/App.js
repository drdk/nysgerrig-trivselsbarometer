import React, { Component } from 'react';
import logo from './ic_child_care_white_24px.svg';
import './App.css';
import Header from './components/Header';
import CreatePage from './components/CreatePage';
import ConditionResults from './components/ConditionResults';
import FeelingsResults from './components/FeelingsResults';
import Store from './Store';
import { observer } from 'mobx-react';

class App extends Component {

  screenSelector() {
    if (Store.screen === "create") {
      return (
        <div>
          <Header />
        </div>
      );
    } else if (Store.screen === "conditionResults") {
      return (
        <div>
          <Header />
          <ConditionResults />
        </div>
      );
    }
    else if (Store.screen === "feelingsResults") {
      return (
        <div>
          <Header />
          <FeelingsResults />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
       {this.screenSelector()}
        <CreatePage />
      </div>
    );
  }
}

export default observer(App);
