import React, { Component } from 'react';
import Store from '../Store';
import { CommonData } from 'common';

class Finish extends Component {

    componentDidMount() {
        Store.classRoom.submitAnswer();
    }

    render() {
        return (<div className="App-content"><h3>{CommonData.getLocalized('labelThankYou')}</h3> 
            {CommonData.getLocalized('labelYouAreFinished')}
        </div>);
    }
}

export default Finish;