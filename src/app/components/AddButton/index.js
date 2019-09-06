import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@material-ui/core';

import styles from './styles';
import { colors } from '../../static/styles/styleConstants';

import Icon from '../Icon';
import Typography from '../Typography';

const AddButton = ({ primary, children, handleClick }) => {
  const color = primary ? 'white' : colors.secondaryText;

  return (
    <ButtonBase onClick={handleClick} style={{ width: '100%' }}>
      <div className={`container${primary ? ' primary-container' : ''}`}>
        <div className="icon-container">
          <Icon name="add" color={color} />
        </div>

        <Typography type="paragraph" bold color={color}>
          {children}
        </Typography>
      </div>

      <style jsx>{styles}</style>
    </ButtonBase>
  );
};

AddButton.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func,
};
AddButton.defaultProps = {};

export default AddButton;
