import React from 'react';
import { storiesOf } from '@storybook/react';

import fields from './fields';
import styles from './styles';

import Form from '../Form';
import Typography from '../../Typography';

storiesOf('Components|Form', module).add('default', () => (
  <Form
    fields={fields}
    footerComponent={
      <div style={styles.forgotPasswordTextContainer}>
        <Typography type="link">Forgot your password?</Typography>
      </div>
    }
    submitButtonText="LOG IN"
  />
));
