import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from './styles';

import Menu from '../Menu';
import IconButton from '../IconButton';
import PrimaryButton from '../PrimaryButton';
import Typography from '../Typography';

const ActionPanel = ({ actions, color }) => {
  return (
    <div className="container">
      {actions.map((action) => {
        const id = `action-${action.iconName}`;
        const menuComponent = action.menu && <Menu anchorElId={id} {...action.menu} />;
        const actionComponent = action.text ? (
          <Link key={action.href} href={action.href}>
            <div>
              <PrimaryButton text small>
                <Typography type="link" color={color} style={{ textDecorationLine: 'none' }}>
                  {action.text}
                </Typography>
              </PrimaryButton>
            </div>
          </Link>
        ) : (
          <IconButton
            id={id}
            iconName={action.iconName}
            tooltip={action.tooltip}
            handleClick={action.handleClick}
            color={color}
          />
        );

        return (
          <div key={id} className="action-container">
            {actionComponent}

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
      text: PropTypes.string, // render this instead of icon if supplied
      iconName: PropTypes.string,
      tooltip: PropTypes.string,
      handleClick: PropTypes.func,
      menu: PropTypes.shape({}),
    }),
  ),
  color: PropTypes.string,
};
ActionPanel.defaultProps = {
  actions: [],
};

export default ActionPanel;
