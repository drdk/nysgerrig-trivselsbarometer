import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import './App.css';
import Header from './components/Header';
import CreatePage from './components/CreatePage';
import ConditionResults from './components/ConditionResults';
import FeelingsResults from './components/FeelingsResults';
import Store from './Store';
import { observer } from 'mobx-react';
import { CommonData } from 'common';
import { Tracking } from 'common';

let track = new Tracking();

const palette = {
  primary: {
    light: '#8fafc5',
    main: '#608094',
    dark: '#335466',
    contrastText: 'white',
  },
  secondary: {
    light: '#fff850',
    main: '#d0c50a',
    dark: '#9b9500',
    contrastText: '#fff',
  }
}

track.pageView();
class App extends Component {

  componentWillMount() {
    let params = (new URL(document.location)).searchParams;
    let screen = params.get("screen");
    var lang = navigator.language || navigator.userLanguage;
    //Store.language = lang;
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
    } else {
      console.error(Store.screen + ' does not exsist');
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme({ palette })}>
        <div className="App">
          {this.screenSelector()}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default observer(App);
