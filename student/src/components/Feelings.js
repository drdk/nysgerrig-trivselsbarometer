import React, { Component } from 'react';
import { Emoji }  from 'common';
import './Feelings.css';
import { observer } from 'mobx-react';
import Store from '../Store';

class Feelings extends Component {

    constructor() {
        super();

        this.clickHandler = this.selectHandler.bind(this);

        this.state = {
            selected: []
        };
    }

    getFeelings() {
        return [        
            {
                "name": "emoji_u1f600",
                "file": "emoji_u1f600.svg"
            },
            {
                "name": "emoji_u1f601",
                "file": "emoji_u1f601.svg"
            },
            {
                "name": "emoji_u1f602",
                "file": "emoji_u1f602.svg"
            },
            {
                "name": "emoji_u1f603",
                "file": "emoji_u1f603.svg"
            },
            {
                "name": "emoji_u1f604",
                "file": "emoji_u1f604.svg"
            },
            {
                "name": "emoji_u1f605",
                "file": "emoji_u1f605.svg"
            },
            {
                "name": "emoji_u1f606",
                "file": "emoji_u1f606.svg"
            },
            {
                "name": "emoji_u1f607",
                "file": "emoji_u1f607.svg"
            },
            {
                "name": "emoji_u1f608",
                "file": "emoji_u1f608.svg"
            },
            {
                "name": "emoji_u1f609",
                "file": "emoji_u1f609.svg"
            },
            {
                "name": "emoji_u1f60a",
                "file": "emoji_u1f60a.svg"
            },
            {
                "name": "emoji_u1f60b",
                "file": "emoji_u1f60b.svg"
            },
            {
                "name": "emoji_u1f60c",
                "file": "emoji_u1f60c.svg"
            },
            {
                "name": "emoji_u1f60d",
                "file": "emoji_u1f60d.svg"
            },
            {
                "name": "emoji_u1f60e",
                "file": "emoji_u1f60e.svg"
            },
            {
                "name": "emoji_u1f60f",
                "file": "emoji_u1f60f.svg"
            },
            {
                "name": "emoji_u1f610",
                "file": "emoji_u1f610.svg"
            },
            {
                "name": "emoji_u1f611",
                "file": "emoji_u1f611.svg"
            },
            {
                "name": "emoji_u1f612",
                "file": "emoji_u1f612.svg"
            },
            {
                "name": "emoji_u1f613",
                "file": "emoji_u1f613.svg"
            },
            {
                "name": "emoji_u1f614",
                "file": "emoji_u1f614.svg"
            },
            {
                "name": "emoji_u1f615",
                "file": "emoji_u1f615.svg"
            },
            {
                "name": "emoji_u1f616",
                "file": "emoji_u1f616.svg"
            },
            {
                "name": "emoji_u1f617",
                "file": "emoji_u1f617.svg"
            },
            {
                "name": "emoji_u1f618",
                "file": "emoji_u1f618.svg"
            }
        ];
    }

    selectHandler(feeling) {
        var selected = this.state.selected,
        index = selected.indexOf(feeling.name);

        if (index > -1) {
            selected.splice(index, 1);
        }
        else {
            selected.push(feeling.name);
        }

        this.setState({
            selected: selected
        });
    };

    getSelectedState(feeling) {
        return (this.selected.indexOf(feeling) > -1) ? "selected" : null;
    }

    continue() {
        console.log('====================================');
        console.log(this.state.selected);
        console.log('====================================');
        Store.feelings = this.state.selected;
    }

    render() {
        let feelings = this.getFeelings().map((feeling) => {
            return <Emoji key={feeling.name} className={(this.state.selected.indexOf(feeling.name) > -1) ? "selected" : ""} data={feeling} clickHandler={this.clickHandler} />
        });
        return (
        <div>
            {feelings}
            <button onClick={this.continue.bind(this)}>Fortsæt</button>
        </div>);
    }
}

export default observer( Feelings );