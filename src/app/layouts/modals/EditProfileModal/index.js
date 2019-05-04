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
    this.setIsSuccessful = this.setIsSuccessful.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      values: props.userData,
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

    /*
     * Store
     */
    uid: PropTypes.string,
    userData: PropTypes.shape({}),
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * On Success
     */
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.setIsSuccessful(true);
    }
  }

  onChange(name, value) {
    const { values } = this.state;
    values[name] = value;

    this.setValues(values);
  }

  onSubmit(form) {
    this.saveUser(form);
  }

  onClose() {
    this.setIsSuccessful(false);
    this.closeModal();
  }

  setValues(values) {
    this.setState({
      values,
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
    let title = 'Edit Profile';
    let description = 'Update your details';
    let form = { fields, disabled: isDisabled, handleSubmit: this.onSubmit };

    if (isSuccessful) {
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
  const { user, userData } = state;
  const { uid } = user;

  return {
    uid,
    userData,
  };
};

export default withSaveDocument(connect(mapStateToProps)(EditProfileModalContainer));
