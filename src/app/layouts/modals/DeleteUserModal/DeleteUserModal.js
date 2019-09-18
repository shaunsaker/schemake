import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/Modal';

const DeleteUserModal = ({ isOpen, hasSuccess, isDisabled, handleClose, handleSubmit }) => {
  let title = 'Are you sure you want to delete your data?';
  let description =
    'This action will delete your user account, team and any projects you have created. This action cannot be reversed. Please be certain.';
  let form = {
    fields: [],
    disabled: isDisabled,
    handleSubmit,
  };

  if (hasSuccess) {
    title = "We're sad to see you go :(";
    description =
      'Your profile and user data has been scheduled for deletion. Please allow up to an hour for this. We will now sign you out of your account.';
    form = null;
  }

  return (
    <Modal
      title={title}
      description={description}
      form={form}
      isOpen={isOpen}
      disabled={isDisabled}
      handleClose={handleClose}
    />
  );
};

DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
DeleteUserModal.defaultProps = {};

export default memo(DeleteUserModal);
