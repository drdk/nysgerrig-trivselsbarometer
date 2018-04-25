import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Store from '../Store';
import { observer } from 'mobx-react';
import { CommonData } from 'common';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px'
    },
    control: {
        marginTop: '20px'
    },
    condition: {
        paddingTop: 16,
        paddingBottom: 16,
        margin: "10px 0",
        cursor: "pointer"
    },
    badge: {
        margin: '10px'
    },
    subjectHeaderText: {
        fontSize: "12px",
        color: "grey",
        paddingBottom: "7px"
    },
    subjectText: {
        fontSize: "20px"
    },
    selected: {
        fontSize: "30px",
        outline: "5px dotted black"
    }
});



class Condition extends Component {
    continue() {
        if (!Store.condition) {
            return;
        }
        Store.screen = "feelings";
    }

    setCondition(condition) {
        Store.condition = condition;
        this.forceUpdate();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <div className={classes.root}>
                <FormControl fullWidth className={classes.control}>
                    <div className={classes.subjectHeaderText}>Emne</div>
                <div className={classes.subjectText}>{Store.subject}</div >
                </FormControl>
                <FormControl fullWidth className={classes.control}>
                    {CommonData.getConditions().map((condition) => {
                        var selected = Store.condition === condition.name ? classes.selected : null;
                        return (
                            <Button key={condition.name} variant="raised" className={[classes.condition, classes.conditionRelaxed,  selected ].join(' ')} 
                            style={{ backgroundColor: condition.color }} elevation={4} onClick={this.setCondition.bind(this, condition.name)}>
                                <Typography variant="headline" component="h3">
                                    {condition.name}
                                </Typography>
                            </Button>)
                    })}
                </FormControl>
                
            </div>
            <Button
                className={"alignRight " + classes.control}
                variant="raised"
                color="primary"
                onClick={this.continue.bind(this)}>Fortsæt
                </Button>
            </div>
        );
    }
}

export default observer(withStyles(styles)(Condition));