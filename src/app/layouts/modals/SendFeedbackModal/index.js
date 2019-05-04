import React from 'react';
import PropTypes from 'prop-types';
import { createUID } from 'js-simple-utils';

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
    this.setIsSuccessful = this.setIsSuccessful.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      isSuccessful: false,
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
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * On success
     */
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.setIsSuccessful(true);
    }
  }

  onSubmit(form) {
    this.saveFeedback(form);
  }

  onClose() {
    this.setIsSuccessful(false);
    this.closeModal();
  }

  saveFeedback(form) {
    const { saveDocument } = this.props;
    const url = `_feedback/${createUID()}`;
    const document = {
      ...form,
    };

    saveDocument({ url, document });
  }

  setIsSuccessful(isSuccessful) {
    this.setState({
      isSuccessful,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { isSuccessful } = this.state;
    const { isOpen, isSaving } = this.props;
    const isDisabled = isSaving;
    let title = 'Send Feedback';
    let { description } = copy.feedback.default;
    let form = { fields, disabled: isDisabled, handleSubmit: this.onSubmit };

    if (isSuccessful) {
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

export default withSaveDocument(SendFeedbackModalContainer);
