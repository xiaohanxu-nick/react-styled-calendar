import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  text,
  boolean,
  date,
} from '@storybook/addon-knobs';
import RangePicker from '../src/components/RangePicker';

addDecorator(withKnobs);

storiesOf('RangePicker', module)
  .add('default',
    withInfo('Xiao')(() => (
      <RangePicker
        withLabel={boolean('Whether show up the input label', true)}
        className={text('The customized className which is used on the wrapper of the RangePicker', '')}
        fromInputLabel={text('The content of the first input label', 'From')}
        toInputLabel={text('The content of the second input label', 'To')}
        defaultFromDate={date('Specify the initial selected date of the first (from) input', new Date())}
        defaultToDate={date('Specify the initial selected date of the second (to) input', new Date())}
        minDate={date('The min-date can be selected(default to be Dec 24 2018', new Date('Dec 24 2018'))}
        maxDate={date('The max-date can be selected(default to be Feb 2 2019', new Date('Feb 11 2019'))}
      />
    )));
