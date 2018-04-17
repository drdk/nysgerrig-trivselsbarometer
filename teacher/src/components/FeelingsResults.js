import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';
import Store from '../Store';
import { observer } from 'mobx-react';
import './FeelingsResults.css';

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

    createDiagram() {
        var feelings = {},
        feelingsArray = [];

        for (let i = 0; i < Store.data.length; i++) {
            const answer = Store.data[i];

            for (let j = 0; j < answer.feelings.length; j++) {
                const feeling = answer.feelings[j];
                feelings[feeling.name] = feelings[feeling.name] || { name: feeling.name, file: feeling.file, count: 0 };
                feelings[feeling.name].count++;
            }
        }

        for (var feeling in feelings) {
            feelingsArray.push(feelings[feeling]);
        }
        feelingsArray.sort((a, b) => {
            if (a.count < b.count) {
                return 1;
            }
            else if (a.count > b.count) {
                return -1;
            }

            return 0;
        });
        var refScale = feelingsArray[0].count;

        for (let i = 0; i < feelingsArray.length; i++) {
            const feeling = feelingsArray[i];            
            feeling.scale = (feeling.count / refScale) * 100;
        }

        return (
        <div className="diagramBody">
            <div>
            {feelingsArray.map((feeling) => {
                return (
                    <div key={feeling.name}>
                        <div data-count={feeling.count} data-name={feeling.name} className="bar" style={{height: feeling.scale + "%" }}>
                            <img alt={feeling.name} src={"https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/" + feeling.file} />                            
                        </div>
                    </div>
                )
            })}
            </div>            
        </div>);
    }

    render() {
        const { classes } = this.props;
        let diagram = this.createDiagram();
        return (<div>
            <FormControl fullWidth className={classes.control}>
                <Paper className={classes.paper} elevation={4}>
                    <Typography variant="headline" component="h3">
                        {Store.subject}
                    </Typography>
                </Paper>
            </FormControl>
            {diagram}
            <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.goToFeelings()}>Se resultat for tilstande</Button>
        </div>);
    }
}

export default observer(withStyles(styles)(FeelingsResults));