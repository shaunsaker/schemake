import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { modals } from '../../../../config';

import Team from './Team';

import withSyncData from '../../../../enhancers/withSyncData';

export class TeamContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onAddTeamMemberClick = this.onAddTeamMemberClick.bind(this);
    this.syncTeam = this.syncTeam.bind(this);
    this.openActionTeamMemberModal = this.openActionTeamMemberModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Connect
     */
    dispatch: PropTypes.func,
    team: PropTypes.shape({}),
    uid: PropTypes.string,

    /*
     * withSyncData
     */
    syncData: PropTypes.func,
  };

  static defaultProps = {};

  componentDidMount() {
    this.syncTeam();
  }

  onAddTeamMemberClick() {
    this.openActionTeamMemberModal();
  }

  syncTeam() {
    // const { uid, syncData } = this.props;
    // const url = `users/${uid}`;
    // const nextActions = [{ type: 'SET_USER_DATA' }];
    // syncData({
    //   url,
    //   nextActions,
    // });
    // TODO:
  }

  openActionTeamMemberModal() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: modals.actionTeamMemberModal.key,
      },
    });
  }

  render() {
    const { team } = this.props;

    /*
      TODO: avatarText, title, description, menu, handleMenuButtonClick
    */
    // TODO: Sort team by dateModified?
    // TODO: Sync team

    return <Team items={team} handleAddProjectClick={this.onAddTeamMemberClick} />;
  }
}

function mapStateToProps(state) {
  const { team, user } = state;
  const { uid } = user;

  return {
    team,
    uid,
  };
}

export default withSyncData(connect(mapStateToProps)(TeamContainer));
