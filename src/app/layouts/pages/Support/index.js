import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUID } from 'js-simple-utils';

import fields from './fields';

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
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * If we were saving but aren't anymore
     */
    const { isSaving } = this.props;
    // TODO: Test error

    if (!isSaving && prevProps.isSaving) {
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
    let description =
      'Have any feedback, questions or issues? Get in touch with us and we promise to respond as quickly as possible.'; // FIXME: Message needs work
    let form = {
      fields,
      disabled: isSaving,
      handleSubmit: this.onSubmit,
    };

    if (hasSuccess) {
      title = 'Great Success';
      description = 'Your message was submitted successfully.';
      form = null;
    }

    return (
      <Support title={title} description={description} form={form} handleReset={this.onReset} />
    );
  }
}

function mapStateToProps(state) {
  const { appState } = state;
  const { systemMessage } = appState;
  const hasError = systemMessage.variant === 'error' ? true : false;

  return {
    hasError,
  };
}

export default withSaveDocument(connect(mapStateToProps)(SupportContainer));
