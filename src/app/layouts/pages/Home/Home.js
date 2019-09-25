import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import Typography from '../../../components/Typography';
import PrimaryButton from '../../../components/PrimaryButton';

const Home = ({ headerBarProps, isExampleLoading, handleSignUpClick, handleExampleClick }) => {
  return (
    <Layout headerBarProps={headerBarProps} noChildrenStyles>
      <div className="container">
        <div className="content-container">
          <div className="left-container">
            <div className="title-text-container">
              <Typography type="title" color="white">
                Firestore schema for modern teams
              </Typography>
            </div>

            <div className="description-text-container">
              <Typography type="paragraph" color="white">
                With Schemake, you can create graphical representations of your Firestore schema.
                Collaborative. Realtime. Mobile-friendly. Free.{' '}
              </Typography>
            </div>

            <div className="buttons-container">
              <div className="button-container">
                <PrimaryButton primary handleClick={handleSignUpClick}>
                  <Typography type="paragraph" color="white" bold>
                    SIGN UP FOR FREE
                  </Typography>
                </PrimaryButton>
              </div>

              <div className="button-container">
                <PrimaryButton text loading={isExampleLoading} handleClick={handleExampleClick}>
                  <Typography type="paragraph" color="white" bold>
                    SEE EXAMPLE
                  </Typography>
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Home.propTypes = {
  headerBarProps: PropTypes.shape({}),
  handleSignUpClick: PropTypes.func,
  handleExampleClick: PropTypes.func,
};
Home.defaultProps = {};

export default memo(Home);
