import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import RangePicker from '../src/components/RangePicker';

addDecorator(withKnobs);

storiesOf('RangePicker', module)
  .add('default',
    withInfo('Xiao')(() => (
      <RangePicker />
    )));
