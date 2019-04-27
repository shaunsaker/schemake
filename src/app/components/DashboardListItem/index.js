import React from 'react';
import PropTypes from 'prop-types';
import { Card, ButtonBase } from '@material-ui/core';

import styles from './styles';

import Avatar from '../Avatar';
import Typography from '../Typography';
import Icon from '../Icon';
import Menu from '../Menu';

const DashboardListItem = ({ avatarText, title, description, menu, handleMenuIconClick }) => {
  const menuAnchorElID = 'menu-button';
  const menuComponent = menu && <Menu {...menu} anchorElID="menu-button" />;

  return (
    <Card>
      <div className="container">
        <div className="avatar-container">
          <Avatar>{avatarText}</Avatar>
        </div>

        <div className="text-container">
          <Typography type="paragraph" bold gutterBottom>
            {title}
          </Typography>

          <Typography type="paragraph">{description}</Typography>
        </div>

        <div className="menu-icon-container">
          <ButtonBase id={menuAnchorElID} onClick={handleMenuIconClick}>
            <Icon name="menu" />
          </ButtonBase>

          {menuComponent}
        </div>
      </div>

      <style jsx>{styles}</style>
    </Card>
  );
};

DashboardListItem.propTypes = {
  avatarText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  menu: PropTypes.shape({}),
  handleMenuIconClick: PropTypes.func,
};
DashboardListItem.defaultProps = {};

export default DashboardListItem;
