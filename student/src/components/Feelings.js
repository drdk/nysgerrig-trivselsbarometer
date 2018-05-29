import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import './Feelings.css';
import { observer } from 'mobx-react';
import Store from '../Store';
import { CommonData, EmojiSelector } from 'common';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px'
    },
    control: {
        marginTop: '20px'
    },
    continueButton: {
        marginBottom: '50px'
    },
    helperText: {
        fontSize: "18px",
        color: "grey",
        paddingBottom: "7px",
        padding: '20px'
    },
    subjectText: {
        fontSize: "24px"
    }
});

class Feelings extends Component {

    constructor() {
        super();

        Store.feelings = Store.feelings || [];

        this.emoji1 = null;
        this.emoji2 = null;
        this.emoji3 = null;
    }

    getClassName(feeling) {
        return this.getFeelingIndex(feeling) > -1 ? "selected" : null;
    }

    getFeelings() {
        var that = this,
        feelings = CommonData.getFeelingEmojis(Store.language),
        dontKnow = feelings.pop(),
        checkExistance = function(name) {
            var exists = (that.emoji1 && that.emoji1.name === name) ||
            (that.emoji2 && that.emoji2.name === name) ||
            (that.emoji3 && that.emoji3.name === name);
            
            return exists;
        };

        feelings.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            else if (a.name > b.name) {
                return 1;
            }

            return 0;
        });

        feelings.push(dontKnow);

        for (var i = 0; i < feelings.length; i++) {
            var name = feelings[i].name;

            if (checkExistance(name)) {
                feelings.splice(i, 1);
                i--;
            }
        }

        return feelings;
    }

    getFeelingIndex(feeling) {
        for (let i = 0; i < Store.feelings.length; i++) {
            if (Store.feelings[i].name === feeling.name) {
                return i;
            }
        }

        return -1;
    }

    updateStore() {        
        Store.feelings = [];

        if (this.emoji1) {
            Store.feelings.push(this.emoji1);
        }

        if (this.emoji2) {
            Store.feelings.push(this.emoji2);
        }

        if (this.emoji3) {
            Store.feelings.push(this.emoji3);
        }

        this.forceUpdate();
    };

    emoji1Changed(feeling) {
        this.emoji1 = feeling;
        this.updateStore();
    }

    emoji2Changed(feeling) {
        this.emoji2 = feeling;
        this.updateStore();
    }

    emoji3Changed(feeling) {
        this.emoji3 = feeling;
        this.updateStore();
    }

    continue() {
        if (Store.feelings.length > 0) {
            Store.classRoom.submitAnswer();
            Store.screen = "finish";            
        }
    }

    render() {
        const { classes } = this.props;

        var selector1 = <EmojiSelector onChange={this.emoji1Changed.bind(this)} emojis={this.getFeelings()} preload={true} renderName />,
        selector2 = Store.feelings.length > 0 ? <EmojiSelector onChange={this.emoji2Changed.bind(this)} emojis={this.getFeelings()} preload={true} renderName /> : null,
        selector3 = Store.feelings.length > 1 ? <EmojiSelector onChange={this.emoji3Changed.bind(this)} emojis={this.getFeelings()} preload={true} renderName /> : null;

        return (
            <div>
                <FormControl fullWidth className={classes.control}>
                    <div className={classes.subjectText}>{Store.subject}</div >
                    <div className={classes.helperText}>{CommonData.getLocalized('chooseFeelings', Store.language)}</div>                    
                </FormControl>
                {selector1}{selector2}{selector3}
                <div className="feelings">
                </div>
                <Button
                    size="large"
                    className={"alignRight " + classes.control + " " + classes.continueButton}
                    variant="raised"
                    color="primary"
                    onClick={this.continue.bind(this)}
                    disabled={Store.feelings.length === 0}
                    >{CommonData.getLocalized('buttonContinue', Store.language)}</Button>
                    <br/><br/>
            </div>);
    }
}

export default observer(withStyles(styles)(Feelings));