import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Menu from '../Menu';
import IconButton from '../IconButton';

const ActionPanel = ({ actions, iconColor }) => {
  return (
    <div className="container">
      {actions.map((action) => {
        const id = `action-${action.iconName}`;
        const menuComponent = action.menu && (
          <Menu
            items={action.menu.items}
            anchorElID={id}
            isOpen={action.menu.isOpen}
            handleClick={action.menu.handleClick}
            handleClose={action.menu.handleClose}
          />
        );

        return (
          <div key={id} className="action-container">
            <IconButton
              id={id}
              iconName={action.iconName}
              tooltip={action.tooltip}
              handleClick={action.handleClick}
              color={iconColor}
            />

            {menuComponent}
          </div>
        );
      })}

      <style jsx>{styles}</style>
    </div>
  );
};

ActionPanel.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      iconName: PropTypes.string,
      tooltip: PropTypes.string,
      handleClick: PropTypes.func,
      menu: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({})),
        isOpen: PropTypes.bool.isRequired,
        handleClick: PropTypes.func,
        handleClose: PropTypes.func,
      }),
    }),
  ),
  iconColor: PropTypes.string,
};
ActionPanel.defaultProps = {
  actions: [],
};

export default ActionPanel;
