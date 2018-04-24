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
import { observer } from 'mobx-react';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b2ebf2',
      main: '#e5ffff',
      dark: '#81b9bf',
      contrastText: 'black',
    },
    secondary: {
      light: '#e1bee7',
      main: '#fff1ff',
      dark: '#af8eb5',
      contrastText: '#fff',
    },
  },
});

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

      <MuiThemeProvider theme={theme}>
        <div className="App">
          {this.screenSelector()}
        </div>
      </MuiThemeProvider>


    );
  }
}

export default observer(App);
