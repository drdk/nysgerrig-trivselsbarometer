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
import { CommonData } from 'Common';
import { observer } from 'mobx-react';

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

class App extends Component {

  componentWillMount() {
    let params = (new URL(document.location)).searchParams;
    let screen = params.get("screen");
    if (screen && screen.length > 0) {
      Store.subject = "Demo";
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

      <MuiThemeProvider theme={createMuiTheme({palette})}>
        <div className="App">
          {this.screenSelector()}
        </div>
      </MuiThemeProvider>


    );
  }
}

export default observer(App);
