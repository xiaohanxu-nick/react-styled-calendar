import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DateInput from './DateInput';

const RangeContainer = styled.div`
`;
const RangeInput = ({ toDate, fromDate, onButtonClick }) => (
  <RangeContainer>
    <DateInput selectedDate={fromDate} view="day" withLabel labelMessage="From" onButtonClick={onButtonClick} />
    <DateInput selectedDate={toDate} view="day" withLabel labelMessage="To" onButtonClick={onButtonClick} />
  </RangeContainer>
);

RangeInput.propTypes = {
  toDate: PropTypes.instanceOf(Date).isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default RangeInput;
