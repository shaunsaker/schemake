import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Typography from '../../../../components/Typography';
import PrimaryButton from '../../../../components/PrimaryButton';

const DangerZone = ({ handleDeleteButtonClick }) => {
  return (
    <div className="container">
      <div className="text-container">
        <Typography type="heading" gutterBottom>
          Delete your data
        </Typography>

        <Typography type="paragraph">
          This action will delete your user account, team and any projects you have created. This
          action cannot be reversed. Please be certain.
        </Typography>
      </div>

      <div className="button-container">
        <PrimaryButton handleClick={handleDeleteButtonClick}>DELETE YOUR DATA</PrimaryButton>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

DangerZone.propTypes = {
  handleDeleteButtonClick: PropTypes.func,
};
DangerZone.defaultProps = {};

export default memo(DangerZone);
