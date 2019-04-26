import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from '..';

const title = 'Forgot your password?';
const description = "Enter your email address and we'll send you a password reset email.";
const form = {
  fields: [
    {
      type: 'email',
      name: 'email',
      label: 'Email Address',
      required: true,
    },
  ],
  handleSubmit: null,
};

storiesOf('Components|Modal', module).add('default', () => (
  <Modal title={title} description={description} form={form} isOpen handleClose={null} />
));
