import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fields from './fields';

import EditProfileModal from './EditProfileModal';
import withSaveDocument from '../../../enhancers/withSaveDocument';

export class EditProfileModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setValues = this.setValues.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.setHasSuccess = this.setHasSuccess.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      values: props.userData,
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
    dispatch: PropTypes.func,
    uid: PropTypes.string,
    userData: PropTypes.shape({}),
    hasError: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If we are loading and there's an error
     */
    const { isLoading, hasError } = this.props;

    if (isLoading && hasError && !prevProps.hasError) {
      this.setIsLoading(false);
    }

    /*
     * If we are loading, were saving and aren't anymore => success
     */
    const { isSaving } = this.props;

    if (isLoading && !isSaving && prevProps.isSaving) {
      this.setIsLoading(false);
      this.setHasSuccess(true);
    }
  }

  onChange(name, value) {
    const { values } = this.state;
    values[name] = value;

    this.setValues(values);
  }

  onSubmit(form) {
    this.setIsLoading(true);
    this.saveUser(form);
  }

  onClose() {
    this.setHasSuccess(false);
    this.closeModal();
  }

  setValues(values) {
    this.setState({
      values,
    });
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

  saveUser(form) {
    const { saveDocument, uid } = this.props;
    const url = `users/${uid}`;
    const document = {
      ...form,
    };
    const storeKey = 'userData';

    saveDocument({ url, document, storeKey });
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
    const { isOpen, isSaving, isLoading } = this.props;
    const isDisabled = isSaving || isLoading;
    let title = 'Edit Profile';
    let description = 'Update your user details';
    let form = { fields, disabled: isDisabled, handleSubmit: this.onSubmit };

    if (hasSuccess) {
      title = 'Great success';
      description = 'Your profile has been updated successfully.';
      form = null;
    } else {
      /*
       * Attach the userData to the form
       */
      const { values } = this.state;
      const newFields = fields.map((item) => {
        const key = item.name;
        const value = values[key];
        const newField = {
          ...item,
          value,
        };

        return newField;
      });
      form = {
        fields: newFields,
        disabled: isDisabled,
        handleChange: this.onChange,
        handleSubmit: this.onSubmit,
      };
    }

    return (
      <EditProfileModal
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
  const { user, userData, appState } = state;
  const { uid } = user;
  const { systemMessage, isLoading } = appState;
  const hasError = systemMessage.message ? true : false;

  return {
    uid,
    userData,
    systemMessage,
    hasError,
    isLoading,
  };
};

export default withSaveDocument(connect(mapStateToProps)(EditProfileModalContainer));
