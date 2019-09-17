import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getItemsFromData, getQueryStringParams } from '../../../utils';

import ViewProject from './ViewProject';

export class ViewProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onShare = this.onShare.bind(this);
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
  };

  static defaultProps = {};

  componentDidMount() {
    this.syncProjectData(this.projectId);
    this.syncTypes();
  }

  onShare() {
    const { dispatch } = this.props;
    const { name } = this.getProject();
    const url = window.location.href;

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
    /*
     * Create the header bar props
     */
    const project = this.getProject();
    const { name } = project;
    const shareTooltip = `Share ${name}`;
    const headerBarProps = {
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
    const { types } = this.props;

    /*
     * Create the items
     */
    const { data } = project;
    const items = data ? getItemsFromData(data) : [];

    return <ViewProject headerBarProps={headerBarProps} types={types} items={items} />;
  }
}

function mapStateToProps(state) {
  const { projects, types } = state;

  return {
    projects,
    types,
  };
}

export default connect(mapStateToProps)(ViewProjectContainer);
