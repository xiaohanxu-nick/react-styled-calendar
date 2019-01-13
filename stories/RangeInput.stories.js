import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import { RangeInput } from '../src/components/shared';


addDecorator(withKnobs);

storiesOf('RangeInput', module)
  .add('default',
    withInfo('Xiao')(() => (
      <RangeInput />
    )));
