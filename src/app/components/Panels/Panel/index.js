import React from 'react';
import PropTypes from 'prop-types';

import Panel from './Panel';

export class PanelContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onToggleCollapse = this.onToggleCollapse.bind(this);
    this.setIsCollapsed = this.setIsCollapsed.bind(this);

    const { typeId, fieldTypeId, types } = this.props;
    const typeIdToUse = typeId !== 'field' ? typeId : fieldTypeId;
    const type = types[typeIdToUse];
    const { isCollapsedByDefault } = type || {};

    this.state = {
      isCollapsed: isCollapsedByDefault,
    };
  }

  static propTypes = {
    /*
     * Parent
     */
    types: PropTypes.shape({}),
    id: PropTypes.string,
    typeId: PropTypes.string,
    fieldTypeId: PropTypes.string,
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
    const { typeId, fieldTypeId, types } = this.props;
    const typeIdToUse = typeId !== 'field' ? typeId : fieldTypeId;
    const type = types[typeIdToUse];
    const { name: typeText, color: typeColor, validChildrenTypes } = type || {};
    const isExpandable = Boolean(validChildrenTypes && validChildrenTypes.length);
    const isCollapsed = !isExpandable || isCollapsedState;

    /*
     * If handleAdd is provided
     * If there are validChildrenTypes, create buttons to render
     */
    let addButtons;
    const { handleAdd } = this.props;

    if (handleAdd) {
      const hasChildren = children && children.length;
      addButtons =
        validChildrenTypes && validChildrenTypes.length
          ? validChildrenTypes
              .map((item) => {
                const { typeId: childTypeId, allowMultipleOfSameType } = item;
                const childType = types[childTypeId];
                const { name } = childType || {};

                if (!hasChildren || (hasChildren && allowMultipleOfSameType)) {
                  const text = `ADD ${name ? name.toUpperCase() : 'FIELD'}`; // defaults to field

                  return {
                    text,
                    handleClick: () => handleAdd({ typeId: childTypeId }),
                  };
                }

                return null;
              })
              .filter((item) => item)
          : [];
    }

    /*
     * Create the actions if handleEdit and handleDelete were provided
     * All types have the edit and delete action
     */
    const { handleEdit, handleDelete } = this.props;
    let actions;

    if (handleEdit && handleDelete) {
      const { id, name } = this.props;

      actions = [
        {
          id,
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
    }

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
