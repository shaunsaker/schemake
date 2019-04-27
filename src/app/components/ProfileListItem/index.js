import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Typography from '../Typography';

const ProfileListItem = ({ label, value, hasBg }) => {
  const labelText = `${label}:`;

  return (
    <div className={`container ${hasBg ? 'bg' : ''}`}>
      <Typography type="paragraph">{labelText}</Typography>

      <div className="value-text-container">
        <Typography type="paragraph" bold>
          {value}
        </Typography>
      </div>

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
