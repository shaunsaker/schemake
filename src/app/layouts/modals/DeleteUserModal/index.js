import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { copy } from '../../../config';

import DeleteUserModal from './DeleteUserModal';

export class DeleteUserModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.closeModal = this.closeModal.bind(this);

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

  onSubmit() {
    // TODO:
  }

  onClose() {
    this.closeModal();
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { isOpen } = this.props;
    const title = 'Are you sure you want to delete yourself?';
    const { description } = copy.dangerZone.default;
    const isDisabled = false;
    const form = {
      fields: [],
      disabled: isDisabled,
      secondaryButton: {
        text: 'CANCEL',
        handleClick: this.onClose,
      },
      handleSubmit: this.onSubmit,
    };

    return (
      <DeleteUserModal
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
  return {};
};

export default connect(mapStateToProps)(DeleteUserModalContainer);
