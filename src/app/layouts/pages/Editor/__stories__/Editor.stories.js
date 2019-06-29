import React from 'react';
import { storiesOf } from '@storybook/react';

import Editor from '../Editor';
import headerBarActions from '../headerBarActions';

const headerBarProps = {
  text: 'SCHEMAKE',
  actions: headerBarActions,
};
const collections = [
  {
    id: '1',
    name: 'users',
    documents: [],
  },
  // {
  //   id: '2',
  //   name: 'projects',
  //   documents: [
  //     {
  //       id: '1',
  //       name: 'uid',
  //       fields: [],
  //       collections: [],
  //     },
  //   ],
  // },
];

storiesOf('Layouts|Editor', module)
  .add('default', () => (
    <Editor
      headerBarProps={headerBarProps}
      collections={collections}
      handleAddCollection={console.log}
      handleEditItem={console.log}
      handleDeleteItem={console.log}
      handleAddItem={console.log}
    />
  ))
  .add('blank state', () => (
    <Editor
      headerBarProps={headerBarProps}
      collections={[]}
      handleAddCollection={console.log}
      handleEditItem={console.log}
      handleDeleteItem={console.log}
      handleAddItem={console.log}
    />
  ));
