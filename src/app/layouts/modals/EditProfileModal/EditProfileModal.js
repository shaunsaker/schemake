import React from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const SendFeedbackModal = ({
  isOpen,
  newFields,
  hasSuccess,
  isDisabled,
  handleClose,
  handleChange,
  handleSubmit,
}) => {
  let title = 'Edit Profile';
  let description = 'Update your details';
  let form = { fields, disabled: isDisabled, handleChange, handleSubmit };

  if (hasSuccess) {
    title = 'Great Success';
    description = 'Your profile has been updated successfully.';
    form = null;
  } else if (newFields) {
    /*
     * If newFields was supplied, it means we are editing
     * and have updated values to render
     */
    form.fields = newFields;
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

SendFeedbackModal.propTypes = {
  isOpen: PropTypes.bool,
  newFields: PropTypes.arrayOf(PropTypes.shape({})),
  hasSuccess: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
SendFeedbackModal.defaultProps = {};

export default SendFeedbackModal;
