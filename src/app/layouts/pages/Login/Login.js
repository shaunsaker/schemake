import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from '@material-ui/core';

import { routes } from '../../../config';
import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import Form from '../../../components/Form';

const Login = ({ fields, handleForgotPassword, handleSubmit }) => {
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
              <Button onClick={handleForgotPassword} style={{ textTransform: 'none' }}>
                <Typography type="link">Forgot your password?</Typography>
              </Button>
            </div>
          }
          submitButtonText="LOG IN"
          handleSubmit={handleSubmit}
        >
          <div className="signup-text-container">
            <Typography type="paragraph">
              Don&apos;t have an account yet?
              <Link href={routes.signUp.href}>
                <Button style={{ textTransform: 'none' }}>
                  <Typography type="link">Sign up</Typography>
                </Button>
              </Link>
            </Typography>
          </div>
        </Form>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Login.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({})),
  handleForgotPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
};
Login.defaultProps = {};

export default Login;
