import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import PrimaryButton from '../../../../components/PrimaryButton';
import ProfileListItem from '../../../../components/ProfileListItem';

const General = ({ name, organisation, email, handleEditProfileClick }) => {
  const profileListItems = [
    {
      label: 'NAME',
      value: name,
      hasBg: true,
    },
    {
      label: 'ORGANISATION',
      value: organisation,
      hasBg: false,
    },
    {
      label: 'EMAIL',
      value: email,
      hasBg: true,
    },
  ];

  return (
    <div className="container">
      <div className="button-container">
        <PrimaryButton handleClick={handleEditProfileClick}>EDIT PROFILE</PrimaryButton>
      </div>

      <div className="items-container">
        {profileListItems.map((item) => (
          <div key={item.label} className="item-container">
            <ProfileListItem {...item} />
          </div>
        ))}
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

General.propTypes = {
  name: PropTypes.string,
  organisation: PropTypes.string,
  email: PropTypes.string,
  handleEditProfileClick: PropTypes.func,
};
General.defaultProps = {};

export default memo(General);
