import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import defaultTheme from '../defaultTheme';
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
  color: ${({ theme }) => theme.mainColor};
  opacity: 0;
  font-size: 4em;
  position: absolute;
  top: -.2em;
  right: -.05em;
  transition: .25s ease-out;
  letter-spacing: -.07em;
`;

Bg.defaultProps = {
  theme: defaultTheme,
};

const DaysRow = styled(Row)`
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

DaysRow.defaultProps = {
  theme: defaultTheme,
};

const Cell = styled(Col)`
  position: relative;
  height: 3em;
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

Cell.defaultProps = {
  theme: defaultTheme,
};

const CalendarCells = (props) => {
  const {
    currentMonth,
    selectedDate,
    onDateClick,
    showConfirmButton,
  } = props;
  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = 'D';
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate;
  let className;

  while (day <= endDate) {
    for (let i = 0; i < 7; i += 1) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;
      if (!dateFns.isSameMonth(day, monthStart)) {
        className = 'disabled';
      } else if (dateFns.isSameDay(day, selectedDate)) {
        className = 'selected';
      } else {
        className = '';
      }
      days.push(
        <Cell
          className={className}
          key={day}
          onClick={className !== 'disabled'
            ? () => onDateClick(dateFns.parse(cloneDay), showConfirmButton)
            : ''
          }
        >
          <Number>{formattedDate}</Number>
          <Bg>{formattedDate}</Bg>
        </Cell>,
      );

      day = dateFns.addDays(day, 1);
    }

    rows.push(
      <DaysRow key={day}>
        {days}
      </DaysRow>,
    );

    days = [];
  }

  return <div className="body">{rows}</div>;
};

CalendarCells.defaultProps = {
  selectedDate: new Date(),
  currentMonth: new Date(),
  onDateClick: () => {},
  showConfirmButton: false,
};

CalendarCells.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  currentMonth: PropTypes.instanceOf(Date),
  onDateClick: PropTypes.func,
  showConfirmButton: PropTypes.bool,
};
export default CalendarCells;
