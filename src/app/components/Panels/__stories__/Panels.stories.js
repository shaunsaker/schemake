import React from 'react';
import { storiesOf } from '@storybook/react';

import Panels from '..';
import items from './items';
import types from './types';

const handleAdd = (item) => console.log('Add', item);
const handleEdit = (item) => console.log('Edit', item);
const handleDelete = (item) => console.log('Delete', item);

storiesOf('Components|Panels', module).add('default', () => (
  <Panels
    items={items}
    types={types}
    handleAdd={handleAdd}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  />
));
