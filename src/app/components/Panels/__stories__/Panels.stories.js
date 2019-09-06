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
            fieldType: 'string',
          },
          {
            name: 'isAdmin',
            type: 'field',
            fieldType: 'boolean',
          },
          {
            name: 'age',
            type: 'field',
            fieldType: 'number',
          },
          {
            name: 'dateJoined',
            type: 'field',
            fieldType: 'date',
          },
          {
            name: 'meta',
            type: 'object',
            items: [
              {
                name: 'uid',
                type: 'field',
                fieldType: 'string',
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
                fieldType: 'string',
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
