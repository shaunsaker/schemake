const fields = [
  {
    type: 'text',
    name: 'name',
    label: 'Name',
    required: true,
  },
  {
    type: 'select',
    name: 'type',
    label: 'Field Type',
    required: true,
    options: [], // attached in index.js
  },
];

export default fields;
