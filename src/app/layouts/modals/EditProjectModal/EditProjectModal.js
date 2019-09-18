import React, { memo } from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const EditProjectModal = ({
  isOpen,
  newFields,
  hasSuccess,
  isDisabled,
  handleClose,
  handleChange,
  handleSubmit,
}) => {
  let title = 'Edit Project';
  let description = 'Update your project details';
  let form = { fields, disabled: isDisabled, handleChange, handleSubmit };

  if (hasSuccess) {
    title = 'Great Success';
    description = 'Your project has been updated successfully.';
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

EditProjectModal.propTypes = {
  isOpen: PropTypes.bool,
  newFields: PropTypes.arrayOf(PropTypes.shape({})),
  hasSuccess: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
EditProjectModal.defaultProps = {};

export default memo(EditProjectModal);
