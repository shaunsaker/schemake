import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeleteProjectModal from './DeleteProjectModal';

export class DeleteProjectModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.setHasSuccess = this.setHasSuccess.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      hasSuccess: false,
    };
  }

  static propTypes = {
    /*
     * Parent
     */
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,

    /*
     * Store
     */
    dispatch: PropTypes.func,
    project: PropTypes.shape({}),
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If there is an error, reset loading
     */
    const { hasError } = this.props;

    if (hasError && !prevProps.hasError) {
      this.setIsLoading(false);
    }

    /*
     * If loading is finished without error
     * Great success
     */
    const { isLoading } = this.props;

    if (!isLoading && prevProps.isLoading && !prevProps.hasError) {
      this.setHasSuccess(true);
    }
  }

  onSubmit() {
    this.setIsLoading(true);
    this.deleteProject();
  }

  onClose() {
    this.closeModal();
  }

  setIsLoading(isLoading) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_IS_LOADING',
      payload: {
        isLoading,
      },
    });
  }

  deleteProject() {
    const { dispatch, project } = this.props;
    const { id } = project;
    const url = `projects/${id}`;

    dispatch({
      type: 'deleteDocument',
      payload: {
        url,
      },
      meta: {
        nextActions: [
          {
            type: 'SET_IS_LOADING',
            payload: {
              isLoading: false,
            },
          },
        ],
      },
    });
  }

  setHasSuccess(hasSuccess) {
    this.setState({
      hasSuccess,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { hasSuccess } = this.state;
    const { isOpen, isLoading, project } = this.props;
    const { name } = project;
    const isDisabled = isLoading;

    return (
      <DeleteProjectModal
        isOpen={isOpen}
        name={name}
        hasSuccess={hasSuccess}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { appState, modals } = state;
  const { project } = modals.props;
  const { isLoading } = appState;
  const hasError = appState.systemMessage.variant === 'error' ? true : false;

  return {
    project,
    isLoading,
    hasError,
  };
};

export default connect(mapStateToProps)(DeleteProjectModalContainer);
