import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUID } from 'js-simple-utils';

import fields from './fields';
import { copy } from '../../../config';

import Support from './Support';
import withSaveDocument from '../../../enhancers/withSaveDocument';

export class SupportContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.setHasSuccess = this.setHasSuccess.bind(this);

    this.state = {
      hasSuccess: false,
    };
  }

  static propTypes = {
    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,

    /*
     * Store
     */
    hasError: PropTypes.bool,
    isModalOpen: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If we were saving but aren't anymore and we don't or didn't have an error
     * Only if a modal is not open
     */
    const { isSaving, hasError, isModalOpen } = this.props;

    if (!isSaving && prevProps.isSaving && !hasError && !prevProps.hasError && !isModalOpen) {
      this.setHasSuccess(true);
    }
  }

  onSubmit(form) {
    this.saveForm(form);
  }

  onReset() {
    this.setHasSuccess(false);
  }

  saveForm(form) {
    const { saveDocument } = this.props;
    const url = `support/${createUID()}`;
    const document = {
      ...form,
    };

    saveDocument({ url, document });
  }

  setHasSuccess(hasSuccess) {
    this.setState({
      hasSuccess,
    });
  }

  render() {
    const { hasSuccess } = this.state;
    const { isSaving } = this.props;
    let title = 'Support';
    let { description } = copy.support.default;
    let form = {
      fields,
      disabled: isSaving,
      handleSubmit: this.onSubmit,
    };

    if (hasSuccess) {
      title = copy.support.success.title; // eslint-disable-line
      description = copy.support.success.description; // eslint-disable-line
      form = null;
    }

    return (
      <Support title={title} description={description} form={form} handleReset={this.onReset} />
    );
  }
}

function mapStateToProps(state) {
  const { appState, modals } = state;
  const { systemMessage } = appState;
  const hasError = systemMessage.variant === 'error' ? true : false;
  const isModalOpen = modals.isOpen;

  return {
    hasError,
    isModalOpen,
  };
}

export default withSaveDocument(connect(mapStateToProps)(SupportContainer));
