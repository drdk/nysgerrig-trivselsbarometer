import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';
import TeacherModel from '../TeacherModel.js';
import { EmojiSelector}  from 'common';
import smileyemojis from '../assets/smileyemojis.json';
import animalemojis from '../assets/animalemojis.json';
import foodemojis from '../assets/foodemojis.json';
import Store from '../Store';
import { observer } from 'mobx-react';

window.theStore = Store;
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

/* CreatePage.propTypes = {
    classes: PropTypes.object.isRequired
};
 */
class CreatePage extends Component {

    constructor() {
        super();
        var data = [{
                feelings:["emoji_u1f601"],
                state:"Afslappet"
            },
            {
                feelings:["emoji_u1f601"],
                state:"Presset"
            },
            {
                feelings:["emoji_u1f610"],
                state:"Presset"
            },
            {
                feelings:["emoji_u1f610"],
                state:"Okay"
            },
            {
                feelings:["emoji_u1f610"],
                state:"Okay"
            },
            {
                feelings:["emoji_u1f614"],
                state:"Okay"
            },
            {
                feelings:["emoji_u1f614"],
                state:"Afslappet"
            },
            {
                feelings:["emoji_u1f614"],
                state:"Afslappet"
            },
            {
                feelings:["emoji_u1f614"],
                state:"Presset"
            }];
            Store.data = data;
        this.state = {
            classCode: undefined,
            subject: undefined,
            count: 0,
            data: data
        }
    }

    handleChildAdded(childData) {
        let val = childData.val();
        if (typeof val === 'object') {
            this.state.data.push(childData.val());
            console.log(this.state.data)
            this.setState({ count: this.state.data.length })
        }
    }

    handleCreateClick() {
        this.setState({
            classCode: "",
            emojiTimestamp: Date.now()
        });
    }

    classCodeChanged() {
        if (this.emoji1Name && this.emoji2Name && this.emoji3Name) {
            let classCode = this.emoji1Name + this.emoji2Name + this.emoji3Name;
            this.setState({ classCode: classCode });
            new TeacherModel().createClassRoom(classCode, this.state.subject, (childData) => this.handleChildAdded(childData));
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

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <FormControl fullWidth className={classes.control}>
                    <InputLabel htmlFor="subject">Emne:</InputLabel>
                    <Input
                        id="subject"
                        type="text"
                        value={this.state.subject}
                        placeholder="Eks: Hvordan har du det når du skal til dansk prøve ?"
                        onChange={(event) => this.setState({ subject: event.target.value })} />
                </FormControl>
                <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.handleCreateClick()}>Opret</Button>
                <FormControl fullWidth className={classes.control}>
                    <Slide direction="up" in={this.state.classCode !== undefined} mountOnEnter unmountOnExit>

                        <Paper className={classes.paper} elevation={4}>
                            <Typography variant="headline" component="h3">
                                Dit klasserum er nu klar
                             </Typography>
                            <Typography component="p">
                                Deltagerne kan gå til dr.dk/trivselsbarometer og bruge klassekoden :
                            </Typography>
                            <EmojiSelector timestamp={this.state.emojiTimestamp} onChange={this.emoji1Changed.bind(this)} emojis={smileyemojis} random={true} clickDisabled={true} />
                            <EmojiSelector timestamp={this.state.emojiTimestamp} onChange={this.emoji2Changed.bind(this)} emojis={animalemojis} random={true} clickDisabled={true} />
                            <EmojiSelector timestamp={this.state.emojiTimestamp} onChange={this.emoji3Changed.bind(this)} emojis={foodemojis} random={true} clickDisabled={true} />
                            <Typography component="p">
                                Antal der har svaret:
                            </Typography>
                            <Badge className={classes.badge} badgeContent={this.state.count} color="primary"></Badge>
                        </Paper>
                    </Slide>
                </FormControl>
            </div>
        );
    }
}

export default observer(withStyles(styles)(CreatePage));