import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CommonData } from 'common';
import Store from '../Store';
import {AppVersion} from '../AppVersion';
import './Header.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  version: {
      color: '#ccc'
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
            {CommonData.getLocalized('headerStudent', Store.language)} </div>
            <div className="logo">
              {/* <img style={{width: 80 + "px"}}src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABBCAYAAAA0VEElAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEQxNDMwREQwNEUxMTFFM0I0MDlDMjU3NEE5QjAwMjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEQxNDMwREUwNEUxMTFFM0I0MDlDMjU3NEE5QjAwMjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RDE0MzBEQjA0RTExMUUzQjQwOUMyNTc0QTlCMDAyOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4RDE0MzBEQzA0RTExMUUzQjQwOUMyNTc0QTlCMDAyOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/ProAy1oAABD8SURBVHja7F0JdFTV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"/>
            */}
            </div>
          </Typography>
          <label className={classes.version} >v.{AppVersion}</label>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);