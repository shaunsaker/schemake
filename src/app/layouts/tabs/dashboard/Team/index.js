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
    this.syncTeams = this.syncTeams.bind(this);
    this.openActionTeamMemberModal = this.openActionTeamMemberModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Connect
     */
    dispatch: PropTypes.func,
    teams: PropTypes.arrayOf(PropTypes.shape({})),
    uid: PropTypes.string,

    /*
     * withSyncData
     */
    syncData: PropTypes.func,
  };

  static defaultProps = {};

  componentDidMount() {
    this.syncTeams();
  }

  onAddTeamMemberClick() {
    this.openActionTeamMemberModal();
  }

  syncTeams() {
    const { uid, syncData } = this.props;
    const url = `teams`;
    const queries = [['users', 'array-contains', uid]];
    const nextActions = [{ type: 'SET_TEAMS' }];

    syncData({
      url,
      queries,
      nextActions,
    });
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
    const { teams } = this.props;

    return <Team items={teams} handleAddProjectClick={this.onAddTeamMemberClick} />;
  }
}

function mapStateToProps(state) {
  const { teams, user } = state;
  const { uid } = user;

  return {
    teams,
    uid,
  };
}

export default withSyncData(connect(mapStateToProps)(TeamContainer));
