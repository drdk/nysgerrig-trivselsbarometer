import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {FormControl} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';
import Store from '../Store';
import { observer } from 'mobx-react';
import { CommonData, Tracking } from 'common';
import './FeelingsResults.css';

let track = new Tracking();

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
    }
});

class FeelingsResults extends Component {
    goToFeelings() {
        track.send("showCondition");
        Store.screen = "conditionResults";
    }

    createDiagram() {
        var feelings = {},
        feelingsArray = [];

        for (let i = 0; i < Store.data.length; i++) {
            const answer = Store.data[i];

            for (let j = 0; j < answer.feelings.length; j++) {
                const feeling = answer.feelings[j];
                feelings[feeling.name] = feelings[feeling.name] || { name: feeling.name, file: feeling.file, color: feeling.color, count: 0 };
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
            <div className="diagramBodyFeelingsWrapper">
        <div className="diagramBodyFeelings">
            <div>
            {feelingsArray.map((feeling) => {
                return (
                    <div key={feeling.name}>
                        <div data-count={feeling.count} data-name={feeling.name} className="bar" style={{height: feeling.scale + "%", backgroundColor: feeling.color }}>
                            <div>
                                <img alt={feeling.name} src={"https://www.dr.dk/tjenester/nysgerrig/assets/NotoColorEmoji/" + feeling.file} />
                                <div>{feeling.name}</div>
                            </div>                            
                        </div>
                    </div>
                )
            })}
            </div>            
        </div>
        </div>);
    }

    render() {
        const { classes } = this.props;
        let diagram = this.createDiagram();
        return (<div>
            <FormControl fullWidth className={classes.control}>
                <div className={classes.paper} elevation={4}>
                    <Typography variant="headline" component="h3">
                        {Store.subject}
                    </Typography>
                </div>
            </FormControl>
            {diagram}
            <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.goToFeelings()}>{CommonData.getLocalized('seeConditionResults')}</Button>
        </div>);
    }
}

export default observer(withStyles(styles)(FeelingsResults));