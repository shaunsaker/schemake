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
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      values: props.userData,
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

  onChange(name, value) {
    const { values } = this.state;
    values[name] = value;

    this.setValues(values);
  }

  onSubmit(form) {
    this.saveUser(form);
  }

  onClose() {
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
      dateModified: Date.now(),
    };

    saveDocument({ url, document });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { isOpen, isSaving, hasSuccess } = this.props;
    const isDisabled = isSaving && true;
    let newFields;

    if (!hasSuccess) {
      /*
       * Attach the userData to the form
       */
      const { values } = this.state;
      newFields = fields.map((item) => {
        const key = item.name;
        const value = values[key];
        const newField = {
          ...item,
          value,
        };

        return newField;
      });
    }

    return (
      <EditProfileModal
        isOpen={isOpen}
        newFields={newFields}
        hasSuccess={hasSuccess}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleChange={this.onChange}
        handleSubmit={this.onSubmit}
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
