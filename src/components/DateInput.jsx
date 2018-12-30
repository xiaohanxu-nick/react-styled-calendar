import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import formatWithLocale from '../helper/formatWithLocale';
import defaultTheme from '../defaultTheme';

const InputHightLighter = keyframes`
  from { background: #1a8fff;}
  to { 
    width: 0;
    background: transparent;
  }
`;

const DateInputContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  background: transparent;

`;

DateInputContainer.defaultProps = {
  theme: defaultTheme,
};

const HightLight = styled.span`
  position: absolute;
  height: 60%;
  width: 105px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
`;

HightLight.defaultProps = {
  theme: defaultTheme,
};

const Bar = styled.span`
  position: relative;
  display: block;
  width: 100%;
  &:before, &:after {
    content: '';
    height: 2px;
    width: ${props => (props.editting ? '50%' : '0')};
    botto: 1px
    position: absolute;
    background: ${({ theme }) => theme.mainColor};
    transition: 0.5s ease all;
  }
  &:before {
    left: 50%;
  }
  &:after {
    right: 50%;
  }
`;

Bar.defaultProps = {
  theme: defaultTheme,
};

const InputContainer = styled.input`
  font-size: 18px;
  padding: 10px 0;
  width: 100%;
  display: block;
  border:none;
  background: transparent;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  &:focus {
    outline : none;
    
    ~ ${Bar}:before, ~${Bar}:after{
      width: 50%;
    }

    ~ ${HightLight} {
      animation: ${InputHightLighter} 0.5s ease;
    }
  }
`;

InputContainer.defaultProps = {
  theme: defaultTheme,
};

const DateInput = (props) => {
  const {
    selectedDate,
    onButtonClick,
    editting,
    showTimeSelector,
    formatDateInput
  } = props;
  return (
    <DateInputContainer>
      <InputContainer
        type="date-text"
        value={formatWithLocale(selectedDate, formatDateInput)}
        required
        readOnly
        onClick={onButtonClick}
      />
      <HightLight />
      <Bar editting={editting} />
    </DateInputContainer>
  );
};

DateInput.defaultProps = {
  selectedDate: new Date(),
  onButtonClick: () => {},
  showTimeSelector: false,
  editting: false,
};

DateInput.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onButtonClick: PropTypes.func,
  showTimeSelector: PropTypes.bool,
  editting: PropTypes.bool,
  formatDateInput: PropTypes.string.isRequired,
};
export default DateInput;
