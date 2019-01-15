import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Item from './Item';
import HeaderWeek from './HeaderWeek';
import {
  formatWithLocale,
  whetherDisabled,
  whetherSelected,
  whetherSameDay,
  whetherSat,
  whetherSun,
  whetherBetween,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfYear,
  getEndOfYear,
  getWeekNumber,
  addDay,
  addWeek,
  addMonth,
} from '../../helper';
import defaultTheme from '../../defaultTheme';

const DateTr = styled.tr`
  .selected {
    border-left: 5px solid transparent;
    border-image: linear-gradient(45deg, #1a8fff 0%,#53cbf1 40%);
    border-image-slice: 1;
  }
  .disabled{
    color:lightgray;
  }
`;

DateTr.defaultProps = {
  theme: defaultTheme,
};

const DateTable = styled.table`
  border-spacing: 0 5px;
`;

DateTable.defaultProps = {
  theme: defaultTheme,
};

const RangeTr = styled.tr`
  .disabled{
    color:lightgray;
  }
  .selected {
    color: ${({ theme }) => theme.mainColor};
  }
  .saturday {
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    background: ${({ theme }) => theme.mainColorLight};
  }
  .sunday {
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    background: ${({ theme }) => theme.mainColorLight};
  }
  .start {
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    background: ${({ theme }) => theme.mainColor};
    color: ${({ theme }) => theme.neutralColor};
  }
  .between {
    background: ${({ theme }) => theme.mainColorLight};
  }
  .end {
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    background: ${({ theme }) => theme.mainColor};
    color: ${({ theme }) => theme.neutralColor};
  }
`;

RangeTr.defaultProps = {
  theme: defaultTheme,
};

const DateTb = styled.tbody`
`;

DateTb.defaultProps = {
  theme: defaultTheme,
};


