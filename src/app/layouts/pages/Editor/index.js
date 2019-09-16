import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUID } from 'js-simple-utils';

import { getQueryStringParams } from '../../../utils';
import getItemsFromData from './helpers/getItemsFromData';

import Editor from './Editor';

export class EditorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onShare = this.onShare.bind(this);
    this.onAddCollection = this.onAddCollection.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
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

  onAddCollection() {
    const { dispatch } = this.props;
    const dataId = createUID(); // adding = create a new data id
    const typeId = 'collection';

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: 'actionTypeModal',
        props: {
          dataId,
          typeId,
          projectId: this.projectId,
          refs: [], // it's shallow, there are no refs
        },
      },
    });
  }

  onAdd({ typeId, parent }) {
    /*
     * Add what (typeId) to who (item)
     */
    const { dispatch } = this.props;
    const key = typeId === 'field' ? 'actionFieldModal' : 'actionTypeModal';
    const dataId = createUID(); // adding = create a new data id
    const { projectId } = this;
    const { refs, id } = parent;
    const newRefs = [...refs, id];

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key,
        props: {
          typeId,
          dataId,
          refs: newRefs,
          projectId,
        },
      },
    });
  }

  onEdit({ item }) {
    // TODO:
  }

  onDelete({ item }) {
    // TODO:
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

    return (
      <Editor
        headerBarProps={headerBarProps}
        types={types}
        items={items}
        handleAddCollection={this.onAddCollection}
        handleAdd={this.onAdd}
        handleEdit={this.onEdit}
        handleDelete={this.onDelete}
      />
    );
  }
}

function mapStateToProps(state) {
  const { projects, types } = state;

  return {
    projects,
    types,
  };
}

export default connect(mapStateToProps)(EditorContainer);
