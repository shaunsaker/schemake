import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/Modal';

const DeleteProjectModal = ({
  isOpen,
  name,
  hasSuccess,
  isDisabled,
  handleClose,
  handleSubmit,
}) => {
  let title = `Are you sure you want to delete the project, ${name}?`;
  let description = 'This action cannot be reversed. Please be certain.';
  let form = {
    fields: [],
    disabled: isDisabled,
    handleSubmit,
  };

  if (hasSuccess) {
    title = 'Great Success.';
    description = `Your project, ${name}, has successfully been deleted.`;
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

DeleteProjectModal.propTypes = {
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  hasSuccess: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};
DeleteProjectModal.defaultProps = {};

export default memo(DeleteProjectModal);
