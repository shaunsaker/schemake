import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import modalComponents from './modals';

export class ModalsHandler extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Store
     */
    modals: PropTypes.shape({
      isOpen: PropTypes.bool,
      key: PropTypes.string,
      props: PropTypes.shape({}),
    }).isRequired,
    dispatch: PropTypes.func,
  };

  static defaultProps = {};

  onClose() {
    this.closeModal();
  }

  closeModal() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
    });
  }

  render() {
    const { modals } = this.props;
    const { key, isOpen, props } = modals;

    return (
      <Fragment>
        {modalComponents.map((modal) => {
          const Component = modal.component;

          return (
            <Component
              key={modal.key}
              isOpen={isOpen && key === modal.key}
              handleClose={this.onClose}
              {...props}
            />
          );
        })}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    modals: state.modals,
  };
}

export default connect(mapStateToProps)(ModalsHandler);
