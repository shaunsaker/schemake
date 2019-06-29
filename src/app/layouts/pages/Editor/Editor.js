import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import Layout from '../../../components/Layout';
import AddButton from '../../../components/AddButton';
import Panel from '../../../components/Panel';

/*
 * NOTES:
 * Collections are collapsible
 * Documents aren't collapsible
 * Fields aren't collapsible
 * Everything should have add buttons accept fields that aren't objects or arrays
 * Everything should have menus with edit and delete options
 */
const Editor = ({
  headerBarProps,
  collections,
  handleAddCollection,
  handleEditItem,
  handleDeleteItem,
  handleAddItem,
}) => {
  return (
    <Layout headerBarProps={headerBarProps}>
      <div className="container">
        {collections.map((collection) => {
          /*
           * TODO: We will need to do some recursive mapping whenever we see collections
           */

          /*
           * TODO: Should these actions come from the parent?
           */
          const actions = [
            {
              iconName: 'menu',
              tooltip: 'Toggle menu',
              menu: {
                items: [
                  {
                    name: 'Edit Project',
                    handleClick: () => handleEditItem(collection),
                  },
                  {
                    name: 'Delete Project',
                    handleClick: () => handleDeleteItem(collection),
                  },
                ],
              },
            },
          ];

          /*
           * If there are documents, display them
           * Else, display the add document button
           */
          const documentsComponent = collection.documents.length ? (
            <div />
          ) : (
            <AddButton handleClick={() => handleAddItem(collection)}>ADD DOCUMENT</AddButton>
          );

          return (
            <div key={collection.id} className="collection-container">
              <Panel title={collection.name} actions={actions} isExpanded>
                {documentsComponent}
              </Panel>
            </div>
          );
        })}

        <AddButton handleClick={handleAddCollection}>ADD COLLECTION</AddButton>
      </div>

      <style jsx>{styles}</style>
    </Layout>
  );
};

Editor.propTypes = {
  headerBarProps: PropTypes.shape({}),
  collections: PropTypes.arrayOf(PropTypes.shape({})),
  handleAddCollection: PropTypes.func,
  handleEditItem: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  handleAddItem: PropTypes.func,
};
Editor.defaultProps = {};

export default Editor;
