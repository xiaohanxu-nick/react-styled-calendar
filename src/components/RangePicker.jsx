import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Footer,
  RangeInput,
  RangePickerContainer,
  PickerBodyContainer,
  RangeCell,
} from './shared';
import {
  addMonth,
  subMonth,
  whetherBefore,
  whetherSameDay,
} from '../helper';

class RangePicker extends Component {
  constructor(props) {
    super(props);
    const {
      defaultFromInput,
      defaultToInput,
    } = this.props;
    this.state = {
      fromDate: defaultFromInput,
      toDate: defaultToInput,
      fromMonth: new Date(),
      toMonth: addMonth(new Date(), 1),
      editting: false,
      buttonCounter: 0,
      whetherFirstInput: true,
    };
  }


  componentDidUpdate() {
    const { fromDate, toDate } = this.state;

    this.calculateNewRage(fromDate, toDate);
  }

  calculateNewRage = (fromDate, toDate) => {
    const { onRangeSelected } = this.props;
    if (!whetherSameDay(fromDate, toDate) && !whetherBefore(fromDate, toDate)) {
      this.setState(prevState => ({
        ...prevState,
        fromDate: toDate,
        toDate: fromDate,
      }));
      onRangeSelected(toDate, fromDate);
    } else {
      onRangeSelected(fromDate, toDate);
    }
  }

  prevMonth = () => {
    this.setState(prevState => ({
      ...prevState,
      fromMonth: subMonth(prevState.fromMonth, 1),
      toMonth: subMonth(prevState.toMonth, 1),
    }));
  }

  nextMonth = () => {
    this.setState(prevState => ({
      ...prevState,
      fromMonth: addMonth(prevState.fromMonth, 1),
      toMonth: addMonth(prevState.toMonth, 1),
    }));
  }

  onSave = () => {
    this.setState(prevState => ({ ...prevState, editting: false }));
  }

  onButtonClick = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ ...prevState, editting: true }));
  }

  onItemClick = (date) => {
    const { whetherFirstInput } = this.state;
    if (whetherFirstInput) {
      this.setState(prevState => ({
        ...prevState,
        whetherFirstInput: false,
        fromDate: date,
        toDate: prevState.toDate,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        whetherFirstInput: true,
        fromDate: prevState.fromDate,
        toDate: date,
      }));
    }
  }


  render() {
    const {
      fromDate,
      toDate,
      fromMonth,
      toMonth,
      editting,
      buttonCounter,
      whetherFirstInput,
    } = this.state;
    const {
      minDate,
      maxDate,
      className,
      withLabel,
      fromInputLabel,
      toInputLabel,
    } = this.props;

    return (
      <RangePickerContainer>
        <RangeInput
          toDate={toDate}
          fromDate={fromDate}
          onButtonClick={this.onButtonClick}
          whetherFirstInput={whetherFirstInput}
          withLabel={withLabel}
          fromInputLabel={fromInputLabel}
          toInputLabel={toInputLabel}
        />
        <PickerBodyContainer
          className={`${className} ${editting ? 'open' : ''}`}
          editting={editting}
        >
          <Header
            selectedDate={fromDate}
            prev={this.prevMonth}
            next={this.nextMonth}
            view="range"
            fromMonth={fromMonth}
            toMonth={toMonth}
            formatMonthYear="MMMM YYYY"
          />
          <RangeCell
            minDate={minDate}
            maxDate={maxDate}
            fromMonth={fromMonth}
            toMonth={toMonth}
            onItemClick={this.onItemClick}
            showConfirmButton={false}
            view="range"
            fromDate={fromDate}
            toDate={toDate}
            whetherFirstInput={whetherFirstInput}
          />
          <Footer
            onTimeEditting={this.onTimeEditting}
            onCancel={this.onCancel}
            onSave={this.onSave}
            buttonCounter={buttonCounter}
            showConfirmButton
            confirmButtonMessage="Confirm"
          />
        </PickerBodyContainer>
      </RangePickerContainer>
    );
  }
}

RangePicker.defaultProps = {
  minDate: undefined,
  maxDate: undefined,
  className: '',
  withLabel: true,
  fromInputLabel: 'From',
  toInputLabel: 'To',
  defaultFromInput: new Date(),
  defaultToInput: new Date(),
  onRangeSelected: () => { },
};

RangePicker.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  withLabel: PropTypes.bool,
  fromInputLabel: PropTypes.string,
  toInputLabel: PropTypes.string,
  defaultFromInput: PropTypes.instanceOf(Date),
  defaultToInput: PropTypes.instanceOf(Date),
  onRangeSelected: PropTypes.func,
};

export default RangePicker;
