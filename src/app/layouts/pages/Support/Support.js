import React, { memo } from 'react';
import PropTypes from 'prop-types';

import fields from './fields';
import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Form from '../../../components/Form';
import PrimaryButton from '../../../components/PrimaryButton';

const Support = ({ hasSuccess, isDisabled, handleSubmit, handleReset }) => {
  let title = 'Support';
  let description =
    "We value feedback so much. If you have any questions, suggestions for improvements or if you think you've found a bug, please let use know. We'd love to hear from you!";
  let formComponent = (
    <Form
      fields={fields}
      submitButtonText="SUBMIT"
      disabled={isDisabled}
      handleSubmit={handleSubmit}
    />
  );

  if (hasSuccess) {
    title = 'Great Success';
    description = 'Your message was submitted successfully.';
    formComponent = <PrimaryButton handleClick={handleReset}>RESET</PrimaryButton>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="text-container">
          <Typography type="title" gutterBottom>
            {title}
          </Typography>

          <Typography type="paragraph">{description}</Typography>
        </div>

        {formComponent}
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Support.propTypes = {
  hasSuccess: PropTypes.bool,
  isDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
};
Support.defaultProps = {};

export default memo(Support);
