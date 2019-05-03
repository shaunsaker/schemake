import React from 'react';
import PropTypes from 'prop-types';
import { createUID } from 'js-simple-utils';
import { connect } from 'react-redux';

import fields from './fields';
import { copy } from '../../../config';

import SendFeedbackModal from './SendFeedbackModal';
import withSaveDocument from '../../../enhancers/withSaveDocument';

export class SendFeedbackModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.saveFeedback = this.saveFeedback.bind(this);
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
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,

    /*
     * Store
     */
    hasPendingTransactions: PropTypes.bool,
    hasError: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If we were saving and are not anymore
     * And we don't have an error
     * And the modal is open
     */
    const { hasPendingTransactions, hasError, isOpen } = this.props;

    if (!hasPendingTransactions && prevProps.hasPendingTransactions && !hasError && isOpen) {
      // TODO: Failed on error
      this.setHasSuccess(true);
    }
  }

  onSubmit(form) {
    this.saveFeedback(form);
  }

  onClose() {
    this.setHasSuccess(false);
    this.closeModal();
  }

  saveFeedback(form) {
    const { saveDocument } = this.props;
    const url = `feedback/${createUID()}`;
    const document = {
      ...form,
    };

    saveDocument({ url, document });
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
    const { isOpen, isSaving } = this.props;
    const isDisabled = isSaving;
    let title = 'Send Feedback';
    let { description } = copy.feedback.default;
    let form = { fields, disabled: isDisabled, handleSubmit: this.onSubmit };

    if (hasSuccess) {
      title = copy.feedback.success.title; // eslint-disable-line
      description = copy.feedback.success.description; // eslint-disable-line
      form = null;
    }

    return (
      <SendFeedbackModal
        title={title}
        description={description}
        form={form}
        isOpen={isOpen}
        disabled={isDisabled}
        handleClose={this.onClose}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { appState } = state;
  const { pendingTransactions, systemMessage } = appState;
  const hasPendingTransactions = pendingTransactions.length ? true : false;
  const hasError = systemMessage.type === 'error' ? true : false;

  return {
    hasPendingTransactions,
    hasError,
  };
};

export default withSaveDocument(connect(mapStateToProps)(SendFeedbackModalContainer));
