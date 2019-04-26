import React from 'react';
import { storiesOf } from '@storybook/react';

import PrimaryButton from '..';

storiesOf('Components|PrimaryButton', module)
  .add('default', () => <PrimaryButton>DEFAULT</PrimaryButton>)
  .add('with icon', () => <PrimaryButton iconName="check-circle">WITH ICON</PrimaryButton>)
  .add('secondary', () => <PrimaryButton secondary>SECONDARY</PrimaryButton>)
  .add('small', () => <PrimaryButton small>SMALL</PrimaryButton>)
  .add('ghost', () => <PrimaryButton ghost>GHOST</PrimaryButton>)
  .add('disabled', () => <PrimaryButton disabled>DISABLED</PrimaryButton>);