const DateCell = ({
  selectedDate,
  view,
  onItemClick,
  showConfirmButton,
  minDate,
  maxDate,
  renderMonth,
  from,
  to,
}) => {
  let className;
  let cloneDate;
  let formattedDate;
  let itemPerRow;
  let itemPerCol;

  switch (view) {
    case 'range': {
      const monthStart = getStartOfMonth(renderMonth);
      const monthEnd = getEndOfMonth(monthStart);
      const startDate = getStartOfWeek(monthStart);
      const endDate = getEndOfWeek(monthEnd);
      const rows = [];
      let row = [];
      let i;


      cloneDate = startDate;
      itemPerRow = 7;

      while (cloneDate <= endDate) {
        for (i = 0; i < itemPerRow; i += 1) {
          formattedDate = formatWithLocale(cloneDate, 'D');
          const disabled = whetherDisabled(cloneDate, monthStart, minDate, maxDate);
          const selected = !disabled && whetherSelected(cloneDate, selectedDate, from, to);
          const startCell = selected && whetherSameDay(cloneDate, from);
          const between = selected && whetherBetween(cloneDate, from, to);
          const endCell = selected && whetherSameDay(cloneDate, to);
          const selectedSat = selected && whetherSat(cloneDate);
          const selectedSun = selected && whetherSun(cloneDate);

          row.push(
            <Item
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              onDateClick={onItemClick}
              showConfirmButton={showConfirmButton}
              disabledCell={disabled}
              selectedCell={selected}
              startCell={startCell}
              betweenCell={between}
              endCell={endCell}
              selectedSat={selectedSat}
              selectedSun={selectedSun}
              rangeView
            />,
          );
          cloneDate = addDay(cloneDate, 1);
        }
        rows.push(
          <RangeTr key={cloneDate}>
            {row}
          </RangeTr>,
        );
        row = [];
      }
      return (
        <DateTable>
          <HeaderWeek
            currentMonth={selectedDate}
            formatWeek="ddd"
          />
          <DateTb>
            {rows}
          </DateTb>
        </DateTable>
      );
    }
    case 'day': {
      const monthStart = getStartOfMonth(selectedDate);
      const monthEnd = getEndOfMonth(monthStart);
      const startDate = getStartOfWeek(monthStart);
      const endDate = getEndOfWeek(monthEnd);
      const rows = [];
      let row = [];
      let i;

      cloneDate = startDate;
      itemPerRow = 7;

      while (cloneDate <= endDate) {
        for (i = 0; i < itemPerRow; i += 1) {
          formattedDate = formatWithLocale(cloneDate, 'D');
          const disabled = whetherDisabled(cloneDate, monthStart, minDate, maxDate);
          const selected = !disabled && whetherSameDay(cloneDate, selectedDate);

          row.push(
            <Item
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              onDateClick={onItemClick}
              showConfirmButton={showConfirmButton}
              disabledCell={disabled}
              selectedCell={selected}
            />,
          );

          cloneDate = addDay(cloneDate, 1);
        }
        rows.push(
          <DateTr key={cloneDate}>
            {row}
          </DateTr>,
        );
        row = [];
      }

      return (
        <DateTable>
          <HeaderWeek
            currentMonth={selectedDate}
            formatWeek="ddd"
          />
          <DateTb>
            {rows}
          </DateTb>
        </DateTable>
      );
    }
    case 'week': {
      const startOfYear = getStartOfYear(selectedDate);
      const endOfYear = getEndOfYear(selectedDate);
      const startOfLastWeek = getStartOfWeek(endOfYear);

      const cols = [];
      let col = [];
      let i;

      itemPerCol = 11; // A year at most have 54 weeks and we have 3 col, 54/5 = 11
      if (getWeekNumber(startOfYear) > 1) {
        cloneDate = addWeek(startOfYear, 1);
      } else {
        cloneDate = startOfYear;
      }

      while (cloneDate <= startOfLastWeek) {
        for (i = 0; i < itemPerCol && cloneDate <= startOfLastWeek; i += 1) {
          formattedDate = formatWithLocale(cloneDate, 'W');
          const disabled = whetherDisabled(cloneDate, undefined, minDate, maxDate);
          const selected = whetherSameDay(cloneDate, selectedDate);

          col.push(
            <Item
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              showConfirmButton={showConfirmButton}
              onDateClick={onItemClick}
              disabledCell={disabled}
              selectedCell={selected}
            />,
          );

          cloneDate = addWeek(cloneDate, 1);
        }
        cols.push(
          <DateTr key={cloneDate}>
            {col}
          </DateTr>,
        );
        col = [];
      }

      return (
        <DateTb>
          {cols}
        </DateTb>
      );
    }
    case 'month': {
      const startOfYear = getStartOfYear(selectedDate);
      const endOfYear = getEndOfYear(selectedDate);
      const cols = [];

      let col = [];

      cloneDate = startOfYear;
      itemPerCol = 4; // A year at most have 12 months and We have 3 col, 12/3=4

      while (cloneDate < endOfYear) {
        for (let i = 0; i < itemPerCol && cloneDate < endOfYear; i += 1) {
          formattedDate = formatWithLocale(cloneDate, 'MM');
          const disabled = whetherDisabled(cloneDate, undefined, minDate, maxDate);
          const selected = whetherSameDay(cloneDate, selectedDate);

          col.push(
            <Item
              className={className}
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              showConfirmButton={showConfirmButton}
              onDateClick={onItemClick}
              disabledCell={disabled}
              selectedCell={selected}
            />,
          );
          cloneDate = addMonth(cloneDate, 1);
        }

        cols.push(
          <DateTr key={cloneDate}>
            {col}
          </DateTr>,
        );
        col = [];
      }
      return (
        <DateTb>
          {cols}
        </DateTb>
      );
    }
    default: {
      return undefined;
    }
  }
};

DateCell.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  view: PropTypes.string,
  onItemClick: PropTypes.func,
  showConfirmButton: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};
export default DateCell;
