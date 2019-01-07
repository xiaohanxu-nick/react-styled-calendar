import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import formatWithLocale from '../../helper/formatWithLocale';
import defaultTheme from '../../defaultTheme';
import {
  Row,
  Col,
} from './CalendarContainer';

const HeaderContainer = styled(Row)`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 110%;
  padding: 1.5em 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

HeaderContainer.defaultProps = {
  theme: defaultTheme,
};

const IconContainer = styled.div`
  font-style: normal;
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

const Header = (props) => {
  const {
    selectedDate,
    next,
    prev,
    formatMonthYear,
    view,
  } = props;

  if (view === 'week') {
    return (
      <HeaderContainer>
        <Col
          justifyContent="flex-start"
          textAlign="left"
          onClick={prev}
        >
          <IconContainer>
            &lt;
          </IconContainer>
        </Col>
        <Col
          justifyContent="center"
          textAlign="center"
        >
          {`Year:${dateFns.getYear(selectedDate)} Week: ${dateFns.getISOWeek(selectedDate)}`}
        </Col>
        <Col
          justifyContent="flex-end"
          textAlign="right"
          onClick={next}
        >
          <IconContainer>
            &gt;
          </IconContainer>
        </Col>
      </HeaderContainer>
    );
  }

  if (view === 'month') {
    return (
      <HeaderContainer>
        <Col
          justifyContent="flex-start"
          textAlign="left"
          onClick={prev}
        >
          <IconContainer>
            &lt;
          </IconContainer>
        </Col>
        <Col
          justifyContent="center"
          textAlign="center"
        >
          {`Year:${dateFns.getYear(selectedDate)} Month: ${dateFns.getMonth(selectedDate)}`}
        </Col>
        <Col
          justifyContent="flex-end"
          textAlign="right"
          onClick={next}
        >
          <IconContainer>
            &gt;
          </IconContainer>
        </Col>
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <Col
        justifyContent="flex-start"
        textAlign="left"
        onClick={prev}
      >
        <IconContainer>
          &lt;
        </IconContainer>
      </Col>
      <Col
        justifyContent="center"
        textAlign="center"
      >
        {formatWithLocale(selectedDate, formatMonthYear)}
      </Col>
      <Col
        justifyContent="flext-end"
        textAlign="right"
        onClick={next}
      >
        <IconContainer>
          &gt;
        </IconContainer>
      </Col>
    </HeaderContainer>
  );
};

Header.defaultProps = {
  selectedDate: new Date(),
  prev: () => {},
  next: () => {},
};

Header.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  view: PropTypes.string.isRequired,
  prev: PropTypes.func,
  next: PropTypes.func,
  formatMonthYear: PropTypes.string.isRequired,
};

export default Header;
