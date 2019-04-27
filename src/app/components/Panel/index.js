import React from 'react';
import PropTypes from 'prop-types';

import Panel from './Panel';

export class EditorPanelContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onToggleCollapse = this.onToggleCollapse.bind(this);
    this.setIsCollapsed = this.setIsCollapsed.bind(this);

    this.state = {
      isCollapsed: true,
    };
  }

  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {};

  onToggleCollapse() {
    const { isCollapsed } = this.state;

    this.setIsCollapsed(!isCollapsed);
  }

  setIsCollapsed(isCollapsed) {
    this.setState({
      isCollapsed,
    });
  }

  render() {
    const { isCollapsed } = this.state;
    const { children } = this.props;

    return (
      <Panel {...this.props} isCollapsed={isCollapsed} handleToggleCollapse={this.onToggleCollapse}>
        {children}
      </Panel>
    );
  }
}

export default EditorPanelContainer;
