import React from 'react';
import PropTypes from 'prop-types';
import { createUID } from 'js-simple-utils';

import Support from './Support';
import withSaveDocument from '../../../enhancers/withSaveDocument';

export class SupportContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.saveSupport = this.saveSupport.bind(this);

    this.state = {};
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

  onSubmit(form) {
    this.saveSupport(form);
  }

  onReset() {
    this.setIsSuccessful(false);
  }

  saveSupport(form) {
    const { saveDocument } = this.props;
    const url = `support/${createUID()}`;
    const document = {
      ...form,
      dateCreated: Date.now(),
    };

    saveDocument({ url, document });
  }

  render() {
    const { isSaving, hasSuccess } = this.props;
    const isDisabled = isSaving && true;

    return (
      <Support
        hasSuccess={hasSuccess}
        isDisabled={isDisabled}
        handleSubmit={this.onSubmit}
        handleReset={this.onReset}
      />
    );
  }
}

export default withSaveDocument(SupportContainer);
