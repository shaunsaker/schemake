import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import General from './General';

import withSyncData from '../../../../enhancers/withSyncData';

export class GeneralContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onEditProfileClick = this.onEditProfileClick.bind(this);
    this.syncUserData = this.syncUserData.bind(this);
    this.openEditProfileModal = this.openEditProfileModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
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

  onEditProfileClick() {
    this.openEditProfileModal();
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

  openEditProfileModal() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: 'editProfileModal',
      },
    });
  }

  render() {
    const { userData } = this.props;

    return <General {...userData} handleEditProfileClick={this.onEditProfileClick} />;
  }
}

function mapStateToProps(state) {
  const { userData, user } = state;
  const { uid, email } = user;
  userData.email = email;

  return {
    userData,
    uid,
  };
}

export default withSyncData(connect(mapStateToProps)(GeneralContainer));
