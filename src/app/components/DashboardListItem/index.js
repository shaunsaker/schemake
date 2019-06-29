import React from 'react';
import PropTypes from 'prop-types';
import { Card, ButtonBase } from '@material-ui/core';

import styles from './styles';

import TextAvatar from '../TextAvatar';
import Typography from '../Typography';
import Menu from '../Menu';
import TextLoading from '../TextLoading';

const DashboardListItem = ({ id, avatarText, title, description, menu, handleClick }) => {
  const menuAnchorElId = `menu-button-${id}`;
  const titleLoadingComponent = !title && <TextLoading />;
  const descriptionLoadingComponent = !description && <TextLoading />;

  return (
    <Card style={{ width: '100%', position: 'relative' }}>
      <ButtonBase onClick={handleClick} disabled={!handleClick} style={{ width: '100%' }}>
        <div className="container">
          <div className="avatar-container">
            <TextAvatar>{avatarText}</TextAvatar>
          </div>

          <div className="text-container">
            <div className="value-text-container">
              <Typography type="paragraph" bold>
                {title}
              </Typography>

              {titleLoadingComponent}
            </div>

            <div className="text-spacer" />

            <div className="value-text-container">
              <Typography type="paragraph" secondary>
                {description}
              </Typography>

              {descriptionLoadingComponent}
            </div>
          </div>
        </div>
      </ButtonBase>

      <div className="menu-container">
        <Menu {...menu} anchorElId={menuAnchorElId} />
      </div>

      <style jsx>{styles}</style>
    </Card>
  );
};

DashboardListItem.propTypes = {
  id: PropTypes.string,
  avatarText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  menu: PropTypes.shape({}),
  handleClick: PropTypes.func,
  handleMenuButtonClick: PropTypes.func,
};
DashboardListItem.defaultProps = {};

export default DashboardListItem;
