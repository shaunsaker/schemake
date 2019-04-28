import React from 'react';
import PropTypes from 'prop-types';
import { createUID } from 'js-simple-utils';
import { connect } from 'react-redux';

import fields from './fields';

import SendFeedbackModal from './SendFeedbackModal';
import withSaveDocument from '../../../enhancers/withSaveDocument';

export class SendFeedbackModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.saveFeedback = this.saveFeedback.bind(this);
    this.setShowThankYouMessage = this.setShowThankYouMessage.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
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
     */
    const { hasPendingTransactions, hasError } = this.props;

    if (!hasPendingTransactions && prevProps.hasPendingTransactions && !hasError) {
      this.setShowThankYouMessage(true);
    }
  }

  onSubmit({ message }) {
    this.saveFeedback(message);
  }

  onClose() {
    this.closeModal();
  }

  saveFeedback(message) {
    const { saveDocument } = this.props;
    const url = `feedback/${createUID()}`;
    const document = {
      message,
    };

    saveDocument({ url, document });
  }

  setShowThankYouMessage(showThankYouMessage) {
    this.setState({
      showThankYouMessage,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { showThankYouMessage } = this.state;
    const { isOpen, isSaving } = this.props;
    const isFormDisabled = isSaving;
    let title = 'Send Feedback';
    let description =
      "We value feedback so much. If you have any suggestions for improvements or if you think you've found a bug, please let use know. We'd love to hear from you!";
    let form = { fields, disabled: isFormDisabled, handleSubmit: this.onSubmit };

    if (showThankYouMessage) {
      title = 'Thank you';
      description = 'Your feedback was submitted successfully.';
      form = null;
    }

    return (
      <SendFeedbackModal
        title={title}
        description={description}
        form={form}
        isOpen={isOpen}
        disableBackdropClick={isFormDisabled}
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
