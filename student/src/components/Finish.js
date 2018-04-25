import React, { Component } from 'react';
import Store from '../Store';
import { CommonData } from 'common';

class Finish extends Component {

    componentDidMount() {

    }

    render() {
        return (<div className="App-content"><h3>{CommonData.getLocalized('labelThankYou', Store.language)}</h3> 
            {CommonData.getLocalized('labelYouAreFinished', Store.language)}
            <br/><br/><br/><br/><br/>
            <a href="" onClick={() => window.location.reload()}>{CommonData.getLocalized('studentRetry', Store.language)}</a>
        </div>);
    }
}

export default Finish;