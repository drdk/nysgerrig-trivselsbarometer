import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CommonData } from 'common';
import Store from '../Store';
import { AppVersion } from '../AppVersion';
import './Header.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  version: {
    color: '#ccc'
  },
  reload: {
    position: 'absolute',
    right: '10px'
  }
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit">
            <div className="title">
              {CommonData.getLocalized('headerTeacher', Store.language)}
            </div>
            <div className="logo"></div>
          </Typography>
          <label className={classes.version} >v.{AppVersion}</label>
          <Button size="large" className={classes.reload} variant="raised" color="primary" onClick={() => window.location.href = '/trivsel-opret/' }>Opret nyt spørgsmål</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);