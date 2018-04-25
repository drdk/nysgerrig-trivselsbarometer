import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Condition from './components/Condition';
import Feelings from './components/Feelings';
import Finish from './components/Finish';
import Store from './Store';
import { CommonData } from 'common';
import { observer } from 'mobx-react';


class App extends Component {

  constructor() {
    super();

    this.state = {
      colorTheme: createMuiTheme(CommonData.getColorPalette())
    }
  }

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

      <MuiThemeProvider theme={this.state.colorTheme}>
        <div className="App">
          {this.screenSelector()}
        </div>
      </MuiThemeProvider>


    );
  }
}

export default observer(App);
