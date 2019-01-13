import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  boolean,
  text,
  select,
  date,
} from '@storybook/addon-knobs';
import { DatePicker } from '../src';

addDecorator(withKnobs);
storiesOf('DatePicker', module)
  .add('default',
    withInfo('This is the Datepicker\'s default UI, you can turn the knobs at the bottom to change it')(() => {
      const weekOptions = {
        d: 'd',
        do: 'do',
        dd: 'dd',
        ddd: 'ddd',
        dddd: 'dddd',
      };
      const monthYearOptions = {
        YYYYMMM: 'YYYY MMM',
        YYYYMMMM: 'YYYY MMMM',
        MMMYYYY: 'MMM YYYY',
        MMMMYYYY: 'MMMM YYYY',
      };
      const dateInputOptions = {
        'YYYY-MM-DD': 'YYYY-MM-DD',
        'DD/MM/YYYY': 'DD/MM/YYYY',
        'YYYY-MM-DD HH:mm': 'YYYY-MM-DD HH:mm',
        'Wo/YYYY': 'Wo/YYYY',
      };
      const viewOptions = {
        day: 'day',
        week: 'week',
        month: 'month',
      };
      return (
        <DatePicker
          showTimeSelector={boolean('showTimeSelector', false)}
          showConfirmButton={boolean('showConfirmButton', false)}
          showCancelButton={boolean('showCancelButton', false)}
          confirmButtonMessage={text('confirmButtonMessage', 'Confirm')}
          cancelButtonMessage={text('cancelButtonMessage', 'Cancel')}
          timeSelectorMessage={text('timeSelectorMessage', 'Pick Up A Time !')}
          formatWeek={select('Week Format', weekOptions)}
          formatMonthYear={select('Month and Year format in Header', monthYearOptions)}
          formatDateInput={select('Dateinput format', dateInputOptions)}
          withLabel={boolean('Whether show up the input label', false)}
          labelMessage={text('The content of the input label', 'Date')}
          minDate={date('The min-date can be selected(default to be Dec 24 2018', new Date('Dec 24 2018'))}
          maxDate={date('The max-date can be selected(default to be Feb 2 2019', new Date('Feb 11 2019'))}
          view={select('Select the view of the datepicker', viewOptions)}
        />
      );
    }));
