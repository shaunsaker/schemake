import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getItemsFromData, getQueryStringParams } from '../../../utils';

import ViewProject from './ViewProject';

export class ViewProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onShare = this.onShare.bind(this);
    this.signInAnonymously = this.signInAnonymously.bind(this);
    this.syncProjectData = this.syncProjectData.bind(this);
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
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      this.syncProjectData(this.projectId);
      this.syncTypes();
    } else {
      this.signInAnonymously();
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props;

    if (isAuthenticated && !prevProps.isAuthenticated) {
      this.syncProjectData(this.projectId);
      this.syncTypes();
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

  syncProjectData(projectId) {
    const { dispatch } = this.props;
    const url = `projects/${projectId}/data`;

    dispatch({
      type: 'sync',
      payload: {
        url,
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

    /*
     * May not have loaded the project yet
     */
    if (project) {
      isLoading = false;

      /*
       * Create the header bar props
       */
      const { name } = project;
      const shareTooltip = `Share ${name}`;
      headerBarProps = {
        text: name.toUpperCase(),
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

    return (
      <ViewProject
        headerBarProps={headerBarProps}
        types={types}
        items={items}
        isLoading={isLoading}
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

export default connect(mapStateToProps)(ViewProjectContainer);
