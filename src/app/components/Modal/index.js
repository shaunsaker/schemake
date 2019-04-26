import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, Card } from '@material-ui/core';

import styles from './styles';

import Typography from '../Typography';
import Form from '../Form';

const ModalComponent = ({ title, description, form, isOpen, handleClose }) => {
  const descriptionComponent = description && (
    <div className="description-text-container">
      <Typography type="paragraph" center>
        {description}
      </Typography>

      <style jsx>{styles}</style>
    </div>
  );

  const formComponent = form && (
    <Form
      fields={form.fields}
      center
      secondaryButton={{ text: 'CANCEL', handleClick: handleClose }}
      handleSubmit={form.handleSubmit}
    />
  );

  return (
    <Fragment>
      <Modal open={isOpen} onClose={handleClose} style={{ outline: 'none' }}>
        <div className="container">
          <Card>
            <div className="content-container">
              <Typography type="heading" center gutterBottom>
                {title}
              </Typography>

              {descriptionComponent}

              {formComponent}
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
  form: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({})),
    handleSubmit: PropTypes.func,
  }),
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
ModalComponent.defaultProps = {};

export default ModalComponent;
