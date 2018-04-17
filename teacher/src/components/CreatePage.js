import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
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

class CreatePage extends Component {

    constructor() {
        super();

        /* Temp data */
var data = [{
            feelings:[{
                "name": "Bekymret",
                "file": "emoji_u1f633.svg"
            }],
            condition:"Afslappet"
        },
        {
            feelings:[{
                "name": "Glad",
                "file": "emoji_u1f600.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Frustreret",
                "file": "emoji_u1f635.svg"
            }],
            condition:"Okay"
        },
        {
            feelings:[{
                "name": "Frustreret",
                "file": "emoji_u1f635.svg"
            }],
            condition:"Okay"
        },
        {
            feelings:[{
                "name": "Glad",
                "file": "emoji_u1f600.svg"
            }],
            condition:"Okay"
        },
        {
            feelings:[{
                "name": "Utålmodig",
                "file": "emoji_u1f644.svg"
            }],
            condition:"Afslappet"
        },
        {
            feelings:[{
                "name": "Skidt tilpas",
                "file": "emoji_u1f628.svg"
            }],
            condition:"Afslappet"
        },
        {
            feelings:[{
                "name": "Glad",
                "file": "emoji_u1f600.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk2",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk3",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk8",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },{
            feelings:[{
                "name": "Optimistisk2",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk3",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk7",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk7777",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },{
            feelings:[{
                "name": "Optimistisk7777",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk7777",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        },
        {
            feelings:[{
                "name": "Optimistisk7777",
                "file": "emoji_u1f60f.svg"
            }],
            condition:"Presset"
        }];

        this.state = {
            emojiTimestamp: Date.now(),
            subject: "Gummiænder"
        }
        
        Store.data = data || [];
        Store.classCode = undefined;
        setTimeout(() => {
            this.handleCreateClick();            
        }, 100);
    }

    handleChildAdded(childData) {
        let val = childData.val();
        if (typeof val === 'object') {
            Store.data.push(childData.val());
        }
    }

    handleCreateClick() {
        if (!this.state.subject || this.state.subject.length === 0) {
            return;
        }

        Store.subject = this.state.subject;
        Store.classCode = "";
        this.setState({
            emojiTimestamp: Date.now()
        });
    }

    classCodeChanged() {
        if (this.emoji1Name && this.emoji2Name && this.emoji3Name) {
            let classCode = this.emoji1Name + this.emoji2Name + this.emoji3Name;
            Store.classCode = classCode;
            new TeacherModel().createClassRoom(classCode, Store.subject, (childData) => this.handleChildAdded(childData));
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
        Store.screen = "conditionResults";
    }

    render() {
        const { classes } = this.props;
        let continueButton = (Store.data.length > 0) ? (<Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.continue()}>Fortsæt</Button>) : null;

        return (
            <div className={classes.root}>
                <FormControl fullWidth className={classes.control}>
                    <InputLabel htmlFor="subject">Emne:</InputLabel>
                    <Input
                        id="subject"
                        type="text"
                        value={this.state.subject}
                        placeholder="Eks: Hvordan har du det når du skal til dansk prøve ?"
                        onChange={(event) => { this.setState({ subject: event.target.value }); }} />
                </FormControl>
                <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.handleCreateClick()}>Opret</Button>
                <FormControl fullWidth className={classes.control}>
                    <Slide direction="up" in={Store.classCode !== undefined} mountOnEnter unmountOnExit>

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
                            <Badge className={classes.badge} badgeContent={Store.data.length} color="primary"><b></b></Badge>
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