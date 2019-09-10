import React from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const ActionFieldModal = ({ newFields, isOpen, isDisabled, handleClose, handleSubmit }) => {
  const title = `Select a Field`;
  const form = {
    fields: newFields || fields,
    disabled: isDisabled,
    handleSubmit,
  };

  return (
    <Modal
      title={title}
      form={form}
      isOpen={isOpen}
      disabled={isDisabled}
      handleClose={handleClose}
    />
  );
};

ActionFieldModal.propTypes = {
  newFields: PropTypes.arrayOf(PropTypes.shape({})),
  isOpen: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
ActionFieldModal.defaultProps = {};

export default ActionFieldModal;
