import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../config';

export default (ComposedComponent) => {
  class withRouteCondom extends React.Component {
    constructor(props) {
      super(props);

      this.redirectToLoginPage = this.redirectToLoginPage.bind(this);

      this.state = {};
    }

    static propTypes = {
      isValidUser: PropTypes.bool,
    };

    static defaultProps = {};

    componentWillMount() {
      /*
       * If the user is not authenticated or is anonymously authenticated
       * Redirect them to the login page
       */
      const { isValidUser } = this.props;

      if (!isValidUser) {
        this.redirectToLoginPage();
      }
    }

    redirectToLoginPage() {
      Router.push(routes.login.href); // FIXME: Should we replace route rather
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    const { user } = state;
    const isValidUser = user.uid && !user.isAnonymous;

    return {
      isValidUser,
    };
  }

  return connect(mapStateToProps)(withRouteCondom);
};
