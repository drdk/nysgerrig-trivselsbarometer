import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import TeacherModel from '../TeacherModel.js';
import { EmojiSelector } from 'common';
import Store from '../Store';
import { observer } from 'mobx-react';
import { CommonData, Tracking } from 'common';

let track = new Tracking();
window.theStore = Store;
const styles = theme => ({
    root: {
        margin: '20px',
        textAlign: 'left'
    },
    control: {
        marginTop: '20px'
    },
    paper: {
        paddingTop: 16,
        paddingBottom: 16,
        textAlign: 'center'
    },
    badge: {
        fontSize: '20px',
        margin: '10px'
    },
    hr: {
        margin: '20px 20px 0 20px',
        paddingTop: '20px',
        borderTop: '1px solid #ccc'
    }
});

class CreatePage extends Component {

    constructor() {
        super();

        console.log('Build 0.1.0');

        this.state = {
            emojiTimestamp: Date.now(),
            subject: ""
        }

        Store.data = Store.data || [];
        Store.classCode = undefined;
    }

    handleChildAdded(childData) {
        let val = childData.val();
        if (typeof val === 'object') {
            Store.data.push(childData.val());
            this.forceUpdate();
        }
    }

    handleCreateClick() {
        if (!this.state.subject || this.state.subject.length === 0) {
            return;
        }
        track.send("createNewRoom");
        Store.subject = this.state.subject;
        Store.classCode = "";
        this.resetEmojis();

    }

    resetEmojis() {
        this.emoji1Name = this.emoji2Name = this.emoji3Name = null;

        this.setState({
            emojiTimestamp: Date.now()
        });
    }

    classCodeChanged() {
        if (this.emoji1Name && this.emoji2Name && this.emoji3Name) {
            let classCode = this.emoji1Name + this.emoji2Name + this.emoji3Name;
            Store.classCode = classCode;
            Store.teacherModel = Store.teacherModel || new TeacherModel();
            Store.teacherModel.checkForClassRoom(classCode, (exist) => {
                if (exist) {
                    this.resetEmojis();
                } else {
                    Store.teacherModel.createClassRoom(classCode, Store.subject, (childData) => this.handleChildAdded(childData));
                }
            });
        }
    }

    emoji1Changed(data) {
        this.emoji1Name = data.name;
        this.classCodeChanged();
    }

    emoji2Changed(data) {
        this.emoji2Name = data.name;
        this.classCodeChanged();
    }

    emoji3Changed(data) {
        this.emoji3Name = data.name;
        this.classCodeChanged();
    }

    continue() {
        track.send("showResults");
        Store.screen = "conditionResults";
    }

    render() {
        const { classes } = this.props;
        let continueButton = (Store.data.length > 0) ? (<Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.continue()}>Fortsæt</Button>) : null;

        var createRoom = Store.classCode === undefined ? (<div fullWidth>
            <Typography variant="headline" component="h3">
                <p>
                {CommonData.getLocalized('createPageExplainer', Store.language)}
                </p>
            </Typography>
            <FormControl fullWidth className={classes.control}>
                <InputLabel htmlFor="subject">{CommonData.getLocalized('labelSubject', Store.language)}</InputLabel>
                <Input
                    id="subject"
                    type="text"
                    value={this.state.subject}
                    placeholder={CommonData.getLocalized('subjectWatermarkText', Store.language)}
                    onChange={(event) => { this.setState({ subject: event.target.value }); }} />
            </FormControl>
            <Button size="large" className={classes.control} variant="raised" color="primary" onClick={() => this.handleCreateClick()}>Opret</Button>
        </div>) : null;

        return (
            <div className={classes.root}>
                {createRoom}
                <FormControl fullWidth className={classes.control}>
                    <Slide direction="up" in={Store.classCode !== undefined} mountOnEnter unmountOnExit>
                        <Paper className={classes.paper} elevation={4}>
                            <Typography variant="headline" component="h3">
                                {CommonData.getLocalized('yourClassRoomIsReady', Store.language)}
                             </Typography>
                            <Typography component="p">
                                {CommonData.getLocalized('participationExplainer', Store.language)}
                            </Typography>
                            <EmojiSelector timestamp={this.state.emojiTimestamp} onChange={this.emoji1Changed.bind(this)} emojis={CommonData.getFruitEmojis()} random={true} clickDisabled={true} />
                            <EmojiSelector timestamp={this.state.emojiTimestamp} onChange={this.emoji2Changed.bind(this)} emojis={CommonData.getAnimalEmojis()} random={true} clickDisabled={true} />
                            <EmojiSelector timestamp={this.state.emojiTimestamp} onChange={this.emoji3Changed.bind(this)} emojis={CommonData.getVehicleEmojis()} random={true} clickDisabled={true} />
                            
                            <Typography variant="headline" component="h3" className={classes.hr}>
                                {Store.subject}
                            </Typography>
                            <br />
                            <Typography component="h1" size="large">
                                {CommonData.getLocalized('numberOfReplies', Store.language)}
                            </Typography>
                            <div className={classes.badge}>{Store.data.length}</div>
                            <br />
                            {continueButton}
                        </Paper>
                    </Slide>
                </FormControl>
            </div>
        );
    }
}

export default observer(withStyles(styles)(CreatePage));