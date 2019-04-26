import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import muiStyles from './muiStyles';

const AvatarComponent = ({ children }) => {
  return <Avatar style={muiStyles.container}>{children}</Avatar>;
};

AvatarComponent.propTypes = {
  children: PropTypes.string,
};
AvatarComponent.defaultProps = {};

export default AvatarComponent;
