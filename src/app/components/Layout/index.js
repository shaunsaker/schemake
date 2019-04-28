import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from './Layout';

export class LayoutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSendFeedbackClick = this.onSendFeedbackClick.bind(this);

    this.state = {};
  }

  static propTypes = {
    /*
     * Parent
     */
    children: PropTypes.node,

    /*
     * Store
     */
    dispatch: PropTypes.func,
  };

  static defaultProps = {};

  onSendFeedbackClick() {
    const { dispatch } = this.props;

    dispatch({
      type: 'TOGGLE_MODAL',
      payload: {
        key: 'sendFeedbackModal',
      },
    });
  }

  render() {
    const { children } = this.props;

    return <Layout handleSendFeedbackClick={this.onSendFeedbackClick}>{children}</Layout>;
  }
}

export default connect()(LayoutContainer);
