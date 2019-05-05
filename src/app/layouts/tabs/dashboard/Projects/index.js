import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { modals } from '../../../../config';

import Projects from './Projects';

import withSyncData from '../../../../enhancers/withSyncData';

export class ProjectsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onAddProjectClick = this.onAddProjectClick.bind(this);
    this.syncProjects = this.syncProjects.bind(this);
    this.openAddProjectModal = this.openAddProjectModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Connect
     */
    dispatch: PropTypes.func,
    projects: PropTypes.shape({}),
    uid: PropTypes.string,

    /*
     * withSyncData
     */
    syncData: PropTypes.func,
  };

  static defaultProps = {};

  componentDidMount() {
    this.syncProjects();
  }

  onAddProjectClick() {
    this.openAddProjectModal();
  }

  syncProjects() {
    // const { uid, syncData } = this.props;
    // const url = `users/${uid}`;
    // const nextActions = [{ type: 'SET_USER_DATA' }];
    // syncData({
    //   url,
    //   nextActions,
    // });
    // TODO:
  }

  openAddProjectModal() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: modals.addProjectModal.key, // TODO:
      },
    });
  }

  render() {
    const { projects } = this.props;

    /*
      TODO: avatarText, title, description, menu, handleMenuButtonClick
    */

    return <Projects items={projects} handleAddProjectClick={this.onAddProjectClick} />;
  }
}

function mapStateToProps(state) {
  const { projects, user } = state;
  const { uid } = user;

  return {
    projects,
    uid,
  };
}

export default withSyncData(connect(mapStateToProps)(ProjectsContainer));
