import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
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
        paddingBottom: 16
    },
    badge: {
        margin: '10px'
    }
});

class FeelingsResults extends Component {
    goToFeelings() {
        Store.screen = "conditionResults";
    }

    render() {
        const { classes } = this.props;
        return (<div>
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
            <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.goToFeelings()}>Se resultat for tilstande</Button>
        </div>);
    }
}

export default observer(withStyles(styles)(FeelingsResults));