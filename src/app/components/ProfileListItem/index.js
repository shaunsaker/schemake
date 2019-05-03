import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Typography from '../Typography';
import TextLoading from '../TextLoading';

const ProfileListItem = ({ label, value, hasBg }) => {
  const labelText = `${label}:`;
  const valueTextComponent = value ? (
    <Typography type="paragraph" bold>
      {value}
    </Typography>
  ) : (
    <TextLoading />
  );

  return (
    <div className={`container ${hasBg ? 'bg' : ''}`}>
      <div className="label-text-container">
        <Typography type="paragraph">{labelText}</Typography>
      </div>

      <div className="value-text-container">{valueTextComponent}</div>

      <style jsx>{styles}</style>
    </div>
  );
};

ProfileListItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  hasBg: PropTypes.bool,
};
ProfileListItem.defaultProps = {};

export default ProfileListItem;
