import styled from 'styled-components';
import defaultTheme from '../defaultTheme';

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
  justify-content: ${props => props.justifyContent};
  text-align: ${props => props.textAlign};
`;

Col.defaultProps = {
  theme: defaultTheme,
};

export {
  Col,
  Row,
};
