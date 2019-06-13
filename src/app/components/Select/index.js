import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';

import Typography from '../Typography';

const SelectComponent = ({ selectedOptionIndex, options, handleChange }) => {
  return (
    <TextField value={selectedOptionIndex} onChange={handleChange} select variant="outlined">
      {options.map((item, index) => {
        return (
          <MenuItem key={item.name} value={index}>
            <Typography type="paragraph">{item.name}</Typography>
          </MenuItem>
        );
      })}
    </TextField>
  );
};

SelectComponent.propTypes = {
  selectedOptionIndex: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  handleChange: PropTypes.func,
};
SelectComponent.defaultProps = {};

export default SelectComponent;
