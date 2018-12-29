import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import defaultTheme from '../defaultTheme';
import {
  Row,
  Col,
} from './CalendarContainer';

const CalendarHeaderContainer = styled(Row)`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 110%;
  padding: 1.5em 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

CalendarHeaderContainer.defaultProps = {
  theme: defaultTheme,
};

const IconContainer = styled.div`
  font-style: normal;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
  transition: .15s ease-out;

  &:hover{
    transform: scale(1.1);
    transition: .25s ease-out;
    color: ${({ theme }) => theme.mainColor};
  }

  &:first-of-type {
    margin-left: 1em;
  }

  &:last-of-type {
    margin-right: 1em;
  }
`;

IconContainer.defaultProps = {
  theme: defaultTheme,
};

const CalendarHeader = (props) => {
  const {
    currentMonth,
    nextMonth,
    prevMonth,
    formatMonthYear,
  } = props;

  return (
    <CalendarHeaderContainer>
      <Col
        justifyContent="flex-start"
        textAlign="left"
        onClick={prevMonth}
      >
        <IconContainer>
          &lt;
        </IconContainer>
      </Col>
      <Col
        justifyContent="center"
        textAlign="center"
      >
        {dateFns.format(currentMonth, formatMonthYear)}
      </Col>
      <Col
        justifyContent="flext-end"
        textAlign="right"
        onClick={nextMonth}
      >
        <IconContainer>
          &gt;
        </IconContainer>
      </Col>
    </CalendarHeaderContainer>
  );
};

CalendarHeader.defaultProps = {
  currentMonth: new Date(),
  prevMonth: () => {},
  nextMonth: () => {},
};

CalendarHeader.propTypes = {
  currentMonth: PropTypes.instanceOf(Date),
  prevMonth: PropTypes.func,
  nextMonth: PropTypes.func,
  formatMonthYear: PropTypes.string.isRequired,
};

export default CalendarHeader;
