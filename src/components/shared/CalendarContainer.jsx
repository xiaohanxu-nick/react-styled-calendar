import styled from 'styled-components';
import defaultTheme from '../../defaultTheme';

const Row = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width:100%;
`;

Row.defaultProps = {
  theme: defaultTheme,
};

const Col = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'center')};
  text-align: ${props => props.textAlign};
`;

Col.defaultProps = {
  theme: defaultTheme,
};


const PickerContainer = styled.div`
  width: 30%;
  background: transparent;
  margin: 40px auto;
`;
PickerContainer.defaultProps = {
  theme: defaultTheme,
};
const PickerBodyContainer = styled.div`
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

PickerBodyContainer.defaultProps = {
  theme: defaultTheme,
};

export {
  Col,
  Row,
  PickerContainer,
  PickerBodyContainer,
};
