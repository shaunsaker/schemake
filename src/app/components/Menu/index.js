import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@material-ui/core';

import muiStyles from './muiStyles';

import Typography from '../Typography';

const MenuComponent = ({ items, anchorElId, isOpen, handleClose }) => {
  const anchorEl = document.getElementById(anchorElId);

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
      {items.map((item) => {
        return (
          <MenuItem
            key={item.name}
            disabled={item.disabled}
            onClick={() => {
              item.handleClick();
              handleClose();
            }}
            style={muiStyles.menuItem}
          >
            <Typography type="paragraph">{item.name}</Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );
};

MenuComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      disabled: PropTypes.bool,
      handleClick: PropTypes.func.isRequired,
    }),
  ),
  anchorElId: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};
MenuComponent.defaultProps = {};

export default MenuComponent;
