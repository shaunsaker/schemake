import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Select from '../../../../components/Select';
import PrimaryButton from '../../../../components/PrimaryButton';
import DashboardListItem from '../../../../components/DashboardListItem';
import AddButton from '../../../../components/AddButton';

const addButtonText = 'ADD PROJECT';

const Projects = ({ selectProps, items, handleAddProject }) => {
  return (
    <div className="container">
      <div className="header-container">
        <Select {...selectProps} />

        <PrimaryButton handleClick={handleAddProject}>{addButtonText}</PrimaryButton>
      </div>

      <div className="items-container">
        {items &&
          items.map((item) => (
            <div key={item.id} className="item-container">
              <DashboardListItem {...item} />
            </div>
          ))}

        <div className="item-container">
          <AddButton handleClick={handleAddProject}>{addButtonText}</AddButton>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

Projects.propTypes = {
  selectProps: PropTypes.shape({}),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ),
  handleAddProject: PropTypes.func,
};
Projects.defaultProps = {};

export default Projects;
