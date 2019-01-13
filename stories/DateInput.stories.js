import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import { DateInput } from '../src/components/shared';


addDecorator(withKnobs);

storiesOf('DateInput', module)
  .add('default',
    withInfo('default')(() => (
      <DateInput
        withLabel
        labelMessage="From"
      />
    )));
