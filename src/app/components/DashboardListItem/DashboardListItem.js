import React from 'react';
import PropTypes from 'prop-types';
import { Card, ButtonBase } from '@material-ui/core';

import styles from './styles';

import TextAvatar from '../TextAvatar';
import Typography from '../Typography';
import IconButton from '../IconButton';
import Menu from '../Menu';

const DashboardListItem = ({
  avatarText,
  title,
  description,
  menu,
  handleClick,
  handleMenuButtonClick,
}) => {
  const menuAnchorElId = 'menu-button';
  const menuComponent = menu && (
    <div className="menu-button-container">
      <div id={menuAnchorElId}>
        <IconButton iconName="menu" tooltip="Toggle menu" handleClick={handleMenuButtonClick} />
      </div>

      <Menu {...menu} anchorElId="menu-button" />

      <style jsx>{styles}</style>
    </div>
  );

  return (
    <Card style={{ width: '100%', position: 'relative' }}>
      <ButtonBase onClick={handleClick} disabled={!handleClick} style={{ width: '100%' }}>
        <div className="container">
          <div className="avatar-container">
            <TextAvatar>{avatarText}</TextAvatar>
          </div>

          <div className="text-container">
            <Typography type="paragraph" bold gutterBottom>
              {title}
            </Typography>

            <Typography type="paragraph" secondary>
              {description}
            </Typography>
          </div>
        </div>
      </ButtonBase>

      {menuComponent}

      <style jsx>{styles}</style>
    </Card>
  );
};

DashboardListItem.propTypes = {
  avatarText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  menu: PropTypes.shape({}),
  handleClick: PropTypes.func,
  handleMenuButtonClick: PropTypes.func,
};
DashboardListItem.defaultProps = {};

export default DashboardListItem;
