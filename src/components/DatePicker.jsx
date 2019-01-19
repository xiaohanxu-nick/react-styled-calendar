import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeSelector from './TimeSelector';
import {
  PickerContainer,
  PickerBodyContainer,
  Header,
  DateInput,
  Footer,
  DateCell,
} from './shared';
import {
  addMonth,
  subMonth,
} from '../helper';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    const { defaultDate } = this.props;
    this.state = {
      selectedDate: defaultDate,
      editting: false,
      edittingTime: false,
      buttonCounter: 0,
    };
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
    const { onDateSelected } = this.props;
    this.setState(prevState => ({
      ...prevState,
      selectedDate: day,
    }));
    if (!showConfirmButton) {
      this.onSave();
      onDateSelected(day);
    } else {
      onDateSelected(day);
    }
  }

  onHourClick = (hour, showConfirmButton) => {
    const { onDateSelected } = this.props;
    this.setState(prevState => ({
      ...prevState,
      selectedDate: hour,
    }));

    if (!showConfirmButton) {
      this.onSave();
      onDateSelected(hour);
    } else {
      onDateSelected(hour);
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
    }));
  }

  onTimeEditting = (e) => {
    e.preventDefault();

    this.setState(prevState => ({
      ...prevState,
      edittingTime: !prevState.edittingTime,
    }));
  }

  nextMonth = () => {
    this.setState(prevState => ({
      ...prevState,
      selectedDate: addMonth(prevState.selectedDate, 1),
    }));
  }

  prevMonth = () => {
    this.setState(prevState => ({
      ...prevState,
      selectedDate: subMonth(prevState.selectedDate, 1),
    }));
  }

  render() {
    const {
      selectedDate,
      editting,
      edittingTime,
      buttonCounter,
    } = this.state;

    const {
      showTimeSelector,
      showCancelButton,
      showConfirmButton,
      formatMonthYear,
      formatDateInput,
      confirmButtonMessage,
      cancelButtonMessage,
      timeSelectorMessage,
      labelMessage,
      withLabel,
      minDate,
      maxDate,
      view,
      className,
    } = this.props;

    return (
      <PickerContainer>
        <DateInput
          selectedDate={selectedDate}
          onButtonClick={this.onButtonClick}
          editting={editting}
          showTimeSelector={showTimeSelector}
          formatDateInput={formatDateInput}
          withLabel={withLabel}
          labelMessage={labelMessage}
        />
        <PickerBodyContainer
          className={`${className} ${editting ? 'open' : ''}`}
          editting={editting}
        >
          <Header
            selectedDate={selectedDate}
            prev={this.prevMonth}
            next={this.nextMonth}
            view={view}
            formatMonthYear={formatMonthYear}
          />
          <DateCell
            minDate={minDate}
            maxDate={maxDate}
            selectedDate={selectedDate}
            onItemClick={this.onDateClick}
            showConfirmButton={showConfirmButton}
            view={view}
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
  formatDateInput: 'YYYY-MM-DD HH:mm',
  confirmButtonMessage: 'Confirm',
  cancelButtonMessage: 'Cancel',
  timeSelectorMessage: 'Pick Up A Time !',
  withLabel: false,
  labelMessage: 'Date',
  minDate: undefined,
  maxDate: undefined,
  onDateSelected: () => {},
  view: 'day',
  className: '',
  defaultDate: new Date(),
};

DatePicker.propTypes = {
  showTimeSelector: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  formatMonthYear: PropTypes.string,
  formatDateInput: PropTypes.string,
  confirmButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
  timeSelectorMessage: PropTypes.string,
  withLabel: PropTypes.bool,
  labelMessage: PropTypes.string,
  minDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  onDateSelected: PropTypes.func,
  view: PropTypes.string,
  className: PropTypes.string,
  defaultDate: PropTypes.instanceOf(Date),
};

export default DatePicker;
