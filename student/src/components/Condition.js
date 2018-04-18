import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import Store from '../Store';
import { observer } from 'mobx-react';
import { CommonData }  from 'common';

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
    conditionRelaxed: {
        background: "green",
        color:"white"
    },
    conditionOK: {
        background: "yellow"
    },
    conditionStressed: {
        background: "red",
        color: "white"
    }
});

class Condition extends Component {

    setCondition(condition) {
        Store.condition = condition;
        Store.screen = "feelings";
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
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
                <FormControl fullWidth className={classes.control}>
                    {CommonData.getConditions().map((condition) => {
                        return (
                        <Paper className={[classes.paper, classes.conditionRelaxed].join(' ')} style={{backgroundColor: condition.color}} elevation={4} onClick={this.setCondition.bind(this, condition.name)}>
                            <Typography variant="headline" component="h3">
                                {condition.name}
                            </Typography>
                        </Paper>)
                    })}
                </FormControl>
            </div>
        );
    }
}

export default observer( withStyles(styles)(Condition) );