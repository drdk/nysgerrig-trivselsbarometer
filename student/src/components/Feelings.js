import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import { Emoji } from 'common';
import './Feelings.css';
import { observer } from 'mobx-react';
import Store from '../Store';
import { CommonData } from 'common';

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

    subjectHeaderText: {
        fontSize: "12px",
        color: "grey",
        paddingBottom: "7px"
    },
    subjectText: {
        fontSize: "20px"
    }
});

class Feelings extends Component {

    constructor() {
        super();

        Store.feelings = Store.feelings || [];
    }

    getFeelingIndex(feeling) {
        for (let i = 0; i < Store.feelings.length; i++) {
            if (Store.feelings[i].name === feeling.name) {
                return i;
            }
        }

        return -1;
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
            Store.feelings.push(feeling);
        }

        this.forceUpdate();
    };

    continue() {
        if (Store.feelings.length > 0) {
            Store.screen = "finish";
        }
    }

    render() {
        const { classes } = this.props;
        let feelings = CommonData.getFeelings().map((feeling) => {
            return (
                <div key={feeling.name} style={{ backgroundColor: feeling.color }} >
                    <div className={this.getClassName(feeling)} onClick={this.selectHandler.bind(this, feeling)}>
                        <Emoji name={feeling.name} data={feeling} />
                        <br />
                        <label htmlFor={feeling.name}>{feeling.name}</label>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <FormControl fullWidth className={classes.control}>
                    <div className={classes.subjectHeaderText}>Emne</div>
                    <div className={classes.subjectText}>{Store.subject}</div >
                </FormControl>
                <div className="feelings">
                    <div className="positive">
                        {feelings.slice(0, 5)}
                    </div>
                    <div className="negative">
                        {feelings.slice(5)}
                    </div>
                </div>
                <Button
                    className={"alignRight " + classes.control}
                    variant="raised"
                    color="primary"
                    onClick={this.continue.bind(this)}>Fortsæt</Button>
            </div>);
    }
}

export default observer(withStyles(styles)(Feelings));