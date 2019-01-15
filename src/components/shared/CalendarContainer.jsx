import styled from 'styled-components';
import defaultTheme from '../../defaultTheme';

const Row = styled.div`
  margin: 0;
  padding: 0;
  flex-grow: 1;
  flex-basis: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`;

Row.defaultProps = {
  theme: defaultTheme,
};

const Col = styled.div`
  flex-grow: 1;
  flex-basis: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'center')};
  text-align: ${props => props.textAlign};
`;

Col.defaultProps = {
  theme: defaultTheme,
};

const PickerBodyContainer = styled.div`
  display: ${props => (props.editting ? 'block' : 'none')};
  background: ${({ theme }) => theme.neutralColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  box-shadow: 1px 10px 20px rgba(0,0,0,0.22), 0 13px 12px rgba(0,0,0,0.22);
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

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    height:0px;
    border-bottom: 10px solid ${({ theme }) => theme.borderColor};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
  &:after {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    height: 0px;
    border-bottom: 10px solid ${({ theme }) => theme.neutralColor};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`;
PickerBodyContainer.defaultProps = {
  theme: defaultTheme,
};

const PickerContainer = styled.div`
  background: transparent;
  margin: 40px auto;
  width: 14em;
`;
PickerContainer.defaultProps = {
  theme: defaultTheme,
};

const RangePickerContainer = styled.div`
  background: transparent;
  margin: 40px auto;
  width: 28.4em;
`;
RangePickerContainer.defaultProps = {
  theme: defaultTheme,
};

export {
  Col,
  Row,
  PickerContainer,
  PickerBodyContainer,
  RangePickerContainer,
};
