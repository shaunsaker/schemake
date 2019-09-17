import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../config';

export class RedirectHandler extends React.Component {
  constructor(props) {
    super(props);

    this.onRouteChangeComplete = this.onRouteChangeComplete.bind(this);
    this.getIsRouteAllowed = this.getIsRouteAllowed.bind(this);
    this.handleRouteChangeComplete = this.handleRouteChangeComplete.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Parent
     */
    children: PropTypes.node,

    /*
     * Store
     */
    authenticated: PropTypes.string,
  };

  static defaultProps = {};

  componentDidMount() {
    Router.events.on('routeChangeComplete', this.onRouteChangeComplete);
    this.handleRouteChangeComplete(window.location.href);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.onRouteChangeComplete);
  }

  onRouteChangeComplete(route) {
    this.handleRouteChangeComplete(route);
  }

  handleRouteChangeComplete(route) {
    /*
     * If the route is not allowed, redirect to the Login page
     */
    const isRouteAllowed = this.getIsRouteAllowed(route);

    if (!isRouteAllowed) {
      Router.push(routes.login.href);
    }
  }

  getIsRouteAllowed(route) {
    /*
     * Route is allowed if it is an allowed page
     * OR if the user is authenticated
     */
    const { authenticated } = this.props;
    const allowedPages = ['login', 'signup', 'support', 'viewProject'];
    const isAllowedPage = allowedPages.filter((item) => route.indexOf(item) > -1).length && true;
    let isRouteAllowed = false;

    if (isAllowedPage || authenticated) {
      isRouteAllowed = true;
    }

    return isRouteAllowed;
  }

  render() {
    const isRouteAllowed = this.getIsRouteAllowed(window.location.pathname);

    if (isRouteAllowed) {
      const { children } = this.props;

      return children;
    }

    return null;
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const { uid: authenticated } = user;

  return {
    authenticated,
  };
}

export default connect(mapStateToProps)(RedirectHandler);
