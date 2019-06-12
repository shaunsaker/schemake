import React from 'react';
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
    const { isOpen } = modals;

    if (isOpen) {
      const { key, props } = modals;
      const Component = modalComponents.filter((item) => item.key === key)[0].component;

      return <Component key={key} isOpen handleClose={this.onClose} {...props} />;
    }

    return null;
  }
}

function mapStateToProps(state) {
  return {
    modals: state.modals,
  };
}

export default connect(mapStateToProps)(ModalsHandler);
