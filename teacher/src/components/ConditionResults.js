import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';
import Store from '../Store';
import { observer } from 'mobx-react';
import { CommonData, Tracking }  from 'common';
import './ConditionResults.css';


let track = new Tracking();
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px 20px 40px 20px',
        height:'calc(100vh - 350px)'
    },
    control: {
        marginTop: '20px'
    },
    top: {
        paddingTop: 16,
        paddingBottom: 16,
    }
});

class ConditionResults extends Component {

    goToFealings() {
        track.send("showfeelings");
        Store.screen = "feelingsResults";
    }
    calculateRender(condition){
      return {
          width: condition.proportion + "%",
          backgroundColor: condition.color
      };
    }
    indexOfCondition(conditions, conditionName) {
        for (var i = 0; i < conditions.length; i++) {
            if (conditions[i].name === conditionName) {
                return i;
            }
        }

        return -1;
    }

    createDiagram() {
        var conditionsArray = [],
        conditions = {},
        refConditions = CommonData.getConditions(),
        getColor = function(name) {
            for (let i = 0; i < refConditions.length; i++) {
                if (name === refConditions[i].name) {
                    return refConditions[i].color;
                }
            }
        };

        for (let i = 0; i < Store.data.length; i++) {
            const answer = Store.data[i];

            conditions[answer.condition] = conditions[answer.condition] || { name: answer.condition, color: getColor(answer.condition), count: 0 };
            conditions[answer.condition].count++;
        }

        for (var condition in conditions) {
            conditionsArray.push(conditions[condition]);
        }
        conditionsArray.sort((a, b) => {
            if (a.count < b.count) {
                return 1;
            }
            else if (a.count > b.count) {
                return -1;
            }

            return 0;
        });
        var refScale = conditionsArray[0].count;

        for (let i = 0; i < conditionsArray.length; i++) {
            const condition = conditionsArray[i];            
            condition.scale = (condition.count / refScale) * 100;
        }

        return (
        <div className="diagramBodyConditions">
            <div>
            {conditionsArray.map((condition) => {
                return (
                    <div key={condition.name}>
                        <div data-count={condition.count} data-name={condition.name} className="bar" style={{height: condition.scale + "%", backgroundColor: condition.color }}>
                            <p><b>{condition.name}</b></p>
                        </div>
                    </div>
                )
            })}
            </div>            
        </div>);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <FormControl fullWidth className={classes.control}>
                    <div className={classes.top} elevation={4}>
                        <Typography variant="headline" component="h3">
                            {Store.subject}
                        </Typography>
                    </div>
                </FormControl>
                <div className={classes.root}>
                    {this.createDiagram()}
                </div>
                <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.goToFealings()}>{CommonData.getLocalized('seeFeelingResults')}</Button>
            </div>
        );
    }
}

export default observer(withStyles(styles)(ConditionResults));