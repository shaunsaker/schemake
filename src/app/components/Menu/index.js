import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@material-ui/core';

import muiStyles from './muiStyles';

const MenuComponent = ({ items, anchorElID, isOpen, handleClick, handleClose }) => {
  const anchorEl = document.getElementById(anchorElID);

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
      {items.map((item) => {
        return (
          <MenuItem
            key={item.name}
            disabled={item.disabled}
            onClick={() => handleClick(item)}
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
    }),
  ),
  anchorElID: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
};
MenuComponent.defaultProps = {};

export default MenuComponent;
