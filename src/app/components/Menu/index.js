import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@material-ui/core';

import styles from './styles';

const MenuComponent = ({ items, isOpen, handleClick, handleClose }) => {
  return (
    <div>
      <Menu open={isOpen} onClose={handleClose}>
        {items.map((item) => {
          return (
            <MenuItem key={item.name} disabled={item.disabled} onClick={() => handleClick(item)}>
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>

      <style jsx>{styles}</style>
    </div>
  );
};

MenuComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ),
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  handleClose: PropTypes.bool,
};
MenuComponent.defaultProps = {};

export default MenuComponent;
