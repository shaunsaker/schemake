import React from 'react';
import Router from 'next/router';

import { routes } from '../../../config';

import Error from './Error';

export default class ErrorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onGoHomeClick = this.onGoHomeClick.bind(this);
    this.onContactSupportClick = this.onContactSupportClick.bind(this);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  onGoHomeClick() {
    Router.push(routes.home.href);
  }

  onContactSupportClick() {
    Router.push(routes.support.href);
  }

  render() {
    return (
      <Error
        {...this.props}
        handleGoHomeClick={this.onGoHomeClick}
        handleContactSupportClick={this.onContactSupportClick}
      />
    );
  }
}
