import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import muiStyles from './muiStyles';

const AvatarComponent = ({ src, alt }) => {
  return <Avatar src={src} alt={alt} style={muiStyles.image} />;
};

AvatarComponent.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
AvatarComponent.defaultProps = {};

export default AvatarComponent;
