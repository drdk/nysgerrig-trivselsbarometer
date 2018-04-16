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
import StudentModel from '../StudentModel.js';
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

/* CreatePage.propTypes = {
    classes: PropTypes.object.isRequired
};
 */
class StressLevel extends Component {

    setStress(level) {
        Store.screen = "feelings"
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
                <FormControl fullWidth className={classes.control}>
                    <Paper className={[classes.paper, classes.stressLevel1].join(' ')} elevation={4} level={1} onClick={this.setStress.bind(this)}>
                        <Typography variant="headline" component="h3">
                            Mega stress
                        </Typography>
                    </Paper>
                    <Paper className={[classes.paper, classes.stressLevel2].join(' ')} elevation={4} level={2} onClick={this.setStress.bind(this)}>
                        <Typography variant="headline" component="h3">
                            Lidt stress
                        </Typography>
                    </Paper>                    
                    <Paper className={[classes.paper, classes.stressLevel3].join(' ')} elevation={4} level={3} onClick={this.setStress.bind(this)}>
                        <Typography variant="headline" component="h3">
                            Ingen stress
                        </Typography>
                    </Paper>
                </FormControl>
            </div>
        );
    }
}

export default observer( withStyles(styles)(StressLevel) );
