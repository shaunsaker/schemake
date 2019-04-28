import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Form from '../../../components/Form';

const Support = ({ title, description, form }) => {
  const formComponent = form && (
    <Form
      fields={form.fields}
      submitButtonText="SUBMIT"
      disabled={form.disabled}
      handleSubmit={form.handleSubmit}
    />
  );

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
  title: PropTypes.string,
  description: PropTypes.string,
  form: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({})),
    disabled: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }),
};
Support.defaultProps = {};

export default Support;
