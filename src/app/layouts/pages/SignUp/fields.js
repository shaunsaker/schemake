const fields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    required: true,
  },
  {
    name: 'gdprConsent',
    type: 'checkbox',
    label: 'I consent to having Schemake store my submitted information',
    required: true,
  },
];

export default fields;
