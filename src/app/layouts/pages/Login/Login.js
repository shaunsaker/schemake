import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { routes } from '../../../config';
import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Form from '../../../components/Form';
import PrimaryButton from '../../../components/PrimaryButton';

const Login = ({ fields, disabled, handleForgotPassword, handleSubmit }) => {
  return (
    <Layout>
      <div className="container">
        <div className="text-container">
          <Typography type="title" gutterBottom>
            Log in to schemake
          </Typography>

          <Typography type="paragraph">Enter your email address and password.</Typography>
        </div>

        <Form
          fields={fields}
          footerComponent={
            <div className="forgot-password-text-container">
              <PrimaryButton text small handleClick={handleForgotPassword}>
                <Typography type="link">Forgot your password?</Typography>
              </PrimaryButton>
            </div>
          }
          submitButtonText="LOG IN"
          disabled={disabled}
          handleSubmit={handleSubmit}
        >
          <div className="footer-text-container">
            <Typography type="paragraph">Don&apos;t have an account yet?</Typography>

            <Link href={routes.signUp.href}>
              <div className="signup-text-container">
                <PrimaryButton text small>
                  <Typography type="link">Sign up</Typography>
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

Login.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({})),
  disabled: PropTypes.bool,
  handleForgotPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
};
Login.defaultProps = {};

export default Login;
