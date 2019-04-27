import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';

import Icon from '../Icon';

const IconButtonComponent = ({ iconName, tooltip, color }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton style={{ color }}>
        <Icon name={iconName} />
      </IconButton>
    </Tooltip>
  );
};

IconButtonComponent.propTypes = {
  iconName: PropTypes.string,
  tooltip: PropTypes.string.isRequired,
  color: PropTypes.string,
};
IconButtonComponent.defaultProps = {};

export default IconButtonComponent;
