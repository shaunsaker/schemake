import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fields from './fields';

import EditProjectModal from './EditProjectModal';
import withSaveDocument from '../../../enhancers/withSaveDocument';

export class EditProjectModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setValues = this.setValues.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      values: props.project,
    };
  }

  static propTypes = {
    /*
     * Parent
     */
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    project: PropTypes.shape({}),

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
  };

  static defaultProps = {};

  onChange(name, value) {
    const { values } = this.state;
    values[name] = value;

    this.setValues(values);
  }

  onSubmit(form) {
    this.saveProject(form);
  }

  onClose() {
    this.closeModal();
  }

  setValues(values) {
    this.setState({
      values,
    });
  }

  saveProject(form) {
    const { saveDocument, uid, project } = this.props;
    const { id } = project;
    const url = `projects/${id}`;
    const document = {
      ...project,
      ...form,
      dateModified: Date.now(),
      modifiedBy: uid,
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
       * Attach the project data to the form
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
      <EditProjectModal
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
  const { user } = state;
  const { uid } = user;

  return {
    uid,
  };
};

export default withSaveDocument(connect(mapStateToProps)(EditProjectModalContainer));
