import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';

import Typography from '../Typography';

const SelectComponent = ({ selectedOptionIndex, options, handleChange }) => {
  return (
    <Select value={selectedOptionIndex} onChange={handleChange}>
      {options.map((item, index) => {
        return (
          <MenuItem key={item.name} value={index}>
            <Typography type="paragraph">{item.name}</Typography>
          </MenuItem>
        );
      })}
    </Select>
  );
};

SelectComponent.propTypes = {
  selectedOptionIndex: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  handleChange: PropTypes.func,
};
SelectComponent.defaultProps = {};

export default SelectComponent;
