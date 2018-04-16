import React, { Component } from 'react';
import logo from '../ic_child_care_white_24px.svg';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Trivselsbarometer</h1>
                Deltagelse
    </header>);
    }
}

export default Header;
