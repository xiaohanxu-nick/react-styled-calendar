import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import defaultTheme from '../defaultTheme';
import {
  Col,
  Row,
} from './CalendarContainer';

const DaysContainer = styled(Row)`
  font-weight: 500;
  font-size: 70%;
  color: ${({ theme }) => theme.textColorLight};
  padding: .75em 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

DaysContainer.defaultProps = {
  theme: defaultTheme,
};

const CalendarWeek = (props) => {
  const dateFormat = 'dddd';
  const days = [];
  const { currentMonth } = props;
  let weekday = '';

  const startDate = dateFns.startOfWeek(currentMonth);

  for (let i = 0; i < 7; i += 1) {
    weekday = `${dateFns.format(dateFns.addDays(startDate, i), dateFormat)}`.substring(0, 3);
    days.push(
      <Col
        justifyContent="center"
        textAlign="center"
        key={i}
      >
        {weekday}
      </Col>,
    );
  }

  return <DaysContainer>{days}</DaysContainer>;
};

CalendarWeek.defaultProps = {
  currentMonth: new Date(),
};

CalendarWeek.propTypes = {
  currentMonth: PropTypes.instanceOf(new Date()),
};


export default CalendarWeek;
