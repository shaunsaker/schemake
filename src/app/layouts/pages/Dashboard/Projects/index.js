import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortArrayOfObjectsByKey } from 'js-simple-utils';

import { modals } from '../../../../config';
import { getDateTime } from '../../../../utils';

import Projects from './Projects';

import withSyncData from '../../../../enhancers/withSyncData';

export class ProjectsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onAddProjectClick = this.onAddProjectClick.bind(this);
    this.onOpenProject = this.onOpenProject.bind(this);
    this.onEditProjectDetails = this.onEditProjectDetails.bind(this);
    this.onDeleteProject = this.onDeleteProject.bind(this);
    this.syncProjects = this.syncProjects.bind(this);
    this.openAddProjectModal = this.openAddProjectModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    selectedTeamIndex: PropTypes.number,
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
    projects: PropTypes.arrayOf(PropTypes.shape({})),
    teamId: PropTypes.string,
    teamUserData: PropTypes.shape({}),

    /*
     * withSyncData
     */
    syncData: PropTypes.func,
  };

  static defaultProps = {};

  componentDidMount() {
    /*
     * If we have teams data
     * Get the teams projects
     */
    const { teams } = this.props;

    if (teams.length) {
      this.syncProjects();
    }
  }

  componentDidUpdate(prevProps) {
    /*
     * If we just received teams data
     * Get the teams projects
     */
    const { teams } = this.props;

    if (teams.length && !prevProps.teams.length) {
      this.syncProjects();
    }
  }

  onAddProjectClick() {
    this.openAddProjectModal();
  }

  onOpenProject(project) {
    console.log({ project });
  }

  onEditProjectDetails(project) {
    console.log({ project });
  }

  onDeleteProject(project) {
    console.log({ project });
  }

  syncProjects() {
    const { teamId, syncData } = this.props;

    /*
     * Sync on the teams projects
     */
    syncData({
      url: 'projects',
      queries: [['teamId', '==', teamId]],
      nextActions: [{ type: 'SET_PROJECTS' }],
    });
  }

  openAddProjectModal() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: modals.actionProjectModal.key,
      },
    });
  }

  render() {
    /*
      TODO: Filter projects by Team
      TODO: Blank data state
      TODO: Sync on all of the user's team's projects each time the team is selected
    */

    /*
     * Grab selectedTeamIndex and teams from store
     * Create the select's props
     */
    const { selectedTeamIndex, teams } = this.props;
    const selectProps = {
      selectedOptionIndex: selectedTeamIndex,
      options: teams,
    };

    /*
     * Shape the projects into the expected items
     */
    const { projects } = this.props;
    const items = projects.map((item) => {
      const avatarText = item.name.slice(0, 1);
      const title = item.name;

      /*
       * To get the user's name that the project was modified by
       */
      const { teamUserData } = this.props;
      const { name: modifiedBy } = teamUserData[item.modifiedBy || item.createdBy];

      /*
       * To get the date text, use the dateModified if it is present
       * else just use the dateCreated
       */
      const dateModified = getDateTime(item.dateModified || item.dateCreated);
      const description = `Last updated by ${modifiedBy} on ${dateModified}`;

      return {
        id: title,
        avatarText,
        title,
        description,
        menu: {
          items: [
            {
              name: 'Open Project',
              handleClick: () => this.onOpenProject(item),
            },
            {
              name: 'Edit Project Details',
              handleClick: () => this.onEditProjectDetails(item),
            },
            {
              name: 'Delete Project',
              handleClick: () => this.onDeleteProject(item),
            },
          ],
        },
        handleClick: () => this.onOpenProject(item),
      };
    });

    /*
     * Pass a hasTeams prop so that we can render blank state
     * while the teams are being created
     */
    const hasTeams = teams.length ? true : false;

    return (
      <Projects
        hasTeams={hasTeams}
        selectProps={selectProps}
        items={items}
        handleAddProject={this.onAddProjectClick}
      />
    );
  }
}

function mapStateToProps(state) {
  /*
   * Get and sort the projects by dateCreated and dateModified
   */
  const { projects } = state;
  const sortedProjectsByDateCreated = sortArrayOfObjectsByKey(projects, 'dateCreated');
  const sortedProjectsByDateModified = sortArrayOfObjectsByKey(
    sortedProjectsByDateCreated,
    'dateModified',
  );

  /*
   * Get the current teamId based on the selectedTeamIndex
   */
  const { appState } = state;
  const { selectedTeamIndex } = appState;
  const { teams } = state;
  const { id: teamId } = teams[selectedTeamIndex] || {};

  const { teamUserData } = state;

  return {
    selectedTeamIndex,
    teams,
    projects: sortedProjectsByDateModified,
    teamId,
    teamUserData,
  };
}

export default withSyncData(connect(mapStateToProps)(ProjectsContainer));
