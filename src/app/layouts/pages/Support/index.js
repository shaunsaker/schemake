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
    const url = `support/${createUID()}`;
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
    const { isSuccessful: hasSuccess } = this.state;
    const { isSaving } = this.props;
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
