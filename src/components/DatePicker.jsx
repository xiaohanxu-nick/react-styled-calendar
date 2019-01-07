import React, { Component } from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import DateCell from './DateCell';
import TimeSelector from './TimeSelector';
import {
  PickerContainer,
  PickerBodyContainer,
  Header,
  DateInput,
  Footer,
  HeaderWeek,
} from './shared';

class DatePicker extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    editting: false,
    edittingTime: false,
    buttonCounter: 0,
  }

  componentDidMount() {
    const {
      showTimeSelector,
      showCancelButton,
      showConfirmButton,
    } = this.props;

    this.setState(prevState => ({
      ...prevState,
      buttonCounter: showTimeSelector + showCancelButton + showConfirmButton,
    }));
  }

  onDateClick = (day, showConfirmButton) => {
    this.setState(prevState => ({
      ...prevState,
      selectedDate: day,
    }));

    if (!showConfirmButton) {
      this.onSave();
    }
  }

  onHourClick = (hour, showConfirmButton) => {
    this.setState(prevState => ({ ...prevState, selectedDate: hour }));

    if (!showConfirmButton) {
      this.onSave();
    }
  }

  onButtonClick = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ ...prevState, editting: true }));
  }

  onSave = () => {
    this.setState(prevState => ({ ...prevState, editting: false }));
  }

  onCancel = () => {
    this.setState(prevState => ({
      ...prevState,
      editting: false,
      selectedDate: new Date(),
      currentMonth: new Date(),
    }));
  }

  onTimeEditting = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ ...prevState, edittingTime: !prevState.edittingTime }));
  }

  nextMonth = () => {
    this.setState(prevState => ({
      ...prevState,
      currentMonth: dateFns.addMonths(prevState.currentMonth, 1),
    }));
  }

  prevMonth = () => {
    this.setState(prevState => ({
      ...prevState,
      currentMonth: dateFns.subMonths(prevState.currentMonth, 1),
    }));
  }

  render() {
    const {
      currentMonth,
      selectedDate,
      editting,
      edittingTime,
      buttonCounter,
    } = this.state;

    const {
      showTimeSelector,
      showCancelButton,
      showConfirmButton,
      formatWeek,
      formatMonthYear,
      formatDateInput,
      confirmButtonMessage,
      cancelButtonMessage,
      timeSelectorMessage,
    } = this.props;

    return (
      <PickerContainer>
        <DateInput
          selectedDate={selectedDate}
          onButtonClick={this.onButtonClick}
          editting={editting}
          showTimeSelector={showTimeSelector}
          formatDateInput={formatDateInput}
          view="day"
        />
        <PickerBodyContainer className={editting ? 'open' : ''} editting={editting}>
          <Header
            selectedDate={selectedDate}
            prev={this.prevMonth}
            next={this.nextMonth}
            view="day"
            formatMonthYear={formatMonthYear}
          />
          <HeaderWeek
            currentMonth={currentMonth}
            formatWeek={formatWeek}
          />
          <DateCell
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={this.onDateClick}
            showConfirmButton={showConfirmButton}
          />
          {
            showTimeSelector
              ? (
                <TimeSelector
                  selectedDate={selectedDate}
                  onHourClick={this.onHourClick}
                  showConfirmButton={showConfirmButton}
                  edittingTime={edittingTime}
                />
              ) : ''
          }
          <Footer
            showTimeSelector={showTimeSelector}
            showCancelButton={showCancelButton}
            showConfirmButton={showConfirmButton}
            cancelButtonMessage={cancelButtonMessage}
            timeSelectorMessage={timeSelectorMessage}
            confirmButtonMessage={confirmButtonMessage}
            onTimeEditting={this.onTimeEditting}
            onCancel={this.onCancel}
            onSave={this.onSave}
            buttonCounter={buttonCounter}
          />
        </PickerBodyContainer>
      </PickerContainer>
    );
  }
}

DatePicker.defaultProps = {
  showTimeSelector: false,
  showCancelButton: false,
  showConfirmButton: false,
  formatMonthYear: 'MMMM YYYY',
  formatWeek: 'ddd',
  formatDateInput: 'YYYY-MM-DD HH:mm',
  confirmButtonMessage: 'Confirm',
  cancelButtonMessage: 'Cancel',
  timeSelectorMessage: 'Pick Up A Time !',
};

DatePicker.propTypes = {
  showTimeSelector: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  formatWeek: PropTypes.string,
  formatMonthYear: PropTypes.string,
  formatDateInput: PropTypes.string,
  confirmButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
  timeSelectorMessage: PropTypes.string,
};

export default DatePicker;
