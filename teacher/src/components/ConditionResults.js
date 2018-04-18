import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';
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
    getConditions() {
        return [
            "Afslappet",
            "OK",
            "Belastet"
        ];
    }
    goToFeelings() {
        Store.screen = "feelingsResults";
    }
    calculateRender(condition){
      return {
          width: this.state.conditions[condition].proportion+"%"
      };
    }
    componentWillMount(){
      var answers = Store.data,
      totalAnswers = answers.length,
      conditions = JSON.parse('{"' + this.getConditions().join('": 0, "') + '": 0}'),
      numberOfConditions = Object.keys(conditions).length,
      totalWidth = 99,
      minWidth = 12,
      proportionalWidthPart = ((totalWidth - (numberOfConditions * minWidth)) / totalAnswers);

      for (var i = 0; i < answers.length; i++) {
          conditions[answers[i].condition]++;
      }

      for (var condition in conditions) {
        var conditionVotes = conditions[condition],
        proportion = (proportionalWidthPart * conditionVotes) + minWidth;
        
        conditions[condition] = {
          proportion: proportion,
          count: conditions[condition]
        };
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
                    {this.getConditions().map((condition) => {
                        return <Paper key={condition} className={classes.conditionCard} style={this.calculateRender(condition)} elevation={4}>
                            <Typography variant="headline" component="h3">
                                {condition}
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