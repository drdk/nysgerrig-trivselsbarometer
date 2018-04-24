import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import CreatePage from './components/CreatePage';
import ConditionResults from './components/ConditionResults';
import FeelingsResults from './components/FeelingsResults';
import Store from './Store';
import { observer } from 'mobx-react';
<<<<<<< HEAD
import { CommonData } from 'common';
=======
import { Tracking }  from 'common';
>>>>>>> 564ee94b877f67c96b61ac2c70863da633256600

let track = new Tracking();

track.pageView();
class App extends Component {

  componentWillMount() {
    let params = (new URL(document.location)).searchParams;
    let screen = params.get("screen");
    if (screen && screen.length > 0) {
      this.injectMockData();
      Store.screen = screen;
    }
  }

  injectMockData() {
    var conditions = CommonData.getConditions(),
    feelings = CommonData.getFeelings(),
    answerCount = 10 + Math.floor(Math.random() * 20), // Between 10 and 30
    data = [];

    for (var i = 0; i < answerCount; i++) {
      var student = {
        "condition": conditions[Math.round(Math.random() * 2)].name,
        "feelings": []
      };

      while (student.feelings.length === 0) {
        for (var j = 0; j < feelings.length; j++) {
          if (Math.round(Math.random())) {
            student.feelings.push(feelings[j]);
          }
        }
      }
      
      data.push(student);
    }

    Store.subject = "Demo";
    Store.data = data;
  }

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
