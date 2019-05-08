import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@material-ui/core';

import muiStyles from './muiStyles';

const MenuComponent = ({ items, anchorElID, isOpen, handleClose }) => {
  const anchorEl = document.getElementById(anchorElID);

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
            {item.name}
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
  anchorElID: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};
MenuComponent.defaultProps = {};

export default MenuComponent;
