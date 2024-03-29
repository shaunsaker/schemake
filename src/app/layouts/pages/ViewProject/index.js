import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { getItemsFromData, getQueryStringParams } from '../../../utils';
import { routes } from '../../../config';

import ViewProject from './ViewProject';
import withScrollToTop from '../../../enhancers/withScrollToTop';

export class ViewProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onShare = this.onShare.bind(this);
    this.signInAnonymously = this.signInAnonymously.bind(this);
    this.syncProject = this.syncProject.bind(this);
    this.syncTypes = this.syncTypes.bind(this);
    this.getProject = this.getProject.bind(this);

    const { projectId } = getQueryStringParams(window.location.search);
    this.projectId = projectId;

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    projects: PropTypes.shape({
      name: PropTypes.string,
    }),
    types: PropTypes.shape({}),
    isAuthenticated: PropTypes.bool,
  };

  static defaultProps = {};

  componentDidMount() {
    if (this.projectId) {
      const { isAuthenticated } = this.props;

      if (isAuthenticated) {
        this.syncProject(this.projectId);
        this.syncTypes();
      } else {
        this.signInAnonymously();
      }
    } else {
      /*
       * Error state when no projectId in query params
       */
      Router.push(routes.error.href);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.projectId) {
      const { isAuthenticated } = this.props;

      if (isAuthenticated && !prevProps.isAuthenticated) {
        this.syncProject(this.projectId);
        this.syncTypes();
      }
    }
  }

  onShare() {
    const { dispatch } = this.props;
    const { name } = this.getProject();
    const url = `${origin}/viewProject?projectId=${this.projectId}`;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: 'shareProjectModal',
        props: {
          name,
          url,
        },
      },
    });
  }

  signInAnonymously() {
    const { dispatch } = this.props;

    dispatch({
      type: 'signInAnonymously',
    });
  }

  syncProject(projectId) {
    const { dispatch } = this.props;
    const url = `projects/${projectId}`;

    /*
     * Sync the project
     * then get the project's data
     */
    dispatch({
      type: 'sync',
      payload: {
        url,
      },
      meta: {
        nextActions: [
          {
            type: 'SET_PROJECT',
            payload: {
              projectId,
            },
          },
          {
            type: 'sync',
            payload: {
              url: `${url}/data`,
            },
            meta: {
              nextActions: [
                {
                  type: 'SET_PROJECT_DATA',
                  payload: {
                    projectId,
                  },
                },
              ],
            },
          },
        ],
      },
    });
  }

  syncTypes() {
    const { dispatch } = this.props;
    const url = 'types';

    dispatch({
      type: 'sync',
      payload: {
        url,
      },
      meta: {
        nextActions: [
          {
            type: 'SET_TYPES',
          },
        ],
      },
    });
  }

  getProject() {
    /*
     * Get the projectId from the query params
     */
    const { projects } = this.props;
    const project = projects[this.projectId];

    return project;
  }

  render() {
    const project = this.getProject();
    let headerBarProps;
    let types;
    let items = [];
    let isLoading = true;
    let projectDoesNotExist = false;
    let projectName;

    /*
     * May not have loaded the project yet
     */
    if (project) {
      isLoading = false;

      /*
       * If the project has been fetched
       * but we do not have details, it means it does not exist
       */
      const { name } = project;

      if (!name) {
        projectDoesNotExist = true;
      } else {
        /*
         * Create the header bar props
         */
        projectName = name;
        const shareTooltip = `Share ${projectName}`;
        headerBarProps = {
          actions: [
            {
              id: 'share',
              iconName: 'share',
              tooltip: shareTooltip,
              handleClick: this.onShare,
            },
          ],
        };

        /*
         * Get the types
         */
        types = this.props.types; // eslint-disable-line

        /*
         * Create the items
         */
        const { data } = project;
        items = data ? getItemsFromData(data) : [];
      }
    }

    return (
      <ViewProject
        headerBarProps={headerBarProps}
        projectName={projectName}
        types={types}
        items={items}
        isLoading={isLoading}
        projectDoesNotExist={projectDoesNotExist}
      />
    );
  }
}

function mapStateToProps(state) {
  const { user, projects, types } = state;
  const { uid } = user;
  const isAuthenticated = Boolean(uid);

  return {
    projects,
    types,
    isAuthenticated,
  };
}

export default connect(mapStateToProps)(withScrollToTop(ViewProjectContainer));
