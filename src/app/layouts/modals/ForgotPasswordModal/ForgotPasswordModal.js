import React from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const ForgotPasswordModal = ({ isOpen, hasSuccess, isDisabled, handleClose, handleSubmit }) => {
  let title = 'Forgot your password?';
  let description = "Enter your email address and we'll send you a password reset email.";
  let form = { fields, disabled: isDisabled, handleSubmit };

  if (hasSuccess) {
    title = 'Great Success';
    description = 'We have sent your password reset email successfully.';
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

ForgotPasswordModal.propTypes = {
  isOpen: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  email: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
ForgotPasswordModal.defaultProps = {};

export default ForgotPasswordModal;
