import React, { Component } from 'react';
import styled from 'styled-components';
import DateInput from './DateInput';

const RangeContainer = styled.div`
`;
class RangeInput extends Component {
  state = {
    fromDate: null,
    toDate: null,
  }

  render() {
    const {
      fromDate,
      toDate,
    } = this.state;
    return (
      <RangeContainer>
        <DateInput selectedDate={fromDate} view="day" withLabel labelMessage="From" />
        <DateInput selectedDate={toDate} view="day" withLabel labelMessage="To" />
      </RangeContainer>
    );
  }
}

export default RangeInput;
