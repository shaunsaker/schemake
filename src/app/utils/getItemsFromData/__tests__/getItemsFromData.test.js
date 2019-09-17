import getItemsFromData from '..';

describe('getItemsFromData()', () => {
  it('should work with no data', () => {
    const data = undefined;

    expect(getItemsFromData(data)).toEqual([]);
  });

  it('should work with empty data', () => {
    const data = [];

    expect(getItemsFromData(data)).toEqual([]);
  });

  it('should work with a single collection', () => {
    const data = [
      {
        id: 'users',
        name: 'users',
        typeId: 'collection',
        refs: [],
      },
    ];

    expect(getItemsFromData(data).length).toEqual(1);
  });

  it('should work with multiple collections', () => {
    const data = [
      {
        id: 'users',
        name: 'users',
        typeId: 'collection',
        refs: [],
      },
      {
        id: 'posts',
        name: 'posts',
        typeId: 'collection',
        refs: [],
      },
    ];

    expect(getItemsFromData(data).length).toEqual(2);
  });

  it('should work', () => {
    const data = [
      {
        id: 'users',
        name: 'users',
        typeId: 'collection',
        refs: [],
      },
      {
        id: 'uid',
        name: 'uid',
        typeId: 'document',
        refs: ['users'],
      },
      {
        id: 'firstName',
        name: 'firstName',
        typeId: 'field',
        refs: ['users', 'uid'],
      },
      {
        id: 'lastName',
        name: 'firstName',
        typeId: 'field',
        refs: ['users', 'uid'],
      },
      {
        id: 'friends',
        name: 'friends',
        typeId: 'collection',
        refs: ['users', 'uid'],
      },
      {
        id: 'friendId',
        name: 'friendId',
        typeId: 'document',
        refs: ['users', 'uid', 'friends'],
      },
      {
        id: 'posts',
        name: 'posts',
        typeId: 'collection',
        refs: [],
      },
      {
        id: 'postId',
        name: 'postId',
        typeId: 'document',
        refs: ['posts'],
      },
    ];

    expect(getItemsFromData(data).length).toEqual(2);
    expect(getItemsFromData(data)[0].items.length).toEqual(1); // was uid attached as child to users
    expect(getItemsFromData(data)[0].items[0].items.length).toEqual(3); // were firstName, lastName and friends attached as child to users/uid
    expect(getItemsFromData(data)[1].items.length).toEqual(1); // was postId attached as child to posts
  });
});
