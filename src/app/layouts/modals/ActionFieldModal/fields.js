const fields = [
  {
    type: 'text',
    name: 'name',
    label: 'Name',
    required: true,
  },
  {
    type: 'select',
    name: 'fieldTypeId',
    label: 'Field Type',
    required: true,
    options: [], // attached in index.js
  },
];

export default fields;
