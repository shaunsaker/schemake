import React, { memo } from 'react';
import PropTypes from 'prop-types';

import fields from './fields';

import Modal from '../../../components/Modal';

const ActionTypeModal = ({
  title,
  newFields,
  isOpen,
  isDisabled,
  handleClose,
  handleChange,
  handleSubmit,
}) => {
  const form = {
    fields: newFields || fields,
    disabled: isDisabled,
    handleChange,
    handleSubmit,
  };

  return <Modal title={title} form={form} isOpen={isOpen} handleClose={handleClose} />;
};

ActionTypeModal.propTypes = {
  title: PropTypes.string,
  newFields: PropTypes.arrayOf(PropTypes.shape({})),
  isOpen: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleClose: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
ActionTypeModal.defaultProps = {};

export default memo(ActionTypeModal);
