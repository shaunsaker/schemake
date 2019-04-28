import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import HeaderBar from '../HeaderBar';
import FooterBar from '../FooterBar';
import PrimaryButton from '../PrimaryButton';
import DevInfo from '../DevInfo';

const Layout = ({ handleSendFeedbackClick, children }) => {
  return (
    <div className="container">
      <HeaderBar />

      <div className="content-container">{children}</div>

      <div className="footer-container">
        <FooterBar />
      </div>

      <div className="dev-info-container">
        <DevInfo />
      </div>

      <div className="send-feedback-button-container">
        <PrimaryButton small accent handleClick={handleSendFeedbackClick}>
          SEND FEEDBACK
        </PrimaryButton>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

Layout.propTypes = {
  handleSendFeedbackClick: PropTypes.func,
  children: PropTypes.node,
};
Layout.defaultProps = {};

export default Layout;
