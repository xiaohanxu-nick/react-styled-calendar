import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  boolean,
  text,
} from '@storybook/addon-knobs';
import { WeekPicker } from '../src';

addDecorator(withKnobs);
storiesOf('WeekPicker', module)
  .add('default',
    withInfo('Xiao')(() => (
      <WeekPicker
        showConfirmButton={boolean('Whether show the confirm button', false)}
        showCancelButton={boolean('Whether show the cancel button', false)}
        confirmButtonMessage={text('The content of the confirm button', 'Confirm')}
        cancelButtonMessage={text('Then content of the cancel button', 'Cancel')}
        withLabel={boolean('Whether show up the input label', false)}
        labelMessage={text('The content of the input label', 'Week')}
      />
    )));
