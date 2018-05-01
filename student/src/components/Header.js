import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CommonData } from 'common';
import Store from '../Store';
import {AppVersion} from '../AppVersion';

const styles = {
  root: {
    flexGrow: 1,
  },
  version: {
      color: '#ccc',
      right: 10,
      position: 'absolute'
  }
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit">
            {CommonData.getLocalized('headerStudent', Store.language)}
          </Typography>
          <label className={classes.version} >{AppVersion}</label>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);