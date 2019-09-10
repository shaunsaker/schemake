import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShareProjectModal from './ShareProjectModal';

export class ShareProjectModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onCopyLink = this.onCopyLink.bind(this);
    this.onClose = this.onClose.bind(this);
    this.copyLink = this.copyLink.bind(this);
    this.setSystemMessage = this.setSystemMessage.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,

    /*
     * Parent
     */
    name: PropTypes.string,
    url: PropTypes.string,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  onCopyLink() {
    this.copyLink();
  }

  onClose() {
    this.closeModal();
  }

  copyLink() {
    const { url } = this.props;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        const message = 'Link copied to clipboard successfully.';

        this.setSystemMessage({
          message,
          variant: 'success',
        });
      })
      .catch((error) => {
        const { message } = error;

        this.setSystemMessage({
          message,
          variant: 'error',
        });
      });
  }

  setSystemMessage(systemMessage) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_SYSTEM_MESSAGE',
      payload: {
        systemMessage,
      },
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { name, url, isOpen } = this.props;

    return (
      <ShareProjectModal
        name={name}
        url={url}
        isOpen={isOpen}
        handleCopyLink={this.onCopyLink}
        handleClose={this.onClose}
      />
    );
  }
}

export default connect()(ShareProjectModalContainer);
