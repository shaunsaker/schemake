import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const CircularProgressComponent = ({ classes, small }) => {
  return <CircularProgress classes={{ colorPrimary: classes.container }} size={small && 24} />;
};

CircularProgressComponent.propTypes = {
  classes: PropTypes.shape({}),
  small: PropTypes.bool,
};
CircularProgressComponent.defaultProps = {};

export default withStyles(styles)(CircularProgressComponent);
