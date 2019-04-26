import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import muiStyles from './muiStyles';

const AvatarComponent = ({ text }) => {
  return <Avatar style={muiStyles.container}>{text}</Avatar>;
};

AvatarComponent.propTypes = {
  text: PropTypes.string,
};
AvatarComponent.defaultProps = {};

export default AvatarComponent;
