import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Typography from '../../../../components/Typography';
import PrimaryButton from '../../../../components/PrimaryButton';

const DangerZone = ({ handleDeleteButtonClick }) => {
  return (
    <div className="container">
      <div className="text-container">
        <Typography type="heading" gutterBottom>
          Delete your user account?
        </Typography>

        <Typography type="paragraph">Once you delete your user, there is no going back.</Typography>
      </div>

      <div className="button-container">
        <PrimaryButton handleClick={handleDeleteButtonClick}>DELETE YOURSELF</PrimaryButton>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

DangerZone.propTypes = {
  handleDeleteButtonClick: PropTypes.func,
};
DangerZone.defaultProps = {};

export default DangerZone;
