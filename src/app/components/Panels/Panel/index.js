import React from 'react';
import PropTypes from 'prop-types';

import colors from './colors';

import Panel from './Panel';

export class PanelContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onToggleCollapse = this.onToggleCollapse.bind(this);
    this.setIsCollapsed = this.setIsCollapsed.bind(this);

    this.state = {
      isCollapsed: false,
    };
  }

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.node,
    handleAdd: PropTypes.func,
    handleDelete: PropTypes.func,
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
    const { isCollapsed: isCollapsedState } = this.state;
    const { children } = this.props;

    /*
     * Get the border color based on type
     */
    const { type } = this.props;
    const borderColor = colors[type];

    /*
     * All types beside the field have the add action and are expandable and should have an add button
     * A collection should not have an add button if it already has children
     * A document should never be expandable and should always be expanded
     */
    const actions = [];
    let isExpandable;
    let isCollapsed = isCollapsedState;
    let addButtonText;
    const hasChildren = children && children.length;

    if (type !== 'field') {
      const { handleAdd } = this.props;

      /*
       * Change the childType based on the type
       */
      let childType;
      isExpandable = true;

      if (type === 'collection' && !hasChildren) {
        childType = 'Document';
      } else if (type === 'document') {
        childType = 'Field';

        /*
         * Documents are not collapsible
         */
        isExpandable = false;
      } else if (type === 'object') {
        childType = 'Field';
      } else if (type === 'array' && !hasChildren) {
        childType = 'Field';
      }

      /*
       * Add the add action lol
       */
      if (childType) {
        actions.push({
          iconName: 'add',
          tooltip: `Add ${childType}`,
          handleClick: handleAdd,
        });

        addButtonText = childType;
      }
    } else {
      /*
       * Fields are always collapsed
       */
      isCollapsed = true;
    }

    /*
     * All types have the delete action
     */
    const { name, handleDelete } = this.props;

    actions.push({
      iconName: 'delete',
      tooltip: `Delete ${name}`,
      handleClick: handleDelete,
    });

    return (
      <Panel
        {...this.props}
        borderColor={borderColor}
        actions={actions}
        isCollapsed={isCollapsed}
        isExpandable={isExpandable}
        addButtonText={addButtonText}
        handleToggleCollapse={this.onToggleCollapse}
      >
        {children}
      </Panel>
    );
  }
}

export default PanelContainer;
