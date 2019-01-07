import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import defaultTheme from '../defaultTheme';
import {
  Col,
  Row,
} from './shared';

const WeeksRow = styled(Row)`
`;
const WeeksCol = styled(Col)`
  display: flex;
  flex-direction: column;
  width: 33%;
  
  .selected {
    border-left: 5px solid transparent;
    border-image: linear-gradient(45deg, #1a8fff 0%,#53cbf1 40%);
    border-image-slice: 1;
    color: ${({ theme }) => theme.mainColor};
  }
`;

const WeekItemContainer = styled(Col)`
  box-sizing: border-box;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.neutralColor};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  height: 3em;
  cursor: pointer;
  width: 100%;

  
  &:hover {
    background: ${({ theme }) => theme.bgColor};
    transition: 0.5s ease-out;
  }
`;

WeekItemContainer.defaultProps = {
  theme: defaultTheme,
};

const WeekItem = (props) => {
  const {
    value,
    onDateClick,
    showConfirmButton,
    className,
  } = props;

  const onDateClickHandler = () => {
    onDateClick(dateFns.parse(value), showConfirmButton);
  };
  const formattedDate = dateFns.getISOWeek(value);
  return (
    <WeekItemContainer
      key={value}
      className={className}
      onClick={className !== 'disabled'
        ? onDateClickHandler
        : () => {}
      }
    >
      {formattedDate}
    </WeekItemContainer>
  );
};

WeekItem.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  showConfirmButton: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};


const WeekCell = (props) => {
  const {
    selectedDate,
    onDateClick,
    showConfirmButton,
  } = props;

  const startOfYear = dateFns.startOfYear(selectedDate);
  const endOfYear = dateFns.endOfYear(selectedDate);
  const startOfLastWeek = dateFns.startOfWeek(endOfYear);
  const weeksPerCol = 18; // we have three column and one year at most have 54 weeks, 54/3 = 18
  const weeksRow = [];
  let day;
  let className;
  let weeksCol = [];

  // handle the case when the first day of the year is in the last week of the last year.
  if (dateFns.getISOWeek(startOfYear) > 1) {
    day = dateFns.addWeeks(startOfYear, 1);
  } else {
    day = startOfYear;
  }

  while (day <= startOfLastWeek) {
    for (let i = 0; i < weeksPerCol && day <= startOfLastWeek; i += 1) {
      if (dateFns.isSameWeek(day, selectedDate)) {
        className = 'selected';
      } else {
        className = '';
      }
      weeksCol.push(
        <WeekItem
          className={className}
          key={day}
          value={day}
          showConfirmButton={showConfirmButton}
          onDateClick={onDateClick}
        />,
      );
      day = dateFns.addWeeks(day, 1);
    }
    weeksRow.push(
      <WeeksCol key={day}>
        {weeksCol}
      </WeeksCol>,
    );
    weeksCol = [];
  }
  return (
    <WeeksRow>
      {weeksRow}
    </WeeksRow>
  );
};

WeekCell.defaultProps = {
  selectedDate: new Date(),
  showConfirmButton: false,
};

WeekCell.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  showConfirmButton: PropTypes.bool,
  onDateClick: PropTypes.func.isRequired,
};

export default WeekCell;
