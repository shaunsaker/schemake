import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { modals } from '../../../../config';

import Team from './Team';

import withSyncData from '../../../../enhancers/withSyncData';

export class TeamContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onAddTeamMember = this.onAddTeamMember.bind(this);
    this.onRemoveTeamMember = this.onRemoveTeamMember.bind(this);
    this.syncTeams = this.syncTeams.bind(this);
    this.handleSyncTeamUserData = this.handleSyncTeamUserData.bind(this);
    this.syncTeamUserData = this.syncTeamUserData.bind(this);
    this.getSelectedTeam = this.getSelectedTeam.bind(this);
    this.openAddTeamMemberModal = this.openAddTeamMemberModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    selectedTeamIndex: PropTypes.number,
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
    uid: PropTypes.string,
    teamUserData: PropTypes.arrayOf(PropTypes.shape({})),

    /*
     * withSyncData
     */
    syncData: PropTypes.func,
  };

  static defaultProps = {};

  componentDidMount() {
    this.syncTeams();

    /*
     * If we have the teams
     * Go and get the teamUserData for the selectedTeam
     */
    const { teams } = this.props;

    if (teams.length) {
      this.handleSyncTeamUserData();
    }
  }

  componentDidUpdate(prevProps) {
    const { teams } = this.props;

    /*
     * If teams data has just come in
     * Go and get the teamUserData for the selectedTeam
     */
    if (teams.length && !prevProps.teams.length) {
      this.handleSyncTeamUserData();
    }
  }

  onAddTeamMember() {
    this.openAddTeamMemberModal();
  }

  onRemoveTeamMember(teamMember) {
    // TODO:
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

  handleSyncTeamUserData() {
    const selectedTeam = this.getSelectedTeam();
    const { id } = selectedTeam;

    this.syncTeamUserData(id);
  }

  syncTeamUserData(teamId) {
    const { syncData } = this.props;
    const url = `users`;
    const queries = [['teams', 'array-contains', teamId]];
    const nextActions = [{ type: 'SET_TEAM_USER_DATA' }];

    syncData({
      url,
      queries,
      nextActions,
    });
  }

  getSelectedTeam() {
    const { teams, selectedTeamIndex } = this.props;
    const selectedTeam = teams[selectedTeamIndex];

    return selectedTeam;
  }

  openAddTeamMemberModal() {
    /*
     * Get the teamId from the selectedTeam
     */
    const selectedTeam = this.getSelectedTeam();
    const { id: teamId } = selectedTeam;

    /*
     * Dispatch the action
     */
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: modals.addTeamMemberModal.key,
        props: {
          teamId,
        },
      },
    });
  }

  render() {
    const selectedTeam = this.getSelectedTeam();

    /*
     * Map the team data to the required UI data
     */
    const { teamUserData } = this.props;

    const teamMembers = selectedTeam
      ? selectedTeam.users &&
        selectedTeam.users.map((uid) => {
          const userData = teamUserData.length
            ? teamUserData.filter((item) => item.id === uid)[0]
            : {};
          const { name, email } = userData;
          const avatarText = name && name.slice(0, 1);
          const title = name;
          const description = email;
          const menu = {
            items: [
              {
                name: `Remove ${title}`,
                handleClick: () => this.onRemoveTeamMember(uid),
              },
            ],
          };

          return {
            avatarText,
            title,
            description,
            menu,
            id: uid,
          };
        })
      : [];

    return <Team teamMembers={teamMembers} handleAddTeamMember={this.onAddTeamMember} />;
  }
}

function mapStateToProps(state) {
  const { teams, user, appState, teamUserData } = state;
  const { selectedTeamIndex } = appState;
  const { uid } = user;

  return {
    selectedTeamIndex,
    teams,
    uid,
    teamUserData,
  };
}

export default withSyncData(connect(mapStateToProps)(TeamContainer));
