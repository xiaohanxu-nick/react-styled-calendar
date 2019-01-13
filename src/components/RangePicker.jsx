import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import {
  Col,
  HeaderWeek,
  Header,
  Footer,
  RangeInput,
  PickerContainer,
  PickerBodyContainer,
  RangeCell,
} from './shared';


class RangePicker extends Component {
  state = {
    fromDate: new Date(),
    toDate: new Date(),
    fromMonth: new Date(),
    toMonth: dateFns.addMonths(new Date(), 1),
    editting: false,
    buttonCounter: 0,
    whetherFirstInput: true,
  }

  prevMonth = () => {
    this.setState(prevState => ({
      ...prevState,
      fromMonth: dateFns.subMonths(prevState.fromMonth, 1),
      toMonth: dateFns.subMonths(prevState.toMonth, 1),
    }));
  }

  nextMonth = () => {
    console.log('setState');
    this.setState(prevState => ({
      ...prevState,
      fromMonth: dateFns.addMonths(prevState.fromMonth, 1),
      toMonth: dateFns.addMonths(prevState.toMonth, 1),
    }));
  }

  onButtonClick = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ ...prevState, editting: true }));
  }

  onTimeEditting = () => {}

  onCancel = () => {}

  onSave = () => {}

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
      className,
      showConfirmButton,
      showCancelButton,
      showTimeSelector,
      confirmButtonMessage,
      cancelButtonMessage,
      timeSelectorMessage,
    } = this.props;

    return (
      <PickerContainer>
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
          <Col>
            <HeaderWeek formatWeek="ddd" />
            <HeaderWeek formatWeek="ddd" />
          </Col>
          <RangeCell
            minDate={minDate}
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
      </PickerContainer>
    );
  }
}

RangePicker.defaultProps = {
  minDate: new Date('Dec 24 2018'),
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
  className: PropTypes.string,
  confirmButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
  timeSelectorMessage: PropTypes.string,
  showTimeSelector: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
};

export default RangePicker;
