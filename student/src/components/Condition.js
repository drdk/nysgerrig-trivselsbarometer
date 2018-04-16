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


    setStress1() {
        Store.screen = "feelings"
        Store.condition = 1;
    }

    setStress2() {
        Store.screen = "feelings"
        Store.condition = 2;
    }

    setStress3() {
        Store.screen = "feelings"
        Store.condition = 3;
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <FormControl fullWidth className={classes.control}>
                    <Paper className={[classes.paper, classes.stressLevel3].join(' ')} elevation={4} onClick={this.setStress1.bind(this)}>
                        <Typography variant="headline" component="h3">
                            Ingen stress
                        </Typography>
                    </Paper>
                    <Paper className={[classes.paper, classes.stressLevel2].join(' ')} elevation={4} onClick={this.setStress2.bind(this)}>
                        <Typography variant="headline" component="h3">
                            Lidt stress
                        </Typography>
                    </Paper>                    
                    <Paper className={[classes.paper, classes.stressLevel1].join(' ')} elevation={4} onClick={this.setStress3.bind(this)}>
                        <Typography variant="headline" component="h3">
                            Mega stress
                        </Typography>
                    </Paper>
                </FormControl>
            </div>
        );
    }
}

export default observer( withStyles(styles)(StressLevel) );
