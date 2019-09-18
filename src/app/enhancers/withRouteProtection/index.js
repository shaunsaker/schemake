import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../config';

export default (ComposedComponent) => {
  class withRouteProtection extends React.Component {
    constructor(props) {
      super(props);

      this.getIsRouteAllowed = this.getIsRouteAllowed.bind(this);

      this.state = {};
    }

    static propTypes = {
      /*
       * Store
       */
      isAuthenticated: PropTypes.bool,
    };

    static defaultProps = {};

    componentDidMount() {
      const isRouteAllowed = this.getIsRouteAllowed();

      if (!isRouteAllowed) {
        Router.push(routes.login.href);
      }
    }

    getIsRouteAllowed() {
      /*
       * Route is allowed if the user is authenticated
       */
      const { isAuthenticated } = this.props;

      if (isAuthenticated) {
        return true;
      }

      return false;
    }

    render() {
      const isRouteAllowed = this.getIsRouteAllowed();

      if (isRouteAllowed) {
        return <ComposedComponent {...this.props} />;
      }

      return null; // TODO: Show splash
    }
  }

  function mapStateToProps(state) {
    const { user } = state;
    const { uid } = user;
    const isAuthenticated = Boolean(uid);

    return {
      isAuthenticated,
    };
  }

  return connect(mapStateToProps)(withRouteProtection);
};
