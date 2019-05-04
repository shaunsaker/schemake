import React from 'react';
import PropTypes from 'prop-types';
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
    this.setIsSuccessful = this.setIsSuccessful.bind(this);

    this.state = {
      isSuccessful: false,
    };
  }

  static propTypes = {
    /*
     * withSaveDocument
     */
    saveDocument: PropTypes.func,
    isSaving: PropTypes.bool,
    hasSuccess: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    /*
     * On success
     */
    const { hasSuccess } = this.props;

    if (hasSuccess && !prevProps.hasSuccess) {
      this.setIsSuccessful(true);
    }
  }

  onSubmit(form) {
    this.saveForm(form);
  }

  onReset() {
    this.setIsSuccessful(false);
  }

  saveForm(form) {
    const { saveDocument } = this.props;
    const url = `_support/${createUID()}`;
    const document = {
      ...form,
    };

    saveDocument({ url, document });
  }

  setIsSuccessful(isSuccessful) {
    this.setState({
      isSuccessful,
    });
  }

  render() {
    const { isSuccessful } = this.state;
    const { isSaving } = this.props;
    let title = 'Support';
    let { description } = copy.support.default;
    let form = {
      fields,
      disabled: isSaving,
      handleSubmit: this.onSubmit,
    };

    if (isSuccessful) {
      title = copy.support.success.title; // eslint-disable-line
      description = copy.support.success.description; // eslint-disable-line
      form = null;
    }

    return (
      <Support title={title} description={description} form={form} handleReset={this.onReset} />
    );
  }
}

export default withSaveDocument(SupportContainer);
