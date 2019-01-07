import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import defaultTheme from '../defaultTheme';
import {
  Col,
  Row,
} from './shared';

const MonthRow = styled(Row)`
`;

const MonthCol = styled(Col)`
  display: flex;
  flex-direction: column;
  width: 33%;

  .selected {
    border-left: 5px solid transparent;
    border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
    border-image-slice: 1;
    color: ${({ theme }) => theme.mainColor};
  }
`;

MonthCol.defaultProps = {
  theme: defaultTheme,
};

const MonthItemContainer = styled(Col)`
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

MonthItemContainer.defaultProps = {
  theme: defaultTheme,
};

const MonthItem = (props) => {
  const {
    value,
    onDateClick,
    showConfrimButon,
    className,
  } = props;
  const formattedDate = dateFns.getMonth(value);
  const onDateClickHandler = () => {
    onDateClick(dateFns.parse(value), showConfrimButon);
  };

  return (
    <MonthItemContainer
      key={value}
      calssName={className}
      onClick={className !== 'disabled'
        ? onDateClickHandler
        : () => {}
      }
    >
      {formattedDate}
    </MonthItemContainer>
  );
};

MonthItem.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  showConfrimButon: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};


const MonthCell = (props) => {
  const {
    selectedDate,
    onDateClick,
    showConfirmButton,
  } = props;

  const startOfYear = dateFns.startOfYear(selectedDate);
  const endOfYear = dateFns.endOfYear(selectedDate);
  const itemPerCol = 4;
  const monthRow = [];
  let month = startOfYear;
  let className;
  let monthCol = [];

  while (month < endOfYear) {
    for (let i = 0; i < itemPerCol && month < endOfYear; i += 1) {
      if (dateFns.isSameMonth(month, selectedDate)) {
        className = 'selected';
      } else {
        className = '';
      }

      monthCol.push(
        <MonthItem
          className={className}
          key={month}
          value={month}
          showConfirmButton={showConfirmButton}
          onDateClick={onDateClick}
        />,
      );
      month = dateFns.addMonths(month, 1);
    }
    monthRow.push(
      <MonthCol key={month}>
        {monthCol}
      </MonthCol>,
    );
    monthCol = [];
  }
  return (
    <MonthRow>
      {monthRow}
    </MonthRow>
  );
};


MonthCell.defaultProps = {
  selectedDate: new Date(),
  showConfirmButton: false,
};

MonthCell.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  showConfirmButton: PropTypes.bool,
  onDateClick: PropTypes.func.isRequired,
};

export default MonthCell;
