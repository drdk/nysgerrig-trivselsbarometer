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
    goToFeelings() {
        Store.screen = "feelingsResults";
    }
    calculateRender(condition){
      var items = Store.data;
      var thisCondition = 0;
      for (var i = 0; i < items.length; i++) {
        if(items[i].condition === condition)
        thisCondition++;
      };
      var proportion = Math.floor(63 * (thisCondition / items.length))+12;
      return {
          width: proportion+"%"
      };
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