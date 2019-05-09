import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '../Select';

export class TeamSelector extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.setSelectedTeamIndex = this.setSelectedTeamIndex.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    dispatch: PropTypes.func,
    selectedTeamIndex: PropTypes.number,
    teams: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {};

  onChange(event) {
    const index = event.target.value;

    this.setSelectedTeamIndex(index);
  }

  setSelectedTeamIndex(selectedTeamIndex) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_SELECTED_TEAM_INDEX',
      payload: {
        selectedTeamIndex,
      },
    });
  }

  render() {
    const { selectedTeamIndex, teams } = this.props;

    return (
      <Select
        selectedOptionIndex={selectedTeamIndex}
        options={teams}
        handleChange={this.onChange}
      />
    );
  }
}

function mapStateToProps(state) {
  const { appState, teams } = state;
  const { selectedTeamIndex } = appState;

  return {
    selectedTeamIndex,
    teams,
  };
}

export default connect(mapStateToProps)(TeamSelector);
