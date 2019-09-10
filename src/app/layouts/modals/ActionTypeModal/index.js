import React from 'react';
import PropTypes from 'prop-types';
import { firstCharToUpperCase } from 'js-simple-utils';

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
      values: props.originalTypeData,
    };
  }

  static propTypes = {
    /*
     * Parent
     */
    type: PropTypes.string,
    id: PropTypes.string,
    projectId: PropTypes.string,
    parentId: PropTypes.string,
    originalTypeData: PropTypes.shape({}),
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
    const { saveDocument, type, id, projectId, parentId, originalTypeData } = this.props;
    const url = `projects/${projectId}/data/${id}`;
    const document = {
      ...originalTypeData,
      ...form,
      type,
      parentId,
    };
    const nextActions = [];

    saveDocument({
      url,
      document,
      nextActions,
    });
  }

  closeModal() {
    const { handleClose } = this.props;

    handleClose();
  }

  render() {
    const { values } = this.state;
    const { type, isOpen, isSaving } = this.props;
    const title = `${values ? 'Edit' : 'Add'} ${firstCharToUpperCase(type)}`;
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

export default withSaveDocument(ActionTypeModalContainer);
