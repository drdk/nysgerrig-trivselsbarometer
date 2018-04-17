import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import Badge from 'material-ui/Badge';
import {withStyles} from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import { EmojiSelector}  from 'common';
import smileyemojis from '../assets/smileyemojis.json';
import animalemojis from '../assets/animalemojis.json';
import foodemojis from '../assets/foodemojis.json';
import Store from '../Store';
import { observer } from 'mobx-react';


var availWidth = 99;
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
        paddingBottom: '25%',
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
    calculateRender(feeling){
      var items = Store.data;
      var thisFeeling = 0;
      for (var i = 0; i < items.length; i++) {
        if(items[i].state == feeling)
          thisFeeling++;
      };
      var proportion = Math.floor(63 * (thisFeeling / items.length))+12;
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