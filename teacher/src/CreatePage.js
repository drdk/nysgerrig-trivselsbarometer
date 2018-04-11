import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';
import TeacherModel from './TeacherModel.js';


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

/* CreatePage.propTypes = {
    classes: PropTypes.object.isRequired
};
 */
class CreatePage extends Component {

    constructor() {
        super();
        this.state = {
            classCode: undefined,
            subject: undefined,
            count: 0,
            data: []
        }
    }

    handleChildAdded(childData) {
        let val = childData.val();
        if (typeof val === 'object') {
            this.state.data.push(childData.val());
            this.setState({ count: this.state.data.length })
        }
    }

    handleCreateClick() {
        let model = new TeacherModel();
        let classCode = model.getClassCode();
        model.createClassRoom(classCode, this.state.subject, (childData) => this.handleChildAdded(childData));
        this.setState({ classCode: classCode });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <FormControl fullWidth className={classes.control}>
                    <InputLabel htmlFor="subject">Emne:</InputLabel>
                    <Input
                        id="subject"
                        type="text"
                        value={this.state.subject}
                        placeholder="Eks: Hvordan har du det når du skal til dansk prøve ?"
                        onChange={(event) => this.setState({ subject: event.target.value })} />
                </FormControl>
                <Button className={"alignRight " + classes.control} variant="raised" color="primary" onClick={() => this.handleCreateClick()}>Opret</Button>
                <FormControl fullWidth className={classes.control}>
                    <Slide direction="up" in={this.state.classCode !== undefined} mountOnEnter unmountOnExit>

                        <Paper className={classes.paper} elevation={4}>
                            <Typography variant="headline" component="h3">
                                Dit klasserum er nu klar
                             </Typography>
                            <Typography component="p">
                                Deltagerne kan gå til dr.dk/trivselsbarometer og bruge klassekoden :
                            </Typography>
                            <Typography color="primary">{this.state.classCode}</Typography>
                            <Typography component="p">
                                Antal der har svaret:
                            </Typography>
                            <Badge className={classes.badge} badgeContent={this.state.count} color="primary"></Badge>
                        </Paper>
                    </Slide>
                </FormControl>
            </div>
        );
    }
}


export default withStyles(styles)(CreatePage);

