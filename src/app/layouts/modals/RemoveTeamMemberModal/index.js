import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RemoveTeamMemberModal from './RemoveTeamMemberModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class RemoveTeamMemberModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Parent
     */
    isOpen: PropTypes.bool,
    uid: PropTypes.string,
    teamId: PropTypes.string,
    handleClose: PropTypes.func.isRequired,

    /*
     * Store
     */
    teamUserData: PropTypes.shape({
      name: PropTypes.string,
    }),
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        users: PropTypes.arrayOf(PropTypes.string),
      }),
    ),

    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  onSubmit() {
    this.saveTeam();
  }

  onClose() {
    this.closeModal();
  }

  saveTeam() {
    const { uid, teamId, saveDocument } = this.props;
    const url = `teams/${teamId}`;

    /*
     * Filter out the user's uid from the team users array
     */
    const { teams } = this.props;
    const team = teams.filter((item) => item.id === teamId)[0];
    const { users: oldUsers } = team;
    const newUsers = oldUsers.filter((item) => item !== uid);
    const document = {
      ...team,
      users: newUsers,
    };

    saveDocument({
      url,
      document,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { isOpen, isSaving, hasSuccess } = this.props;
    const isDisabled = isSaving && true;

    /*
     * Get the teamMemberName
     */
    const { teamUserData, uid } = this.props;
    const { name: teamMemberName } = teamUserData[uid];

    return (
      <RemoveTeamMemberModal
        isOpen={isOpen}
        hasSuccess={hasSuccess}
        name={teamMemberName}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { teamUserData, teams } = state;

  return {
    teamUserData,
    teams,
  };
};

export default withSaveDocument(connect(mapStateToProps)(RemoveTeamMemberModalContainer));
