import React, { Component } from 'react';
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
          <CreatePage />
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
      </div>
    );
  }
}

export default observer(App);
