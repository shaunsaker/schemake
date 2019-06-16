import React from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const ActionProjectModal = ({ isOpen, isEditing, isDisabled, handleClose, handleSubmit }) => {
  const actionText = isEditing ? 'Edit' : 'Add';
  const title = `${actionText} Project`;
  const description = `${actionText} your project's details.`;
  const form = {
    fields,
    disabled: isDisabled,
    handleSubmit,
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      form={form}
      disabled={isDisabled}
      handleClose={handleClose}
    />
  );
};

ActionProjectModal.propTypes = {
  isOpen: PropTypes.bool,
  isEditing: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
ActionProjectModal.defaultProps = {};

export default ActionProjectModal;
