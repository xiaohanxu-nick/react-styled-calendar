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
  transition: transform .2s ease, opacity .2s ease;
  will-change: transform, opacity;

  &.open {
    transform: scale(1);
    opacity: 1; 
  }
`;

CalendarBodyContainer.defaultProps = {
  theme: defaultTheme,
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.neutralColor};
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  box-sizing: border-box;
`;

ButtonContainer.defaultProps = {
  theme: defaultTheme,
};

const Button = styled.div`
  background-color: transparent;
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

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      editting: false,
      edittingTime: false,
    };
  }

  onDateClick = (day) => {
    this.setState(prevState => ({
      ...prevState,
      selectedDate: day,
    }));
  }

  onHourClick = (hour) => {
    this.setState(prevState => ({ ...prevState, selectedDate: hour }));
  }

  onButtonClick = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ ...prevState, editting: true }));
  }

  onSave = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ ...prevState, editting: false }));
  }

  onTimeEditting = (e) => {
    e.preventDefault();

    this.setState(prevState => ({ ...prevState, edittingTime: true }));
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
    } = this.state;

    const {
      showTimeSelector,
    } = this.props;

    return (
      <CalendarContainer>
        <DateInput
          selectedDate={selectedDate}
          onButtonClick={this.onButtonClick}
          editting={editting}
          showTimeSelector={showTimeSelector}
        />
        <CalendarBodyContainer className={editting ? 'open' : ''} editting={editting}>
          <CalendarHeader
            currentMonth={currentMonth}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
          />
          <CalendarWeek
            currentMonth={currentMonth}
          />
          <CalendarCell
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={this.onDateClick}
          />
          {
            showTimeSelector
              ? (
                <TimeSelector
                  selectedDate={selectedDate}
                  onHourClick={this.onHourClick}
                  edittingTime={edittingTime}
                />
              ) : ''
          }
          <ButtonContainer>
            <Button onClick={this.onSave}>Cancel</Button>
            {
              showTimeSelector
                ? (
                  <Button onClick={this.onTimeEditting}>Select Time</Button>
                ) : ''
            }
            <Button onClick={this.onSave}>Confirm</Button>
          </ButtonContainer>
        </CalendarBodyContainer>

      </CalendarContainer>
    );
  }
}

Calendar.defaultProps = {
  showTimeSelector: false,
};

Calendar.propTypes = {
  showTimeSelector: PropTypes.bool,
};

export default Calendar;
