import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Select from '../../../../components/Select';
import PrimaryButton from '../../../../components/PrimaryButton';
import DashboardListItem from '../../../../components/DashboardListItem';
import AddButton from '../../../../components/AddButton';

const addButtonText = 'ADD TEAM MEMBER';

const Team = ({ selectedTeamIndex, teams, teamMembers, handleSelectTeam, handleAddTeamMember }) => {
  return (
    <div className="container">
      <div className="header-container">
        <Select
          selectedOptionIndex={selectedTeamIndex}
          options={teams}
          handleChange={handleSelectTeam}
        />

        <PrimaryButton handleClick={handleAddTeamMember}>{addButtonText}</PrimaryButton>
      </div>

      <div className="items-container">
        {teamMembers &&
          teamMembers.map((item) => {
            return (
              <div key={item.id} className="item-container">
                <DashboardListItem {...item} />
              </div>
            );
          })}

        <div className="item-container">
          <AddButton handleClick={handleAddTeamMember}>{addButtonText}</AddButton>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

Team.propTypes = {
  selectedTeamIndex: PropTypes.number,
  teams: PropTypes.arrayOf(PropTypes.shape({})),
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ),
  handleSelectTeam: PropTypes.func,
  handleAddTeamMember: PropTypes.func,
};
Team.defaultProps = {};

export default Team;
