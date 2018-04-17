import React, { Component } from 'react';
import Store from '../Store';

class Finish extends Component {

    componentDidMount() {
        Store.classRoom.submitAnswer();
    }

    render() {
        return (<div className="App-content"><h3>Tak for din deltagelse</h3> 
        Du er nu færdig og din lærer vil vise klassens resultater.
        </div>);
    }
}

export default Finish;