import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import {
  PickerContainer,
  PickerBodyContainer,
  Header,
  Footer,
  DateInput,
} from './shared';
import WeekCell from './WeekCell';

class WeekPicker extends Component {
  state = {
    selectedDate: new Date(),
    editting: false,
    buttonCounter: 0,
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

  onWeekClick = (day, showConfirmButton) => {
    this.setState(prevState => ({
      ...prevState,
      selectedDate: day,
    }));

    if (!showConfirmButton) {
      this.onSave();
    }
  }

  nextYear = () => {
    this.setState(prevState => ({
      ...prevState,
      selectedDate: dateFns.addYears(prevState.selectedDate, 1),
    }));
  }

  prevYear = () => {
    this.setState(prevState => ({
      ...prevState,
      selectedDate: dateFns.subYears(prevState.selectedDate, 1),
    }));
  }

  render() {
    const {
      selectedDate,
      editting,
      buttonCounter,
    } = this.state;


    const {
      showCancelButton,
      showConfirmButton,
      confirmButtonMessage,
      cancelButtonMessage,
    } = this.props;

    return (
      <PickerContainer>
        <DateInput
          selectedDate={selectedDate}
          onButtonClick={this.onButtonClick}
          editting={editting}
          view="week"
        />
        <PickerBodyContainer className={editting ? 'open' : ''} editting={editting}>
          <Header
            selectedDate={selectedDate}
            prev={this.prevYear}
            next={this.nextYear}
            view="week"
            formatMonthYear="YYYY MM DD"
          />
          <WeekCell
            selectedDate={selectedDate}
            showConfirmButton={showConfirmButton}
            onDateClick={this.onWeekClick}

          />
          <Footer
            showTimeSelector={false}
            showCancelButton={showCancelButton}
            showConfirmButton={showConfirmButton}
            cancelButtonMessage={cancelButtonMessage}
            confirmButtonMessage={confirmButtonMessage}
            timeSelectorHeader=""
            onTimeEditting={() => {}}
            onCancel={this.onCancel}
            onSave={this.onSave}
            buttonCounter={buttonCounter}
          />
        </PickerBodyContainer>
      </PickerContainer>
    );
  }
}

WeekPicker.defaultProps = {
  showCancelButton: false,
  showConfirmButton: true,
  confirmButtonMessage: 'Confrim',
  cancelButtonMessage: 'Cancel',
};

WeekPicker.propTypes = {
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
};

export default WeekPicker;
