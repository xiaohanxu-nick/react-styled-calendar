import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DateInput from './DateInput';

const RangeContainer = styled.div`
`;

class RangeInput extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      whetherFirstInput,
      fromDate,
      toDate,
    } = this.props;
    if (nextProps.whetherFirstInput !== whetherFirstInput) return true;
    if (nextProps.fromDate !== fromDate) return true;
    if (nextProps.toDate !== toDate) return true;
    return false;
  }

  componentDidUpdate() {
    const {
      whetherFirstInput,
    } = this.props;
    if (whetherFirstInput) {
      this.firstInput.focus();
    } else {
      this.secondInput.focus();
    }
  }

  setFirstInputRef = (element) => {
    this.firstInput = element;
  }

  setSecondInputRef = (element) => {
    this.secondInput = element;
  }

  render() {
    const {
      toDate,
      fromDate,
      onButtonClick,
      whetherFirstInput,
      withLabel,
      fromInputLabel,
      toInputLabel,
    } = this.props;
    return (
      <RangeContainer>
        <DateInput
          setRef={this.setFirstInputRef}
          selectedDate={fromDate}
          view="day"
          withLabel={withLabel}
          labelMessage={fromInputLabel}
          onButtonClick={onButtonClick}
          editting={whetherFirstInput}
        />
        <DateInput
          setRef={this.setSecondInputRef}
          selectedDate={toDate}
          view="day"
          withLabel={withLabel}
          labelMessage={toInputLabel}
          onButtonClick={onButtonClick}
          editting={!whetherFirstInput}
        />
      </RangeContainer>
    );
  }
}

RangeInput.defaultProps = {
  fromInputLabel: 'from',
  toInputLabel: 'to',
};

RangeInput.propTypes = {
  toDate: PropTypes.instanceOf(Date).isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  onButtonClick: PropTypes.func.isRequired,
  whetherFirstInput: PropTypes.bool.isRequired,
  withLabel: PropTypes.bool.isRequired,
  fromInputLabel: PropTypes.string,
  toInputLabel: PropTypes.string,
};

export default RangeInput;
