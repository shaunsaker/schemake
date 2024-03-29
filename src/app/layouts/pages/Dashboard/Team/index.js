import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Team from './Team';

import withSyncData from '../../../../enhancers/withSyncData';
import withSaveDocument from '../../../../enhancers/withSaveDocument';

export class TeamContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeTeam = this.onChangeTeam.bind(this);
    this.onAddTeamMember = this.onAddTeamMember.bind(this);
    this.onRemoveTeamMember = this.onRemoveTeamMember.bind(this);
    this.syncTeams = this.syncTeams.bind(this);
    this.handleSyncTeamUserData = this.handleSyncTeamUserData.bind(this);
    this.syncTeamUserData = this.syncTeamUserData.bind(this);
    this.getSelectedTeam = this.getSelectedTeam.bind(this);
    this.setSelectedTeamIndex = this.setSelectedTeamIndex.bind(this);
    this.openAddTeamMemberModal = this.openAddTeamMemberModal.bind(this);
    this.openRemoveTeamMemberModal = this.openRemoveTeamMemberModal.bind(this);

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
    teamUserData: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),

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

    /*
     * If the user changed teams, get the user data for that new team
     */
    const { selectedTeamIndex } = this.props;

    if (selectedTeamIndex !== prevProps.selectedTeamIndex) {
      this.handleSyncTeamUserData();
    }
  }

  onChangeTeam(event) {
    const index = event.target.value;

    this.setSelectedTeamIndex(index);
  }

  onAddTeamMember() {
    this.openAddTeamMemberModal();
  }

  onRemoveTeamMember({ uid, teamId }) {
    this.openRemoveTeamMemberModal({ uid, teamId });
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
    const { users } = selectedTeam;

    /*
     * For each uid get that users's data
     */
    users.forEach((uid) => this.syncTeamUserData(uid));
  }

  syncTeamUserData(uid) {
    const { syncData } = this.props;
    const url = `users/${uid}`;
    const nextActions = [{ type: 'SET_TEAM_USER_DATA' }];

    syncData({
      url,
      nextActions,
    });
  }

  getSelectedTeam() {
    const { teams, selectedTeamIndex } = this.props;
    const selectedTeam = teams[selectedTeamIndex];

    return selectedTeam;
  }

  setSelectedTeamIndex(selectedTeamIndex) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_SELECTED_TEAM_INDEX',
      payload: {
        selectedTeamIndex,
      },
    });
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
        key: 'addTeamMemberModal',
        props: {
          teamId,
        },
      },
    });
  }

  openRemoveTeamMemberModal({ uid, teamId }) {
    /*
     * Dispatch the action
     */
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: 'removeTeamMemberModal',
        props: {
          uid,
          teamId,
        },
      },
    });
  }

  render() {
    /*
     * Grab selectedTeamIndex and teams from store
     * Create the select's props
     */
    const { selectedTeamIndex, teams } = this.props;
    const selectProps = {
      selectedOptionIndex: selectedTeamIndex,
      options: teams,
      handleChange: this.onChangeTeam,
    };

    /*
     * Map the team data to the required UI data
     */
    const { teamUserData, uid } = this.props;
    const selectedTeam = this.getSelectedTeam();
    const isCurrentUserAdminOfTeam = selectedTeam && selectedTeam.createdBy === uid;

    const teamMembers = selectedTeam
      ? selectedTeam.users &&
        selectedTeam.users.map((item) => {
          const userData = teamUserData[item];
          const { name, email } = userData || {};
          const avatarText = name && name.slice(0, 1);
          const title = name;
          const description = email;

          /*
           * Only show the menu if the mapped user is not the currentUser
           * And the current user is the admin
           */
          let menu;
          const isCurrentUser = item === uid;

          if (!isCurrentUser && isCurrentUserAdminOfTeam) {
            menu = {
              items: [
                {
                  name: `Remove ${title}`,
                  handleClick: () =>
                    this.onRemoveTeamMember({ uid: item, teamId: selectedTeam.id }),
                },
              ],
            };
          }

          return {
            avatarText,
            title,
            description,
            menu,
            id: item,
          };
        })
      : [];

    /*
     * Pass a hasTeams prop so that we can render blank state
     * while the teams are being created
     */
    const hasTeams = teams.length ? true : false;

    return (
      <Team
        hasTeams={hasTeams}
        selectProps={selectProps}
        teamMembers={teamMembers}
        handleAddTeamMember={this.onAddTeamMember}
      />
    );
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

export default withSaveDocument(withSyncData(connect(mapStateToProps)(TeamContainer)));
