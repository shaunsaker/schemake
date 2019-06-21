import React from 'react';

import styles from './styles';

import Typography from '../../../../components/Typography';
import CircularProgress from '../../../../components/CircularProgress';

const NoTeamBlankState = () => {
  return (
    <div className="container">
      <Typography type="heading" gutterBottom>
        Uno Momento...
      </Typography>

      <Typography type="paragraph">
        If you&apos;re seeing this, we&apos;re still busy creating your team. Don&apos;t fret, this
        should only take a moment.
      </Typography>

      <div className="circular-progress-container">
        <CircularProgress />
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

NoTeamBlankState.propTypes = {};
NoTeamBlankState.defaultProps = {};

export default NoTeamBlankState;
