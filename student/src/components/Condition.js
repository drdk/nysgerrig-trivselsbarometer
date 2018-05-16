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
        margin: '30px 20px 20px 20px'
    },
    control: {
        marginTop: '-10px'
    },
    condition: {
        paddingTop: "11px",
        paddingBottom: "6px",
        margin: "6px auto",
        cursor: "pointer",
        width: "260px",
        border: "1px solid transparent"
    },
    helperText: {
        fontSize: "18px",
        color: "grey",
        padding: '8px 13px 18px 13px'
    },
    subjectText: {
        fontSize: "24px"
    },
    selected: {
        fontSize: "30px",
        boxShadow: "none !important",
        transform: "translate(1px, 2px)"
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
                    <div className={classes.subjectText}>{Store.subject}</div >
                    <div className={classes.helperText}>{CommonData.getLocalized('chooseCondition', Store.language)}</div>                    
                </FormControl>
                <FormControl fullWidth className={classes.control}>
                    {CommonData.getConditions(Store.language).map((condition) => {
                        var selected = Store.condition === condition.name ? classes.selected : null;
                        return (
                            <Button key={condition.name} variant="raised" className={[classes.condition, classes.conditionRelaxed,  selected ].join(' ')} 
                            style={{ backgroundColor: condition.color }} elevation={4} onClick={this.setCondition.bind(this, condition.name)}>
                                <Typography variant="headline" component="div">
                                    {condition.name}
                                </Typography>
                            </Button>)
                    })}                    
                </FormControl>       
            </div>
            <Button
                size="large"
                className={"alignRight " + classes.control}
                variant="raised"
                color="primary"
                disabled={!Store.condition}
                onClick={this.continue.bind(this)}>{CommonData.getLocalized('buttonContinue', Store.language)}
                </Button>
                <br/><br/>
            </div>
        );
    }
}

export default observer(withStyles(styles)(Condition));