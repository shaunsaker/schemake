import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUID } from 'js-simple-utils';

import ActionProjectModal from './ActionProjectModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class ActionProjectModalContainer extends React.Component {
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
     * Parent
     */
    isOpen: PropTypes.bool,
    projectId: PropTypes.shape({}), // if this is passed we are editing an existing project
    handleClose: PropTypes.func.isRequired,

    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * On success
     */
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.closeModal();
    }
  }

  onSubmit(form) {
    this.saveProject(form);
  }

  onClose() {
    this.closeModal();
  }

  saveProject({ name }) {
    const { saveDocument, projectId } = this.props;
    const now = Date.now();
    const document = {
      name,
    };
    let projectDocumentId;

    if (projectId) {
      projectDocumentId = projectId;
      document.dateModified = now;
    } else {
      projectDocumentId = createUID();
      document.dateCreated = now;
    }

    /*
     * If I am editing then I need to use the projectId
     * Because it might be a team member's project
     */

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
    const { isOpen, projectId, isSaving } = this.props;
    const isDisabled = isSaving;
    const isEditing = projectId && true;

    return (
      <ActionProjectModal
        isOpen={isOpen}
        isEditing={isEditing}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default withSaveDocument(connect(mapStateToProps)(ActionProjectModalContainer));
