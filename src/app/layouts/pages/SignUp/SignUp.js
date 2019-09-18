import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { app, routes } from '../../../config';
import fields from './fields';
import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Form from '../../../components/Form';
import PrimaryButton from '../../../components/PrimaryButton';

const SignUp = ({ isDisabled, handleSubmit }) => {
  return (
    <Layout>
      <div className="container">
        <div className="text-container">
          <Typography type="title" gutterBottom>
            Create a {app.name} account
          </Typography>

          <Typography type="paragraph">
            Enter your details below to join <b>{app.name}</b>.
          </Typography>
        </div>

        <Form
          fields={fields}
          submitButtonText="SIGN UP"
          disabled={isDisabled}
          handleSubmit={handleSubmit}
        >
          <div className="footer-text-container">
            <Typography type="paragraph">Already have an account?</Typography>

            <Link href={routes.login.href}>
              <div className="signup-text-container">
                <PrimaryButton text small>
                  <Typography type="link">Log in</Typography>
                </PrimaryButton>
              </div>
            </Link>
          </div>
        </Form>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

SignUp.propTypes = {
  isDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
};
SignUp.defaultProps = {};

export default memo(SignUp);
