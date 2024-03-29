import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import ClassRoomModel from '../ClassRoomModel.js';
import { EmojiSelector }  from 'common';
import Store from '../Store';
import { observer } from 'mobx-react';
import { CommonData }  from 'common';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
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
    },
    linkToTeacher : {
        paddingTop: '10px',
        width: '98%',
        margin: '50px auto',
        textAlign: 'center',
        borderTop: '1px solid #ccc'
    }
});

class Login extends Component {

    constructor() {
        super();
        this.state = {
            feelingsValidationError : false
        }
    }

    handleLogin(loginData) {
        let val = loginData.val();
        
        if (val) {
            this.setState({subject: val.subject});
            Store.subject = val.subject;
            Store.screen = "condition";            
        } else {
            this.setState({feelingsValidationError: true});
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
        if (data) {
            this.emoji1Name = data.name;
        }
    }

    emoji2Changed(data) {
        if (data) {
            this.emoji2Name = data.name;
        }
    }

    emoji3Changed(data) {
        if (data) {
            this.emoji3Name = data.name;
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
            
                <FormControl fullWidth>
                    <div>
                        <Typography variant="headline" component="h3">
                            <p>
                            {CommonData.getLocalized('loginPageExplainer', Store.language)}
                            </p>
                        </Typography>
                        <EmojiSelector onChange={this.emoji1Changed.bind(this)} emojis={CommonData.getFruitEmojis()} preload={true}/>
                        <EmojiSelector onChange={this.emoji2Changed.bind(this)} emojis={CommonData.getAnimalEmojis()} preload={true}/>
                        <EmojiSelector onChange={this.emoji3Changed.bind(this)} emojis={CommonData.getVehicleEmojis()} preload={true}/>
                    </div>
                    {this.state.feelingsValidationError ? <Typography  component="h3" style={{color: 'red'}}>
                        {CommonData.getLocalized('feelingsValidationError', Store.language)}                    
                    </Typography> : null}
                    <p>{CommonData.getLocalized('participationIsAnonymous', Store.language)}</p>
                    <div>
                        <Button
                            size="large"
                            className={"alignRight " + classes.control}
                            variant="raised"
                            color="primary"
                            onClick={() => this.handleCreateClick()}>{CommonData.getLocalized('buttonStart', Store.language)}</Button>
                    </div>
                    <p className={classes.linkToTeacher}>
                        <a href="https://www.dr.dk/trivsel-opret/">{CommonData.getLocalized('linkToTeacherMode', Store.language)}</a>
                    </p>
                </FormControl>
            </div>
        );
    }
}

export default observer( withStyles(styles)(Login) );