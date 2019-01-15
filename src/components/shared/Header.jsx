import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  formatWithLocale,
  addMonth,
} from '../../helper';
import defaultTheme from '../../defaultTheme';
import {
  Row,
  Col,
} from './CalendarContainer';

const HeaderContainer = styled(Row)`
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1em;
  padding: 1em 0;
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
    margin-left: 0.2em;
  }

  &:last-of-type {
    margin-right: 0.2em;
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
    fromMonth,
    toMonth,
  } = props;

  if (view === 'range') {
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
          {`${formatWithLocale(fromMonth, 'YYYY MMM')} - ${formatWithLocale(toMonth, 'YYYY MMM')}`}
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
          {`${formatWithLocale(selectedDate, 'YYYY W')}`}
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
          {`${formatWithLocale(selectedDate, 'YYYY MMM')}`}
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
};

Header.defaultProps = {
  selectedDate: new Date(),
  prev: () => {},
  next: () => {},
  fromMonth: new Date(),
  toMonth: addMonth(new Date(), 1),
};

Header.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  view: PropTypes.string.isRequired,
  prev: PropTypes.func,
  next: PropTypes.func,
  formatMonthYear: PropTypes.string.isRequired,
  fromMonth: PropTypes.instanceOf(Date),
  toMonth: PropTypes.instanceOf(Date),
};

export default Header;
