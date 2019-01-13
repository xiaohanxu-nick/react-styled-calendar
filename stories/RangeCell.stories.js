import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import RangeCell from '../src/components/shared/RangeCell';

addDecorator(withKnobs);

storiesOf('RangeCell', module)
  .add('Day',
    withInfo('default')(() => (
      <RangeCell />
    )));
