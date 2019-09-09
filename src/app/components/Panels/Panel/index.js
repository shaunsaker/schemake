import React from 'react';
import PropTypes from 'prop-types';

import { colors } from '../../../static/styles/styleConstants';
import types from './types';

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
    handleEdit: PropTypes.func,
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
     * Get the type's details
     */
    const { type } = this.props;
    const typeColor = colors[type];
    const typeText = type;
    const typeInfo = types[type];
    const { isExpandable, isCollapsedByDefault } = typeInfo;
    const isCollapsed = isCollapsedByDefault || isCollapsedState;

    /*
     * If there are validChildrenTypes, create buttons to render
     */
    const hasChildren = children && children.length;
    const { validChildrenTypes } = typeInfo;
    const addButtons = validChildrenTypes
      .map((item) => {
        const { name, showAddButtonWithChildren } = item;

        if (!hasChildren || (hasChildren && showAddButtonWithChildren)) {
          const text = `ADD ${name.toUpperCase()}`;

          return {
            text,
          };
        }

        return null;
      })
      .filter((item) => item);

    /*
     * Create the actions
     * All types have the edit and delete action
     */
    const { name, handleEdit, handleDelete } = this.props;
    const actions = [
      {
        id: name,
        iconName: 'menu',
        tooltip: 'Toggle Menu',
        menu: {
          items: [
            {
              name: `Edit ${name}`,
              handleClick: handleEdit,
            },
            {
              name: `Delete ${name}`,
              handleClick: handleDelete,
            },
          ],
        },
      },
    ];

    return (
      <Panel
        {...this.props}
        typeText={typeText}
        typeColor={typeColor}
        addButtons={addButtons}
        actions={actions}
        isCollapsed={isCollapsed}
        isExpandable={isExpandable}
        handleToggleCollapse={this.onToggleCollapse}
      >
        {children}
      </Panel>
    );
  }
}

export default PanelContainer;
