import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/Modal';

const DeleteTypeModal = ({ type, name, isOpen, isDisabled, handleClose, handleSubmit }) => {
  const title = `Are you sure you want to delete the ${type && type.toLowerCase()}, ${name}?`;
  const form = {
    fields: [],
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

DeleteTypeModal.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  isOpen: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
DeleteTypeModal.defaultProps = {};

export default memo(DeleteTypeModal);
