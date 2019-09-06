import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';

import styles from './styles';
import { colors } from '../../static/styles/styleConstants';

import Icon from '../Icon';
import Typography from '../Typography';

const AddButton = ({ children, handleClick }) => {
  return (
    <ButtonBase onClick={handleClick} style={{ width: '100%' }}>
      <div className="container">
        <div className="icon-container">
          <Icon name="add" color={colors.primary} />
        </div>

        <Typography type="paragraph" bold color={colors.secondaryText}>
          {children}
        </Typography>
      </div>

      <style jsx>{styles}</style>
    </ButtonBase>
  );
};

AddButton.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
};
AddButton.defaultProps = {};

export default AddButton;
