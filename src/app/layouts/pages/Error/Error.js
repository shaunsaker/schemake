import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import PrimaryButton from '../../../components/PrimaryButton';

const Error = ({ errorMessage, handleGoHomeClick, handleContactSupportClick }) => {
  return (
    <Layout>
      <div className="container">
        <Typography type="title" gutterBottom>
          Houston, we have a problem.
        </Typography>

        <Typography type="paragraph">{errorMessage}</Typography>

        <div className="buttons-container">
          <div className="button-container">
            <PrimaryButton primary handleClick={handleGoHomeClick}>
              <Typography type="paragraph" bold color="white">
                GO HOME
              </Typography>
            </PrimaryButton>
          </div>

          <div className="button-container">
            <PrimaryButton text handleClick={handleContactSupportClick}>
              <Typography type="paragraph" bold>
                CONTACT SUPPORT
              </Typography>
            </PrimaryButton>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Error.propTypes = {
  errorMessage: PropTypes.string,
  handleGoHomeClick: PropTypes.func,
  handleContactSupportClick: PropTypes.func,
};
Error.defaultProps = {
  errorMessage:
    "The page you're searching for doesn't exist. It has either been moved or the link is broken.",
};

export default Error;
