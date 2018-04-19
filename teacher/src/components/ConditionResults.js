import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';
import Store from '../Store';
import { observer } from 'mobx-react';
import { CommonData }  from 'common';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px',
        height:'25vw'
    },
    control: {
        marginTop: '20px'
    },
    top: {
        paddingTop: 16,
        paddingBottom: 16,
    },    
    conditionCard: {
        paddingTop: 16,
        paddingBottom: 16,
        width: "12%",
        marginRight:"0.33%"
    },
    badge: {
        margin: '10px'
    }
});

class ConditionResults extends Component {

    goToFeelings() {
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
    componentWillMount(){
      var answers = Store.data,
      totalAnswers = answers.length,
      conditions = CommonData.getConditions(),
      numberOfConditions = conditions.length,
      totalWidth = 99,
      minWidth = 12,
      proportionalWidthPart = ((totalWidth - (numberOfConditions * minWidth)) / totalAnswers),
      i;

      for (i = 0; i < answers.length; i++) {
          var condition = conditions[this.indexOfCondition(conditions, answers[i].condition)];
          condition.count = (condition.count || 0) + 1;
      }

      for (i = 0; i < conditions.length; i++) {
          conditions[i].count = conditions[i].count || 0;
          conditions[i].proportion = (proportionalWidthPart * conditions[i].count) + minWidth;
      }

      this.setState({conditions: conditions});
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <FormControl fullWidth className={classes.control}>
                    <Paper className={classes.top} elevation={4}>
                        <Typography variant="headline" component="h3">
                            {Store.subject}
                        </Typography>
                    </Paper>
                </FormControl>
                <div className={classes.root}>
                    {this.state.conditions.map((condition) => {
                        var percentage = (condition.count/Store.data.length)*100;
                        return <Paper key={condition.name} className={classes.conditionCard} style={this.calculateRender(condition)} elevation={4}>
                            <Typography variant="headline" component="h3">
                                {condition.name}
                            </Typography>
                            <Typography variant="body" component="h5">
                                {condition.count} stemte {(percentage % 1 === 0) ? percentage : percentage.toFixed(2)}%
                            </Typography>
                        </Paper>               
                    })}
                </div>
                <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.goToFeelings()}>Se resultat for følelser</Button>
            </div>
        );
    }
}

export default observer(withStyles(styles)(ConditionResults));