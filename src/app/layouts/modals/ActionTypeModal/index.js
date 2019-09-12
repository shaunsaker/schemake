import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fields from './fields';

import ActionTypeModal from './ActionTypeModal';

import withSaveDocument from '../../../enhancers/withSaveDocument';

export class ActionTypeModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.saveType = this.saveType.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      values: props.originalData || {},
    };
  }

  static propTypes = {
    /*
     * Store
     */
    types: PropTypes.shape({}),

    /*
     * Parent
     */
    dataId: PropTypes.string,
    typeId: PropTypes.string,
    parentId: PropTypes.string,
    originalData: PropTypes.shape({}),
    projectId: PropTypes.string,
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
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.closeModal();
    }
  }

  onChange(name, value) {
    const { values } = this.state;
    values[name] = value;

    this.setValues(values);
  }

  onSubmit(form) {
    this.saveType(form);
  }

  onClose() {
    this.closeModal();
  }

  setValues(values) {
    this.setState({
      values,
    });
  }

  saveType(form) {
    const { saveDocument, typeId, dataId, projectId, parentId, originalData } = this.props;
    const url = `projects/${projectId}/data/${dataId}`;
    const document = {
      ...originalData,
      ...form,
      typeId,
    };

    /*
     * parentId will be undefined with shallow types
     */
    if (parentId) {
      document.parentId = parentId;
    }

    // console.log({ url, document });

    saveDocument({
      url,
      document,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { values } = this.state;
    const { typeId, types, isOpen, isSaving } = this.props;
    const type = types[typeId];
    const { name } = type || {};
    const isEditing = Object.keys(values).length;
    const title = `${isEditing ? 'Edit' : 'Add'} ${name}`;
    const isDisabled = isSaving;
    let newFields;

    if (values) {
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
      <ActionTypeModal
        title={title}
        newFields={newFields}
        isOpen={isOpen}
        isDisabled={isDisabled}
        handleClose={this.onClose}
        handleChange={this.onChange}
        handleSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { types } = state;

  return {
    types,
  };
};

export default connect(mapStateToProps)(withSaveDocument(ActionTypeModalContainer));
