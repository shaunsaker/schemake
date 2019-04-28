import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { routes } from '../../../config';
import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Form from '../../../components/Form';
import PrimaryButton from '../../../components/PrimaryButton';

const SignUp = ({ fields, disabled, handleSubmit }) => {
  return (
    <Layout>
      <div className="container">
        <div className="text-container">
          <Typography type="title" gutterBottom>
            Create a schemake account
          </Typography>

          <Typography type="paragraph">Enter your email address and password.</Typography>
        </div>

        <Form
          fields={fields}
          submitButtonText="SIGN UP"
          disabled={disabled}
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
  fields: PropTypes.arrayOf(PropTypes.shape({})),
  disabled: PropTypes.bool,
  handleForgotPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
};
SignUp.defaultProps = {};

export default SignUp;
