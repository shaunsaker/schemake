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
    this.onRemoveTeamMember = this.onRemoveTeamMember.bind(this);
    this.syncTeams = this.syncTeams.bind(this);
    this.openActionTeamMemberModal = this.openActionTeamMemberModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    selectedTeamIndex: PropTypes.number,
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

  onRemoveTeamMember(teamMember) {
    // TODO:
    console.log(teamMember);
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
    const { selectedTeamIndex, teams } = this.props;
    const selectedTeam = teams[selectedTeamIndex];

    /*
     * Map the team data to the required UI data
     */
    const teamMembers = selectedTeam
      ? selectedTeam.users.map((uid) => {
          const avatarText = 'S'; // TODO:
          const title = 'Shaun Saker'; // TODO:
          const description = 'sakershaun@gmail.com'; // TODO:
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
  const { teams, user, appState } = state;
  const { selectedTeamIndex } = appState;
  const { uid } = user;

  return {
    selectedTeamIndex,
    teams,
    uid,
  };
}

export default withSyncData(connect(mapStateToProps)(TeamContainer));
