import React from 'react';

import styles from './styles';

import Typography from '../Typography';
import CircularProgress from '../CircularProgress';

const BlankState = () => {
  return (
    <div className="container">
      <Typography type="heading" gutterBottom>
        Uno Momento
      </Typography>

      <Typography type="paragraph">Getting things ready for you...</Typography>

      <div className="circular-progress-container">
        <CircularProgress />
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

BlankState.propTypes = {};
BlankState.defaultProps = {};

export default BlankState;
