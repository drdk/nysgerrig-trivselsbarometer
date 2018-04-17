import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import ClassRoomModel from '../ClassRoomModel.js';
import { EmojiSelector }  from 'common';
import smileyemojis from '../assets/smileyemojis.json';
import animalemojis from '../assets/animalemojis.json';
import foodemojis from '../assets/foodemojis.json';
import Store from '../Store';
import { observer } from 'mobx-react';

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
        paddingBottom: 16
    },
    badge: {
        margin: '10px'
    }
});

class LoginPage extends Component {

    handleLogin(loginData) {
        let val = loginData.val();
        if (val.subject) {
            this.setState({subject: val.subject});
            Store.subject = val.subject;
            Store.screen = "condition";            
        }
    }

    tryLogin(classCode) {
        Store.classRoom = Store.classRoom || new ClassRoomModel();
        Store.classRoom.login(classCode, (loginData) => this.handleLogin(loginData));
    }

    handleCreateClick() {
        let classCode = this.emoji1Name + this.emoji2Name + this.emoji3Name;
        this.tryLogin(classCode);
    }

    emoji1Changed(data) {
        this.emoji1Name = data.name;
    }

    emoji2Changed(data) {
        this.emoji2Name = data.name;
    }

    emoji3Changed(data) {
        this.emoji3Name = data.name;
    }

    componentWillMount() {
        let params = (new URL(document.location)).searchParams;
        let classCode = params.get("classcode");
        if (classCode && classCode.length > 0) {
            this.tryLogin(classCode);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
            
                <FormControl fullWidth>
                    <div>
                        <EmojiSelector onChange={this.emoji1Changed.bind(this)} emojis={smileyemojis} preload={true}/>
                        <EmojiSelector onChange={this.emoji2Changed.bind(this)} emojis={animalemojis} preload={true}/>
                        <EmojiSelector onChange={this.emoji3Changed.bind(this)} emojis={foodemojis} preload={true}/>
                    </div>
                    <div>
                        <Button
                            className={"alignRight " + classes.control}
                            variant="raised"
                            color="primary"
                            onClick={() => this.handleCreateClick()}>Start</Button>
                    </div>
                </FormControl>
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
            </div>
        );
    }
}

export default observer( withStyles(styles)(LoginPage) );