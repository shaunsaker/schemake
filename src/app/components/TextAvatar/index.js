import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import muiStyles from './muiStyles';

const TextAvatar = ({ children }) => {
  return <Avatar style={muiStyles.container}>{children}</Avatar>;
};

TextAvatar.propTypes = {
  children: PropTypes.string,
};
TextAvatar.defaultProps = {};

export default TextAvatar;
