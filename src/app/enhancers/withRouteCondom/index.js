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
      authenticated: PropTypes.string, // uid
    };

    static defaultProps = {};

    componentWillMount() {
      /*
       * If the user is not authenticated or is anonymously authenticated
       * Redirect them to the login page
       */
      const { authenticated } = this.props;

      if (!authenticated) {
        this.redirectToLoginPage();
      }
    }

    componentDidUpdate(prevProps) {
      /*
       * If the user signed out
       * Redirect them to the login page
       */
      const { authenticated } = this.props;

      if (!authenticated && prevProps.authenticated) {
        this.redirectToLoginPage();
      }
    }

    redirectToLoginPage() {
      Router.push(routes.login.href); // FIXME: Should we replace route rather
    }

    render() {
      /*
       * Hide the page while mounting
       */
      const { authenticated } = this.props;

      if (authenticated) {
        return <ComposedComponent {...this.props} />;
      }

      return null;
    }
  }

  function mapStateToProps(state) {
    /*
     * A user is authenticated if they have a uid
     */
    const { user } = state;
    const { uid: authenticated } = user;

    return {
      authenticated,
    };
  }

  return connect(mapStateToProps)(withRouteCondom);
};
