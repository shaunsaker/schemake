import React from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const AddTypeModal = ({ type, isOpen, isDisabled, handleClose, handleSubmit }) => {
  const title = `Add ${type}`;
  const form = {
    fields,
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

AddTypeModal.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
AddTypeModal.defaultProps = {};

export default AddTypeModal;
