import React, { Component } from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import {
  PickerContainer,
  PickerBodyContainer,
  Header,
  DateInput,
  Footer,
  DateCell,
} from './shared';


class MonthPicker extends Component {
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

  onMonthClick = (day, showConfirmButton) => {
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
      formatDateInput,
      confirmButtonMessage,
      cancelButtonMessage,
    } = this.props;


    return (
      <PickerContainer>
        <DateInput
          selectedDate={selectedDate}
          editting={editting}
          formatDateInput={formatDateInput}
          onButtonClick={this.onButtonClick}
          view="month"
        />
        <PickerBodyContainer className={editting ? 'open' : ''} editting={editting}>
          <Header
            selectedDate={selectedDate}
            prev={this.prevYear}
            next={this.nextYear}
            view="month"
            formatMonthYear="YYYY MM DD"
          />
          <DateCell
            selectedDate={selectedDate}
            showConfirmButton={showConfirmButton}
            onItemClick={this.onMonthClick}
            view="month"
            itemPerRow={undefined}
            itemPerCol={4}
            dateFormat="D"
          />
          <Footer
            showTimeSelector={false}
            showCancelButton={showCancelButton}
            showConfirmButton={showConfirmButton}
            cancelButtonMessage={cancelButtonMessage}
            confirmButtonMessage={confirmButtonMessage}
            timeSelectorMessage=""
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

MonthPicker.defaultProps = {
  showCancelButton: false,
  showConfirmButton: true,
  formatDateInput: 'YYYY-M',
  confirmButtonMessage: 'Confirm',
  cancelButtonMessage: 'Cancel',
};

MonthPicker.propTypes = {
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  formatDateInput: PropTypes.string,
  confirmButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
};

export default MonthPicker;
