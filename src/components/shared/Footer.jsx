import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from '../../defaultTheme';

const Button = styled.div`
  background-color: transparent;
  text-align: center;
  outline: none;
  border: none;
  height: 0.8em;
  line-height: 0.8em;
  font-size: 0.6em;
  font-weight: 400;
  padding: 10px 6px;
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

const Footer = (props) => {
  const {
    showTimeSelector,
    showCancelButton,
    showConfirmButton,
    cancelButtonMessage,
    timeSelectorMessage,
    confirmButtonMessage,
    onTimeEditting,
    onCancel,
    onSave,
    buttonCounter,
  } = props;

  return (
    <ButtonContainer buttonCounter={buttonCounter}>
      {
        showCancelButton
          ? (
            <Button onClick={onCancel}>
              {cancelButtonMessage}
            </Button>
          ) : ''
      }
      {
        showTimeSelector
          ? (
            <Button onClick={onTimeEditting}>
              {timeSelectorMessage}
            </Button>
          ) : ''
      }
      {
        showConfirmButton
          ? (
            <Button onClick={onSave}>
              {confirmButtonMessage}
            </Button>
          ) : ''
      }
    </ButtonContainer>
  );
};

Footer.propTypes = {
  showTimeSelector: PropTypes.bool.isRequired,
  showCancelButton: PropTypes.bool.isRequired,
  showConfirmButton: PropTypes.bool.isRequired,
  cancelButtonMessage: PropTypes.string.isRequired,
  timeSelectorMessage: PropTypes.string.isRequired,
  confirmButtonMessage: PropTypes.string.isRequired,
  onTimeEditting: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  buttonCounter: PropTypes.number.isRequired,
};

export default Footer;
