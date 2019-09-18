import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

const Splash = () => {
  return (
    <div className="container">
      <img src="static/images/logo.png" alt="Schemake logo" className="logo" />

      <style jsx>{styles}</style>
    </div>
  );
};

Splash.propTypes = {};
Splash.defaultProps = {};

export default memo(Splash);
