import { cloneObject } from 'js-simple-utils';

import initialState from './initialState';

export default function reducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_PROJECTS':
      newState = cloneObject(state);

      /*
       * Add the projects
       * but update existing data
       */
      action.payload.data.forEach((item) => {
        const project = newState[item.id];
        const newProject = {
          ...project,
          ...item,
        };

        newState[item.id] = newProject;
      });

      /*
       * Handle deleted projects:
       * Diff the payload data with current projects
       * and remove the difference, aka deleted projects
       */
      const newNewState = newState;

      Object.keys(newState).forEach((projectId) => {
        const project = action.payload.data.filter((item) => item.id === projectId)[0];

        if (!project) {
          delete newNewState[projectId];
        }
      });

      return newNewState;

    case 'SET_PROJECT':
      newState = cloneObject(state);
      let project = newState[action.payload.projectId] || {};
      project = action.payload.data;
      newState[action.payload.projectId] = project;

      return newState;

    case 'SET_PROJECT_DATA':
      newState = cloneObject(state);
      const project2 = newState[action.payload.projectId] || {};
      project2.data = action.payload.data;
      newState[action.payload.projectId] = project2;

      return newState;

    default:
      return state;
  }
}
