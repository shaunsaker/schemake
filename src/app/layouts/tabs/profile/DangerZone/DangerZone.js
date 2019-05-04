import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import PrimaryButton from '../../../../components/PrimaryButton';

const DangerZone = ({ handleDeleteButtonClick }) => {
  return (
    <div className="container">
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
