import React from 'react';
import { storiesOf } from '@storybook/react';

import Panels from '..';

const items = [
  {
    name: 'users',
    type: 'collection',
    items: [
      {
        name: 'uid',
        type: 'document',
        items: [
          {
            name: 'name',
            type: 'field',
          },
          {
            name: 'email',
            type: 'field',
          },
          {
            name: 'age',
            type: 'field',
          },
          {
            name: 'meta',
            type: 'object',
            items: [
              {
                name: 'uid',
                type: 'field',
              },
            ],
          },
          {
            name: 'other',
            type: 'object',
            items: [],
          },
          {
            name: 'friends',
            type: 'array',
            items: [
              {
                name: 'uid',
                type: 'field',
              },
            ],
          },
          {
            name: 'likes',
            type: 'array',
            items: [],
          },
          {
            name: 'posts',
            type: 'collection',
            items: [],
          },
        ],
      },
    ],
  },
];
const handleAdd = (item) => console.log('Add', item);
const handleEdit = (item) => console.log('Edit', item);
const handleDelete = (item) => console.log('Delete', item);

storiesOf('Components|Panels', module).add('default', () => (
  <Panels items={items} handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete} />
));
