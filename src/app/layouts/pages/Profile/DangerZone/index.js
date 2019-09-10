import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DangerZone from './DangerZone';

export class DangerZoneContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.openDeleteUserModal = this.openDeleteUserModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    dispatch: PropTypes.func,
  };

  static defaultProps = {};

  onDeleteButtonClick() {
    this.openDeleteUserModal();
  }

  openDeleteUserModal() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: 'deleteUserModal',
      },
    });
  }

  render() {
    return <DangerZone handleDeleteButtonClick={this.onDeleteButtonClick} />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(DangerZoneContainer);
