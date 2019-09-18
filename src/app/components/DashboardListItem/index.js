import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, ButtonBase } from '@material-ui/core';

import styles from './styles';
import { colors, sizes } from '../../static/styles/styleConstants';

import TextAvatar from '../TextAvatar';
import Typography from '../Typography';
import Menu from '../Menu';
import TextLoading from '../TextLoading';

const DashboardListItem = ({ id, avatarText, title, description, menu, handleClick }) => {
  const titleLoadingComponent = !title && <TextLoading />;
  const descriptionLoadingComponent = !description && <TextLoading />;
  const menuComponent = menu ? (
    <div className="menu-container">
      <Menu {...menu} anchorElId={`menu-button-${id}`} />

      <style jsx>{styles}</style>
    </div>
  ) : null;

  return (
    <Card
      style={{
        width: '100%',
        position: 'relative',
        boxShadow: 'none',
        border: `1px solid ${colors.lightGrey}`,
        borderRadius: sizes.borderRadius,
      }}
    >
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
              <Typography type="small" secondary>
                {description}
              </Typography>

              {descriptionLoadingComponent}
            </div>
          </div>
        </div>
      </ButtonBase>

      {menuComponent}

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

export default memo(DashboardListItem);
