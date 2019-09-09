const types = {
  collection: {
    isExpandable: true,
    isCollapsedByDefault: false,
    validChildrenTypes: [
      {
        name: 'document',
        showAddButtonWithChildren: false,
      },
      {
        name: 'field',
        showAddButtonWithChildren: true,
      },
    ],
  },
  document: {
    isExpandable: true,
    isCollapsedByDefault: false,
    validChildrenTypes: [
      {
        name: 'collection',
        showAddButtonWithChildren: true,
      },
      {
        name: 'field',
        showAddButtonWithChildren: true,
      },
    ],
  },
  object: {
    isExpandable: true,
    isCollapsedByDefault: false,
    validChildrenTypes: [
      {
        name: 'field',
        showAddButtonWithChildren: true,
      },
    ],
    isField: true,
  },
  array: {
    isExpandable: true,
    isCollapsedByDefault: false,
    validChildrenTypes: [
      {
        name: 'field',
        showAddButtonWithChildren: false,
      },
    ],
    isField: true,
  },
  string: {
    isExpandable: false,
    isCollapsedByDefault: true,
    validChildrenTypes: [],
    isField: true,
  },
  number: {
    isExpandable: false,
    isCollapsedByDefault: true,
    validChildrenTypes: [],
    isField: true,
  },
  boolean: {
    isExpandable: false,
    isCollapsedByDefault: true,
    validChildrenTypes: [],
    isField: true,
  },
  date: {
    isExpandable: false,
    isCollapsedByDefault: true,
    validChildrenTypes: [],
    isField: true,
  },
};

export default types;
