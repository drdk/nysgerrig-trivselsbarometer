import React, { Component } from 'react';
import { CommonData } from 'common';
import logo from '../ic_child_care_white_24px.svg';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">{CommonData.getLocalized('headerTeacher')}</h1>
    </header>);
    }
}

export default Header;