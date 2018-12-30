import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import formatWithLocale from '../helper/formatWithLocale';
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
  const days = [];
  const {
    currentMonth,
    formatWeek,
  } = props;

  const startDate = dateFns.startOfWeek(currentMonth);

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <Col
        justifyContent="center"
        textAlign="center"
        key={i}
      >
        {formatWithLocale(dateFns.addDays(startDate, i), formatWeek)}
      </Col>,
    );
  }

  return <DaysContainer>{days}</DaysContainer>;
};

CalendarWeek.defaultProps = {
  currentMonth: new Date(),
};

CalendarWeek.propTypes = {
  currentMonth: PropTypes.instanceOf(Date),
  formatWeek: PropTypes.string.isRequired,
};


export default CalendarWeek;
