import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeleteTypeModal from './DeleteTypeModal';

export class DeleteTypeModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.deleteType = this.deleteType.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    types: PropTypes.shape({}),

    /*
     * Parent
     */
    dataId: PropTypes.string,
    name: PropTypes.string,
    typeId: PropTypes.string,
    projectId: PropTypes.string,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    const { isLoading, hasError } = this.props;

    if (!isLoading && prevProps.isLoading && !hasError && !prevProps.hasError) {
      this.closeModal();
    }
  }

  onSubmit() {
    this.deleteType();
  }

  onClose() {
    this.closeModal();
  }

  deleteType() {
    const { dataId, projectId } = this.props;
    const url = `projects/${projectId}/data/${dataId}`;

    const { dispatch } = this.props;

    dispatch({
      type: 'deleteDocument',
      payload: {
        url,
      },
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { isOpen, name, typeId, types, isLoading } = this.props;
    const isDisabled = isLoading;
    const type = types[typeId];
    const { name: typeName } = type || {};

    return (
      <DeleteTypeModal
        type={typeName}
        name={name}
        isOpen={isOpen}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleChange={this.onChange}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { appState, types } = state;
  const { pendingTransactions, systemMessage } = appState;
  const isLoading = Boolean(pendingTransactions.length);
  const hasError = Boolean(systemMessage.variant === 'error');

  return {
    isLoading,
    hasError,
    types,
  };
};

export default connect(mapStateToProps)(DeleteTypeModalContainer);
