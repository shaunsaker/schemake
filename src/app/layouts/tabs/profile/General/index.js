import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import General from './General';

import withSyncData from '../../../../enhancers/withSyncData';

export class GeneralContainer extends React.Component {
  constructor(props) {
    super(props);

    this.syncUserData = this.syncUserData.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Connect
     */
    userData: PropTypes.shape({}),
    uid: PropTypes.string,

    /*
     * withSyncData
     */
    syncData: PropTypes.func,
  };

  static defaultProps = {};

  componentDidMount() {
    this.syncUserData();
  }

  syncUserData() {
    const { uid, syncData } = this.props;
    const url = `users/${uid}`;
    const nextActions = [{ type: 'SET_USER_DATA' }];

    syncData({
      url,
      nextActions,
    });
  }

  render() {
    const { userData } = this.props;

    return <General {...userData} />;
  }
}

function mapStateToProps(state) {
  const { userData, user } = state;
  const { uid } = user;

  return {
    userData,
    uid,
  };
}

export default withSyncData(connect(mapStateToProps)(GeneralContainer));
