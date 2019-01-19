import React from 'react';
import styled, { keyframes } from 'styled-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { formatWithLocale } from '../../helper';
import defaultTheme from '../../defaultTheme';

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
  text-align: center;
`;

DateInputContainer.defaultProps = {
  theme: defaultTheme,
};

const Label = styled.label`
  color: ${({ theme }) => theme.mainColor};
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-evetns: none;
  top: -15px;
  transition: 0.2s ease all;
  opacity: 0.5;
`;

Label.defaultProps = {
  theme: defaultTheme,
};

const HightLight = styled.span`
  position: absolute;
  height: 60%;
  width: 100%;
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
    bottom: 1px;
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
  display:block;
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
    ~ ${Label} {
      opacity: 1;
    }
  }
  &.edittingNow {
    ~ ${Label} {
      opacity: 1;
    }
    ~ ${Bar}:before, ~${Bar}:after{
      width: 50%;
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
    formatDateInput,
    withLabel,
    labelMessage,
    setRef,
  } = props;

  const formattedDate = formatWithLocale(selectedDate, formatDateInput);

  return (
    <DateInputContainer>
      <InputContainer
        className={
          classNames({
            edittingNow: editting,
          })
        }
        type="date-text"
        value={formattedDate}
        ref={setRef}
        required
        readOnly
        onClick={onButtonClick}
      />
      <HightLight />
      <Bar editting={editting} />
      {
        withLabel ? <Label>{labelMessage}</Label> : ''
      }
    </DateInputContainer>
  );
};

DateInput.defaultProps = {
  selectedDate: new Date(),
  onButtonClick: () => {},
  editting: false,
  formatDateInput: 'YYYY-MM-DD',
  withLabel: false,
  labelMessage: 'Date',
  setRef: () => {},
};

DateInput.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onButtonClick: PropTypes.func,
  editting: PropTypes.bool,
  formatDateInput: PropTypes.string,
  withLabel: PropTypes.bool,
  labelMessage: PropTypes.string,
  setRef: PropTypes.func,
};
export default DateInput;
