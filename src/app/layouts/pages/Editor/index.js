import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQueryStringParams } from '../../../utils';

import Editor from './Editor';

export class EditorContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onAddCollection = this.onAddCollection.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.getProject = this.getProject.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    projects: PropTypes.shape({
      name: PropTypes.string,
    }),
  };

  static defaultProps = {};

  onAddCollection() {}

  onAdd(what) {}

  onEdit(what) {}

  onDelete(what) {}

  getProject() {
    /*
     * Get the projectId from the query params
     */
    const { projectId } = getQueryStringParams(window.location.search);
    const { projects } = this.props;
    const project = projects[projectId];

    return project;
  }

  render() {
    /*
     * Create the header bar props
     */
    const { name } = this.getProject();
    const headerBarProps = {
      text: name.toUpperCase(),
    };
    const items = [];

    return (
      <Editor
        headerBarProps={headerBarProps}
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
  const { projects } = state;

  return {
    projects,
  };
}

export default connect(mapStateToProps)(EditorContainer);
