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
} from '../helper';

class RangePicker extends Component {
  state = {
    fromDate: new Date(),
    toDate: new Date(),
    fromMonth: new Date(),
    toMonth: addMonth(new Date(), 1),
    editting: false,
    buttonCounter: 0,
    whetherFirstInput: true,
  }

  prevMonth = () => {
    this.setState(prevState => ({
      ...prevState,
      fromMonth: subMonth(prevState.fromMonth, 1),
      toMonth: subMonth(prevState.toMonth, 1),
    }));
  }

  nextMonth = () => {
    console.log('setState');
    this.setState(prevState => ({
      ...prevState,
      fromMonth: addMonth(prevState.fromMonth, 1),
      toMonth: addMonth(prevState.toMonth, 1),
    }));
  }

  onButtonClick = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ ...prevState, editting: true }));
  }

  onTimeEditting = () => {}

  onCancel = () => {}

  onSave = () => {}

  calculateNewRange = () => {}

  onItemClick = (date) => {
    const { chooseWhereFrom } = this.state;
    if (chooseWhereFrom) {
      this.setState(prevState => ({
        ...prevState,
        chooseWhereFrom: false,
        fromDate: date,
        toDate: prevState.toDate,
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        chooseWhereFrom: true,
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
    } = this.state;
    const {
      minDate,
      maxDate,
      className,
      showConfirmButton,
      showCancelButton,
      showTimeSelector,
      confirmButtonMessage,
      cancelButtonMessage,
      timeSelectorMessage,
    } = this.props;

    return (
      <RangePickerContainer>
        <RangeInput
          toDate={toDate}
          fromDate={fromDate}
          onButtonClick={this.onButtonClick}
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
            showConfirmButton={showConfirmButton}
            view="range"
            fromDate={fromDate}
            toDate={toDate}
          />
          <Footer
            showTimeSelector={showTimeSelector}
            showCancelButton={showCancelButton}
            showConfirmButton={showConfirmButton}
            onTimeEditting={this.onTimeEditting}
            onCancel={this.onCancel}
            onSave={this.onSave}
            buttonCounter={buttonCounter}
            cancelButtonMessage={cancelButtonMessage}
            confirmButtonMessage={confirmButtonMessage}
            timeSelectorMessage={timeSelectorMessage}

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
  confirmButtonMessage: 'Confirm',
  cancelButtonMessage: 'Cancel',
  timeSelectorMessage: 'Choose a Time',
  showConfirmButton: false,
  showCancelButton: false,
  showTimeSelector: false,
};

RangePicker.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  confirmButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
  timeSelectorMessage: PropTypes.string,
  showTimeSelector: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
};

export default RangePicker;
