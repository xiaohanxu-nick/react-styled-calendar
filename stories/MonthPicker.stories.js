import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  boolean,
  text,
} from '@storybook/addon-knobs';
import { MonthPicker } from '../src';

addDecorator(withKnobs);
storiesOf('MonthPicker', module)
  .add('default',
    withInfo('Xiao')(() => (
      <MonthPicker
        showConfirmButton={boolean('Whether show the confirm button', false)}
        showCancelButton={boolean('Whether show the cancel button', false)}
        confirmButtonMessage={text('The content of the confirm button', 'Confirm')}
        cancelButtoMessage={text('Then content of the cancel button', 'Cancel')}
      />
    )));
