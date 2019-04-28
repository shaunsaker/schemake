import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fields from './fields';

import ForgotPasswordModal from './ForgotPasswordModal';

export class ForgotPasswordModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
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
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If we aren't loading
     * And we were loading
     * And we don't have an error
     */
    const { isLoading, hasError } = this.props;

    if (!isLoading && prevProps.isLoading && !hasError && !prevProps.hasError) {
      // TODO: Test this once SignUp implemented
      this.setHasSuccess();
    }

    /*
     * If we have an error
     * And we did not have an error previously
     */

    if (hasError && !prevProps.hasError) {
      this.setIsLoading(false);
    }
  }

  onSubmit({ email }) {
    this.setIsLoading(true);
    this.sendPasswordResetEmail({ email });
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

  sendPasswordResetEmail({ email }) {
    const { dispatch } = this.props;

    dispatch({
      type: 'sendPasswordResetEmail',
      payload: {
        email,
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
    const { isOpen, isLoading } = this.props;
    const isFormDisabled = isLoading;
    let title = 'Forgot your password?';
    let description = "Enter your email address and we'll send you a password reset email.";
    let form = { fields, disabled: isFormDisabled, handleSubmit: this.onSubmit };

    if (hasSuccess) {
      title = 'Great Success';
      description = 'We have sent your password reset email successfully.';
      form = null;
    }

    return (
      <ForgotPasswordModal
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
  const { systemMessage, isLoading } = appState;
  const hasError = systemMessage.variant === 'error' ? true : false;

  return {
    isLoading,
    hasError,
  };
};

export default connect(mapStateToProps)(ForgotPasswordModalContainer);
