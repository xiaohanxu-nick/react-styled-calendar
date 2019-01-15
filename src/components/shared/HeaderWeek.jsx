import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  formatWithLocale,
  getStartOfWeek,
  addDay,
} from '../../helper';
import defaultTheme from '../../defaultTheme';

const DaysContainer = styled.thead`
  font-weight: 500;
  font-size: 70%;
  color: ${({ theme }) => theme.textColorLight};
  padding: .75em 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

DaysContainer.defaultProps = {
  theme: defaultTheme,
};

const WeekCol = styled.th`
  height: 2em;
  width: 2em;
`;

WeekCol.defaultProps = {
  theme: defaultTheme,
};

const HeaderWeek = (props) => {
  const days = [];
  const {
    currentMonth,
    formatWeek,
  } = props;

  const startDate = getStartOfWeek(currentMonth);

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <WeekCol
        justifyContent="center"
        textAlign="center"
        key={i}
        colSpan="1"
      >
        {formatWithLocale(addDay(startDate, i), formatWeek)}
      </WeekCol>,
    );
  }

  return <DaysContainer><tr>{days}</tr></DaysContainer>;
};

HeaderWeek.defaultProps = {
  currentMonth: new Date(),
};

HeaderWeek.propTypes = {
  currentMonth: PropTypes.instanceOf(Date),
  formatWeek: PropTypes.string.isRequired,
};


export default HeaderWeek;
