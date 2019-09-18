import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import muiStyles from './muiStyles';

const TextAvatar = ({ small, children }) => {
  const styles = {
    ...muiStyles.container,
    ...(small && muiStyles.small),
  };

  return <Avatar style={styles}>{children}</Avatar>;
};

TextAvatar.propTypes = {
  small: PropTypes.bool,
  children: PropTypes.string,
};
TextAvatar.defaultProps = {};

export default memo(TextAvatar);
