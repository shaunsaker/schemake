import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, Card } from '@material-ui/core';

import styles from './styles';

import Typography from '../Typography';
import Form from '../Form';
import PrimaryButton from '../PrimaryButton';

const ModalComponent = ({ title, description, form, isOpen, disabled, handleClose }) => {
  const descriptionComponent = description && (
    <Typography type="paragraph" center>
      {description}
    </Typography>
  );

  const formComponent = form && (
    <Form {...form} center secondaryButton={{ text: 'CANCEL', handleClick: handleClose }} />
  );

  const closeButtonComponent = !form && (
    <div className="close-button-container">
      <PrimaryButton disabled={disabled} handleClick={handleClose}>
        CLOSE
      </PrimaryButton>

      <style jsx>{styles}</style>
    </div>
  );

  return (
    <Fragment>
      <Modal open={isOpen} onClose={handleClose} disableBackdropClick={disabled}>
        <div className="container">
          <Card>
            <div className="content-container">
              <div className="text-container">
                <Typography type="heading" center gutterBottom>
                  {title}
                </Typography>

                {descriptionComponent}
              </div>

              {formComponent}

              {closeButtonComponent}
            </div>
          </Card>
        </div>
      </Modal>

      <style jsx>{styles}</style>
    </Fragment>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  form: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  handleClose: PropTypes.func,
};
ModalComponent.defaultProps = {};

export default ModalComponent;
