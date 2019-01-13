import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import DateCell from '../src/components/shared/DateCell';

addDecorator(withKnobs);

storiesOf('DateCell', module)
  .add('day',
    withInfo('Xiao')(() => (
      <DateCell
        selectedDate={new Date()}
        view="day"
        itemPerRow={7}
        itemPerCol={undefined}
        onItemClick={() => {}}
        showConfirmButton={false}
        dateFormat="D"
      />
    )))
  .add('week',
    withInfo('Xiao')(() => (
      <DateCell
        selectedDate={new Date()}
        view="week"
        itemPerRow={undefined}
        itemPerCol={18}
        onItemClick={() => {}}
        showConfirmButton={false}
        dateFormat="D"
      />
    )))
  .add('month',
    withInfo('Xiao')(() => (
      <DateCell
        selectedDate={new Date()}
        view="month"
        itemPerRow={undefined}
        itemPerCol={4}
        onItemClick={() => {}}
        showConfirmButton={false}
        dateFormat="MM"
      />
    )));
