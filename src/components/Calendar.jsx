import React, { Component } from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import defaultTheme from '../defaultTheme';
import CalendarHeader from './CalendarHeader';
import CalendarWeek from './CalendarWeek';
import CalendarCell from './CalendarCell';
import DateInput from './DateInput';
import TimeSelector from './TimeSelector';


const CalendarContainer = styled.div`
  width: 30%;
  background: transparent;
  margin: 40px auto;
`;

CalendarContainer.defaultProps = {
  theme: defaultTheme,
};

const CalendarBodyContainer = styled.div`
  display: ${props => (props.editting ? 'block' : 'none')};
  position: relative;
  background: ${({ theme }) => theme.neutralColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  transform-origin: 50% 0%;
  transform: scale(0);
  opacity: 0;
  transition: transform .5s ease, opacity .5s ease;
  will-change: transform, opacity;
  animation-delay: 2s;

  &.open {
    transform: scale(1);
    opacity: 1;
  }
  
`;

CalendarBodyContainer.defaultProps = {
  theme: defaultTheme,
};

const Button = styled.div`
  background-color: transparent;
  text-align: center;
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 700;
  padding: 14px 16px;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  border-radius: 2px;
  transition: background-color .2s;

  &:hover {
    color: ${({ theme }) => theme.mainColor};
    background-color: ${({ theme }) => theme.buttonBg};
  }
  
  &:active {
    color: ${({ theme }) => theme.mainColor};
    background-color: ${({ theme }) => theme.buttonBg};
  }

`;

Button.defaultProps = {
  theme: defaultTheme,
};

const ButtonContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.neutralColor};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  box-sizing: border-box;
  
  & ${Button} {
    width: ${({ buttonCounter }) => (buttonCounter !== 0 ? `${100 / buttonCounter}%` : '100%')}
  }
`;

ButtonContainer.defaultProps = {
  theme: defaultTheme,
};

class Calendar extends Component {
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
      timeSelectorHeader,
    } = this.props;

    return (
      <CalendarContainer>
        <DateInput
          selectedDate={selectedDate}
          onButtonClick={this.onButtonClick}
          editting={editting}
          showTimeSelector={showTimeSelector}
          formatDateInput={formatDateInput}
        />
        <CalendarBodyContainer className={editting ? 'open' : ''} editting={editting}>
          <CalendarHeader
            currentMonth={currentMonth}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
            formatMonthYear={formatMonthYear}
          />
          <CalendarWeek
            currentMonth={currentMonth}
            formatWeek={formatWeek}
          />
          <CalendarCell
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
          <ButtonContainer buttonCounter={buttonCounter}>
            {
              showCancelButton
                ? (
                  <Button onClick={this.onCancel}>
                    {cancelButtonMessage}
                  </Button>
                ) : ''
            }
            {
              showTimeSelector
                ? (
                  <Button onClick={this.onTimeEditting}>
                    {timeSelectorHeader}
                  </Button>
                ) : ''
            }
            {
              showConfirmButton
                ? (
                  <Button onClick={this.onSave}>
                    {confirmButtonMessage}
                  </Button>
                ) : ''
            }
          </ButtonContainer>
        </CalendarBodyContainer>

      </CalendarContainer>
    );
  }
}

Calendar.defaultProps = {
  showTimeSelector: false,
  showCancelButton: false,
  showConfirmButton: false,
  formatMonthYear: 'MMMM YYYY',
  formatWeek: 'ddd',
  formatDateInput: 'YYYY-MM-DD HH:mm',
  confirmButtonMessage: 'Confirm',
  cancelButtonMessage: 'Cancel',
  timeSelectorHeader: 'Pick Up A Time !',
};

Calendar.propTypes = {
  showTimeSelector: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  formatWeek: PropTypes.string,
  formatMonthYear: PropTypes.string,
  formatDateInput: PropTypes.string,
  confirmButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
  timeSelectorHeader: PropTypes.string,
};

export default Calendar;
