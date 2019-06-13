import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Typography from '../Typography';

const styles = {
  input: {
    height: 42,
  },
};

const SelectComponent = ({ classes, selectedOptionIndex, options, handleChange }) => {
  return (
    <TextField
      value={selectedOptionIndex}
      onChange={handleChange}
      select
      variant="outlined"
      margin="none"
      InputProps={{
        classes: { root: classes.input },
      }}
    >
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
  classes: PropTypes.shape({}),
  selectedOptionIndex: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  handleChange: PropTypes.func,
};
SelectComponent.defaultProps = {};

export default withStyles(styles)(SelectComponent);
