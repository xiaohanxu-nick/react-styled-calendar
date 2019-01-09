import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import formatWithLocale from '../../helper/formatWithLocale';
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

DateCol.defaultProps = {
  theme: defaultTheme,
};

const ItemContainer = styled(Col)`
  width: 100%;
  position: relative;
  height: 3em;
  min-height: 40px;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  overflow: hidden
  cursor: pointer;
  background: ${({ theme }) => theme.neutralColor};
  transition: 0.25s ease-out;
  
  &:hover{
    background: ${({ theme }) => theme.bgColor};
    transition: 0.5s ease-out;
  }
`;

ItemContainer.defaultProps = {
  theme: defaultTheme,
};

const Item = (props) => {
  const {
    value,
    className,
    onDateClick,
    showConfirmButton,
    formattedDate,
  } = props;

  const onDateClickHandler = () => {
    onDateClick(dateFns.parse(value), showConfirmButton);
  };

  return (
    <ItemContainer
      className={className}
      key={value}
      onClick={className !== 'disabled'
        ? onDateClickHandler
        : () => {}
      }
    >
      <Number>{formattedDate}</Number>
      <Bg>{formattedDate}</Bg>
    </ItemContainer>
  );
};

Item.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  className: PropTypes.string.isRequired,
  onDateClick: PropTypes.func.isRequired,
  showConfirmButton: PropTypes.bool.isRequired,
  formattedDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const isBeforeMinDate = (date, minDate) => minDate && dateFns.isBefore(date, minDate);

const DateCell = ({
  selectedDate,
  view,
  onItemClick,
  showConfirmButton,
  minDate,
}) => {
  let className;
  let cloneDate;
  let formattedDate;
  let itemPerRow;
  let itemPerCol;

  switch (view) {
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

          if (!dateFns.isSameMonth(cloneDate, monthStart)
              || isBeforeMinDate(cloneDate, minDate)) {
            className = 'disabled';
          } else if (dateFns.isSameDay(cloneDate, selectedDate)) {
            className = 'selected';
          } else {
            className = '';
          }

          row.push(
            <Item
              className={className}
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              onDateClick={onItemClick}
              showConfirmButton={showConfirmButton}
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
        <Row>
          {rows}
        </Row>
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
          if (isBeforeMinDate(cloneDate, minDate)) {
            className = 'disabled';
          } else if (dateFns.isSameWeek(cloneDate, selectedDate)) {
            className = 'selected';
          } else {
            className = '';
          }

          col.push(
            <Item
              className={className}
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              showConfirmButton={showConfirmButton}
              onDateClick={onItemClick}
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

          if (isBeforeMinDate(cloneDate, minDate)) {
            className = 'disabled';
          } else if (dateFns.isSameMonth(cloneDate, selectedDate)) {
            className = 'selected';
          } else {
            className = '';
          }

          col.push(
            <Item
              className={className}
              key={cloneDate}
              value={cloneDate}
              formattedDate={formattedDate}
              showConfirmButton={showConfirmButton}
              onDateClick={onItemClick}
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
export default DateCell;
