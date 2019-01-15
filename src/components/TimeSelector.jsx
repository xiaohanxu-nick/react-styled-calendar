import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from '../defaultTheme';
import {
  Row,
  Col,
} from './shared';
import {
  getStartOfDay,
  getEndOfDay,
  formatWithLocale,
  whetherSameHour,
  addHour,
} from '../helper';

const TimeSelectorContainer = styled.div`
  transform-origin: 50% 100%;
  transform: scale(0);
  opacity: 0;
  height: 0px;
  transition: transform .5s ease, opacity .5s ease;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  &.open {
    transform: scale(1);
    opacity: 1;
    height: auto;
  }
`;

TimeSelectorContainer.defaultProps = {
  theme: defaultTheme,
};

const TimeSelectorHeader = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: 1em;
  text-align: center;
`;

TimeSelectorHeader.defaultProps = {
  theme: defaultTheme,
};

const HoursRow = styled(Row)`
  .selected {
    color: ${({ theme }) => theme.mainColor};
  }
`;

HoursRow.defaultProps = {
  theme: defaultTheme,
};

const Cell = styled(Col)`
  cursor: pointer;
  text-align: center;
  line-height: 1em;
  font-size: 0.80em;
  height: 1em;
`;

Cell.defaultProps = {
  theme: defaultTheme,
};

const TimeSelector = (props) => {
  const {
    selectedDate,
    edittingTime,
    onHourClick,
    showConfirmButton,
  } = props;

  const startHour = getStartOfDay(selectedDate);
  const endHour = getEndOfDay(selectedDate);
  const dateFormat = 'HH';
  const rows = [];
  const am = [];
  const pm = [];

  let hour = startHour;
  let formattedTime;

  while (hour <= endHour) {
    for (let i = 0; i < 24; i += 1) {
      formattedTime = formatWithLocale(hour, dateFormat);
      const cloneHour = hour;

      if (i < 12) {
        am.push(
          <Cell
            className={`${whetherSameHour(hour, selectedDate) ? 'selected' : ''}`}
            key={hour}
            onClick={() => onHourClick(cloneHour, showConfirmButton)}
          >
            {formattedTime}
          </Cell>,
        );
      } else {
        pm.push(
          <Cell
            className={`${whetherSameHour(hour, selectedDate) ? 'selected' : ''}`}
            key={hour}
            onClick={() => onHourClick(cloneHour, showConfirmButton)}
          >
            {formattedTime}
          </Cell>,
        );
      }
      hour = addHour(hour, 1);
    }
  }
  rows.push(
    <HoursRow key={startHour}>
      {am}
    </HoursRow>,
  );
  rows.push(
    <HoursRow key={endHour}>
      {pm}
    </HoursRow>,
  );

  return (
    <TimeSelectorContainer className={`${edittingTime ? 'open' : ''}`}>
      {rows}
    </TimeSelectorContainer>
  );
};

TimeSelector.defaultProps = {
  selectedDate: new Date(),
  edittingTime: false,
  onHourClick: () => {},
  showConfirmButton: false,
};

TimeSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  edittingTime: PropTypes.bool,
  onHourClick: PropTypes.func,
  showConfirmButton: PropTypes.bool,
};

export default TimeSelector;
