import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  formatWithLocale,
  whetherDisabled,
  whetherSelected,
  whetherSameDay,
} from '../../helper';
import defaultTheme from '../../defaultTheme';
import {
  Col,
  Row,
} from './CalendarContainer';

const Number = styled.div`
  position: absolute;
  font-size: 82.5%;
  line-height: 1;
  top: .75em;
  right: .75em;
  font-weight: 700;
`;

Number.defaultProps = {
  theme: defaultTheme,
};

const Bg = styled.div`
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: ${({ theme }) => theme.mainColor};
  width:100%;
  opacity: 0;
  font-size: 3em;
  position: absolute;
  transition: .25s ease-out;
  letter-spacing: -.07em;
`;

Bg.defaultProps = {
  theme: defaultTheme,
};


const DateRow = styled(Row)`
  .selected {
    border-left: 5px solid transparent;
    border-image: linear-gradient(45deg, #1a8fff 0%,#53cbf1 40%);
    border-image-slice: 1;
  }
  .selected ${Bg}{
    opacity: 0.5;
    color: black;
    transition: .5s ease-in;
  } 
  .disabled{
    color:lightgray;
  }
`;

DateRow.defaultProps = {
  theme: defaultTheme,
};

const DateCol = styled(Col)`
  display: flex;
  flex-direction: column;
  .disabled{
    color:lightgray;
  }
`;

DateCol.defaultProps = {
  theme: defaultTheme,
};

const ItemContainer = styled(Col)`
  width: 100%;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 2em;
  overflow: hidden
  cursor: pointer;
  background: ${({ theme }) => theme.neutralColor};
  transition: 0.25s ease-out;

  
`;

ItemContainer.defaultProps = {
  theme: defaultTheme,
};

const Item = (props) => {
  const {
    value,
    onDateClick,
    showConfirmButton,
    formattedDate,
    disabledCell,
    selectedCell,
    showBg,
  } = props;

  const onDateClickHandler = () => {
    onDateClick(dateFns.parse(value), showConfirmButton);
  };

  return (
    <ItemContainer
      className={classNames({
        disabled: disabledCell,
        selected: selectedCell,
      })}
      key={value}
      onClick={!disabledCell
        ? onDateClickHandler
        : () => {}
      }
    >
      <Number>
        {formattedDate}
      </Number>
      {
        showBg
          ? (<Bg>{formattedDate}</Bg>)
          : ''
      }
    </ItemContainer>
  );
};

Item.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  showConfirmButton: PropTypes.bool.isRequired,
  formattedDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disabledCell: PropTypes.bool.isRequired,
  selectedCell: PropTypes.bool.isRequired,
  showBg: PropTypes.bool.isRequired,
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
      const monthStart = dateFns.startOfMonth(renderMonth);
      const monthEnd = dateFns.endOfMonth(monthStart);
      const startDate = dateFns.startOfWeek(monthStart);
      const endDate = dateFns.endOfWeek(monthEnd);
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

          row.push(
            <Item
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              onDateClick={onItemClick}
              showConfirmButton={showConfirmButton}
              disabledCell={disabled}
              selectedCell={selected}
              showBg={false}
            />,
          );
          cloneDate = dateFns.addDays(cloneDate, 1);
        }
        rows.push(
          <DateRow key={cloneDate}>
            {row}
          </DateRow>,
        );
        row = [];
      }
      return (
        <DateCol key={cloneDate}>
          {rows}
        </DateCol>
      );
    }
    case 'day': {
      const monthStart = dateFns.startOfMonth(selectedDate);
      const monthEnd = dateFns.endOfMonth(monthStart);
      const startDate = dateFns.startOfWeek(monthStart);
      const endDate = dateFns.endOfWeek(monthEnd);
      const rows = [];
      let row = [];
      let i;

      cloneDate = startDate;
      itemPerRow = 7;

      while (cloneDate <= endDate) {
        for (i = 0; i < itemPerRow; i += 1) {
          formattedDate = formatWithLocale(cloneDate, 'D');
          const disabled = whetherDisabled(cloneDate, undefined, minDate, maxDate);
          const selected = whetherSameDay(cloneDate, selectedDate);

          row.push(
            <Item
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              onDateClick={onItemClick}
              showConfirmButton={showConfirmButton}
              disabledCell={disabled}
              selectedCell={selected}
              showBg
            />,
          );

          cloneDate = dateFns.addDays(cloneDate, 1);
        }
        rows.push(
          <DateRow key={cloneDate}>
            {row}
          </DateRow>,
        );
        row = [];
      }

      return (
        <DateCol>
          {rows}
        </DateCol>
      );
    }
    case 'week': {
      const startOfYear = dateFns.startOfYear(selectedDate);
      const endOfYear = dateFns.endOfYear(selectedDate);
      const startOfLastWeek = dateFns.startOfWeek(endOfYear);

      const cols = [];
      let col = [];
      let i;

      itemPerCol = 11; // A year at most have 54 weeks and we have 3 col, 54/3 = 18
      if (dateFns.getISOWeek(startOfYear) > 1) {
        cloneDate = dateFns.addWeeks(startOfYear, 1);
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
              className={className}
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              showConfirmButton={showConfirmButton}
              onDateClick={onItemClick}
              disabledCell={disabled}
              selectedCell={selected}
              showBg
            />,
          );

          cloneDate = dateFns.addWeeks(cloneDate, 1);
        }
        cols.push(
          <DateCol key={cloneDate}>
            {col}
          </DateCol>,
        );
        col = [];
      }

      return (
        <Row>
          {cols}
        </Row>
      );
    }
    case 'month': {
      const startOfYear = dateFns.startOfYear(selectedDate);
      const endOfYear = dateFns.endOfYear(selectedDate);
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
              showBg

            />,
          );
          cloneDate = dateFns.addMonths(cloneDate, 1);
        }

        cols.push(
          <DateCol key={cloneDate}>
            {col}
          </DateCol>,
        );
        col = [];
      }
      return (
        <Row>
          {cols}
        </Row>
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
