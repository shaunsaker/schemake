import React from 'react';
import PropTypes from 'prop-types';
import { createUID } from 'js-simple-utils';

import fields from './fields';

import Support from './Support';
import withSaveDocument from '../../../enhancers/withSaveDocument';

export class SupportContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.saveSupport = this.saveSupport.bind(this);
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
    this.saveSupport(form);
  }

  onReset() {
    this.setIsSuccessful(false);
  }

  saveSupport(form) {
    const { saveDocument } = this.props;
    const url = `_support/${createUID()}`;
    const document = {
      ...form,
      dateCreated: Date.now(),
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
    let description =
      "We value feedback so much. If you have any questions, suggestions for improvements or if you think you've found a bug, please let use know. We'd love to hear from you!";
    let form = {
      fields,
      disabled: isSaving,
      handleSubmit: this.onSubmit,
    };

    if (isSuccessful) {
      title = 'Great Success';
      description = 'Your message was submitted successfully.';
      form = null;
    }

    return (
      <Support title={title} description={description} form={form} handleReset={this.onReset} />
    );
  }
}

export default withSaveDocument(SupportContainer);
