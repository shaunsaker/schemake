import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Card } from '@material-ui/core';

import styles from './styles';

import Icon from '../Icon';
import Typography from '../Typography';

const AddButton = ({ children, handleClick }) => {
  return (
    <ButtonBase onClick={handleClick} style={{ width: '100%' }}>
      <Card style={{ width: '100%' }}>
        <div className="container">
          <div className="icon-container">
            <Icon name="add" size={36} />
          </div>

          <Typography type="paragraph" bold>
            {children}
          </Typography>
        </div>
      </Card>

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
