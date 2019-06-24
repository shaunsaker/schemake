import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUID } from 'js-simple-utils';

import AddProjectModal from './AddProjectModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class AddProjectModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    uid: PropTypes.string,
    teamId: PropTypes.string,

    /*
     * Parent
     */
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,

    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  onSubmit(form) {
    this.saveProject(form);
  }

  onClose() {
    this.closeModal();
  }

  saveProject(form) {
    const { saveDocument, uid, teamId } = this.props;
    const document = {
      ...form,
      createdBy: uid,
      teamId,
      dateCreated: Date.now(),
    };
    const projectDocumentId = createUID();
    const url = `projects/${projectDocumentId}`;

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

    return (
      <AddProjectModal
        isOpen={isOpen}
        hasSuccess={hasSuccess}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { uid } = user;

  /*
   * Get the current teamId based on the selectedTeamIndex
   */
  const { appState } = state;
  const { selectedTeamIndex } = appState;
  const { teams } = state;
  const { id: teamId } = teams[selectedTeamIndex];

  return {
    uid,
    teamId,
  };
};

export default withSaveDocument(connect(mapStateToProps)(AddProjectModalContainer));
