import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fields from './fields';

import SendFeedbackModal from './SendFeedbackModal';

export class SendFeedbackModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Parent
     */
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  onSubmit({ message }) {
    // TODO:
  }

  onClose() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { isOpen } = this.props;

    return (
      <SendFeedbackModal
        title="Send Feedback"
        description="We value feedback so much. If you have any suggestions for improvements or if you think you've found a bug, please let use know. We'd love to hear from you!"
        form={{ fields, handleSubmit: this.onSubmit }}
        isOpen={isOpen}
        handleClose={this.onClose}
      />
    );
  }
}

export default connect()(SendFeedbackModalContainer);
