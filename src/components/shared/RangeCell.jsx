import React from 'react';
import PropTypes from 'prop-types';
import DateCell from './DateCell';
import {
  addMonth,
} from '../../helper';
import {
  Row,
} from './CalendarContainer';

const RangeCell = ({
  view,
  onItemClick,
  showConfirmButton,
  minDate,
  maxDate,
  fromDate,
  toDate,
  fromMonth,
  toMonth,
}) => (
  <Row>
    <DateCell
      selectedDate={fromDate}
      renderMonth={fromMonth}
      view={view}
      onItemClick={onItemClick}
      showConfirmButton={showConfirmButton}
      minDate={minDate}
      maxDate={maxDate}
      from={fromDate}
      to={toDate}
    />
    <DateCell
      selectedDate={toDate}
      renderMonth={toMonth}
      view={view}
      onItemClick={onItemClick}
      showConfirmButton={showConfirmButton}
      minDate={minDate}
      maxDate={maxDate}
      from={fromDate}
      to={toDate}
    />
  </Row>
);

RangeCell.defaultProps = {
  view: 'day',
  showConfirmButton: false,
  minDate: new Date('Dec 24 2018'),
  maxDate: undefined,
  fromDate: new Date(),
  toDate: new Date(),
  fromMonth: new Date(),
  toMonth: addMonth(new Date(), 1),
};

RangeCell.propTypes = {
  view: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
  showConfirmButton: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  fromMonth: PropTypes.instanceOf(Date),
  toMonth: PropTypes.instanceOf(Date),
};

export default RangeCell;
