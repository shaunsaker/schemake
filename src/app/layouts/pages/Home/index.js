import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { routes } from '../../../config';
import { signInAnonymously } from '../../../services/auth';
import { getCollection } from '../../../services/firestore';

import Home from './Home';

export class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.onExampleClick = this.onExampleClick.bind(this);
    this.setIsExampleLoading = this.setIsExampleLoading.bind(this);

    this.state = {
      isExampleLoading: false,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  static defaultProps = {};

  onSignUpClick() {
    Router.push(routes.signUp.href);
  }

  async onExampleClick() {
    this.setIsExampleLoading(true);

    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      await signInAnonymously();
    }

    const url = 'projects';
    const queries = [['isExample', '==', true]];
    const { data: exampleProjects } = await getCollection({
      url,
      queries,
    });
    const { id: projectId } = exampleProjects[0] || {};

    this.setIsExampleLoading(false);

    Router.push({
      pathname: routes.viewProject.href,
      query: {
        projectId,
      },
    });
  }

  setIsExampleLoading(isExampleLoading) {
    this.setState({
      isExampleLoading,
    });
  }

  render() {
    const headerBarProps = {
      hideShadow: true,
    };
    const { isExampleLoading } = this.state;

    return (
      <Home
        headerBarProps={headerBarProps}
        isExampleLoading={isExampleLoading}
        handleSignUpClick={this.onSignUpClick}
        handleExampleClick={this.onExampleClick}
      />
    );
  }
}

function mapStateToProps(state) {
  const { uid } = state;
  const isAuthenticated = Boolean(uid);

  return {
    isAuthenticated,
  };
}

export default connect(mapStateToProps)(HomeContainer);
