import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import { Emoji }  from 'common';
import './Feelings.css';
import { observer } from 'mobx-react';
import Store from '../Store';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px'
    },
    control: {
        marginTop: '20px'
    },
    paper: {
        paddingTop: 16,
        paddingBottom: 16,
        margin: "10px 0",
        cursor: "pointer"
    },
    badge: {
        margin: '10px'
    },
    emojiButton: {},
    stressLevel1: {
        background: "red",
        color: "white"
    },
    stressLevel2: {
        background: "yellow"
    },
    stressLevel3: {
        background: "green",
        color:"white"
    },
});

class Feelings extends Component {

    constructor() {
        super();

        this.clickHandler = this.selectHandler.bind(this);

        Store.feelings = Store.feelings || [];
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

    getFeelingIndex(feeling) {
        return Store.feelings.indexOf(feeling.name);
    }

    getClassName(feeling) {
        return this.getFeelingIndex(feeling) > -1 ? "selected" : null;
    }

    selectHandler(feeling) {
        var index = this.getFeelingIndex(feeling);

        if (index > -1) {
            Store.feelings.splice(index, 1);
        }
        else {
            Store.feelings.push(feeling.name);
        }
        
        this.forceUpdate();
    };

    continue() {
        if (Store.feelings.length > 0) {
            Store.screen = "finish";
        }
    }

    render() {
        const {classes} = this.props;
        let feelings = this.getFeelings().map((feeling) => {
            return <Emoji key={feeling.name} className={this.getClassName(feeling)} data={feeling} clickHandler={this.clickHandler} />
        });
        return (
        <div>
            <FormControl fullWidth className={classes.control}>
                <Slide
                    direction="up"
                    in={Store.subject !== undefined}
                    mountOnEnter
                    unmountOnExit>
                    <Paper className={classes.paper} elevation={4}>
                        <Typography variant="headline" component="h3">
                            {Store.subject}
                        </Typography>
                    </Paper>
                </Slide>
            </FormControl>
            {feelings}
            <button onClick={this.continue.bind(this)}>Fortsæt</button>
        </div>);
    }
}

export default observer( withStyles(styles)(Feelings) );