import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {withStyles} from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';
import StudentModel from './StudentModel.js';
import EmojiSelector from './elements/emojiselector';
import smileyemojis from './elements/smileyemojis.json';
import animalemojis from './elements/animalemojis.json';
import foodemojis from './elements/foodemojis.json';

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
    },
    emojiButton: {}
});

/* CreatePage.propTypes = {
    classes: PropTypes.object.isRequired
};
 */
class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            classCode: undefined,
            subject: undefined
        }
    }

    handleLogin(loginData) {
        let val = loginData.val();
        this.setState({subject: val.subject});
    }

    handleCreateClick() {
        let classCode = this.emoji1Name + this.emoji2Name + this.emoji3Name;
        new StudentModel().login(classCode, (loginData) => this.handleLogin(loginData));
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

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <EmojiSelector onChange={this.emoji1Changed.bind(this)} emojis={smileyemojis} preload={true}/>
                <EmojiSelector onChange={this.emoji2Changed.bind(this)} emojis={animalemojis} preload={true}/>
                <EmojiSelector onChange={this.emoji3Changed.bind(this)} emojis={foodemojis} preload={true}/>
                <FormControl fullWidth className={classes.control}>
                    <InputLabel htmlFor="classcode">Klassekode:</InputLabel>
                    <Input
                        id="classcode"
                        type="text"
                        value={this.state.classcode}
                        placeholder="Skriv klassekode som du har fået af din lærer"
                        onChange={(event) => this.setState({classCode: event.target.value})}/>
                </FormControl>
                <Button
                    className={"alignRight " + classes.control}
                    variant="raised"
                    color="primary"
                    onClick={() => this.handleCreateClick()}>Start</Button>
                <FormControl fullWidth className={classes.control}>
                    <Slide
                        direction="up"
                        in={this.state.subject !== undefined}
                        mountOnEnter
                        unmountOnExit>
                        <Paper className={classes.paper} elevation={4}>
                            <Typography variant="headline" component="h3">
                                {this.state.subject}
                            </Typography>
                        </Paper>
                    </Slide>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(LoginPage);
