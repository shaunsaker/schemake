import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

import { analytics } from '../../config';

const { trackingId } = analytics;
const isDev = !process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === 'dev';

export class AnalyticsHandler extends React.Component {
  constructor(props) {
    super(props);

    this.initialiseGA = this.initialiseGA.bind(this);
    this.setUserId = this.setUserId.bind(this);
  }

  static get propTypes() {
    return {
      uid: PropTypes.string,
    };
  }

  componentDidMount() {
    const { uid } = this.props;

    this.initialiseGA();

    if (uid) {
      this.setUserId(uid);
    }
  }

  componentDidUpdate(prevProps) {
    const { uid } = this.props;

    if (uid && !prevProps.uid) {
      this.setUserId(uid);
    }
  }

  initialiseGA() {
    ReactGA.initialize(trackingId, { debug: isDev });
  }

  setUserId(uid) {
    ReactGA.set({ userId: uid });
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const { uid } = user;

  return {
    uid,
  };
}

export default connect(mapStateToProps)(AnalyticsHandler);
