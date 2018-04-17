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
    constructor(){
      super();
    }
    goToFeelings() {
        Store.screen = "feelingsResults";
    }
    calculateRender(condition){
      console.log(this.state)
      return {
          width: this.state.conditions[condition].proportion+"%"
      };
    }
    componentWillMount(){
      var items = Store.data;
      var conditions = {
        "Okay":0,
        "Presset":0,
        "Afslappet":0
      };
      for (var i = 0; i < items.length; i++) {
        if(!conditions.hasOwnProperty(items[i].condition))
          conditions[items[i].condition]= 1;
        else 
          conditions[items[i].condition]++;
      };
      for(var condition in conditions){
        var numberOfConditions = Object.keys(conditions).length;
        var totalVotes = items.length;
        var conditionVotes = conditions[condition];

        var proportion = (conditionVotes === 0) ? 12 : (( ( 99-(numberOfConditions*12) ) / totalVotes ) * conditionVotes )+12
        
        conditions[condition] = {
          proportion: proportion,
          count: conditions[condition]
        };
      }
      this.setState({conditions: conditions})

    }
    render() {
        const { classes } = this.props;
        return (<div>
            <FormControl fullWidth className={classes.control}>
              <Paper className={classes.top} elevation={4}>
                  <Typography variant="headline" component="h3">
                      {Store.subject}
                  </Typography>
              </Paper>
            </FormControl>
           <div className={classes.root}>
              <Paper className={classes.conditionCard} style={this.calculateRender("Afslappet")} elevation={4}>
                  <Typography variant="headline" component="h3">
                      Afslappet
                   </Typography>
              </Paper>
              <Paper className={classes.conditionCard} style={this.calculateRender("Okay")} elevation={4}>
                  <Typography variant="headline" component="h3">
                      Okay
                   </Typography>
              </Paper>
              <Paper className={classes.conditionCard} style={this.calculateRender("Presset")} elevation={4}>
                  <Typography variant="headline" component="h3">
                      Presset
                   </Typography>
              </Paper>
            </div>
            <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.goToFeelings()}>Se resultat for følelser</Button>
        </div>);
    }
}

export default observer(withStyles(styles)(ConditionResults));