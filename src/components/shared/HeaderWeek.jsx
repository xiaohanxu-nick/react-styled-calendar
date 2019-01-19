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

const WeekDayCol = styled.th`
  height: 2em;
  width: 2em;
  text-align: center;
  justify-content: center;
`;

WeekDayCol.defaultProps = {
  theme: defaultTheme,
};

const WeekCol = styled.th`
  height: 2em;
  text-align: center;
  justify-content: center;
`;

WeekCol.defaultProps = {
  theme: defaultTheme,
};

const MonthCol = styled.th`
  height: 2em;
  text-align: center;
  justify-content: center;
`;

MonthCol.defaultProps = {
  theme: defaultTheme,
};

const HeaderWeek = (props) => {
  const days = [];
  const {
    currentMonth,
    formatWeek,
    view,
  } = props;

  switch (view) {
    case 'day': {
      const startDate = getStartOfWeek(currentMonth);

      for (let i = 0; i < 7; i += 1) {
        days.push(
          <WeekDayCol
            key={i}
            colSpan="1"
          >
            {formatWithLocale(addDay(startDate, i), formatWeek)}
          </WeekDayCol>,
        );
      }

      return <DaysContainer><tr>{days}</tr></DaysContainer>;
    }

    case 'week': {
      return (
        <DaysContainer>
          <tr>
            <WeekCol
              colSpan="7"
            >
              Week Number
            </WeekCol>
          </tr>
        </DaysContainer>
      );
    }
    case 'month': {
      return (
        <DaysContainer>
          <tr>
            <MonthCol
              colSpan="7"
            >
              Month Number
            </MonthCol>
          </tr>
        </DaysContainer>
      );
    }

    default: {
      return '';
    }
  }
};

HeaderWeek.defaultProps = {
  currentMonth: new Date(),
  view: 'day',
};

HeaderWeek.propTypes = {
  currentMonth: PropTypes.instanceOf(Date),
  formatWeek: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
};


export default HeaderWeek;
