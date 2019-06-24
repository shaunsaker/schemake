import React from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const AddProjectModal = ({ isOpen, hasSuccess, isDisabled, handleClose, handleSubmit }) => {
  let title = 'Add Project';
  let description = "Add your project's details.";
  let form = {
    fields,
    disabled: isDisabled,
    handleSubmit,
  };

  if (hasSuccess) {
    title = 'Great Success.';
    description = 'New project created successfully.';
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

AddProjectModal.propTypes = {
  isOpen: PropTypes.bool,
  hasSuccess: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
AddProjectModal.defaultProps = {};

export default AddProjectModal;
