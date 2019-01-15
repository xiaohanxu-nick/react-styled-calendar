import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import defaultTheme from '../../defaultTheme';

const ItemContainer = styled.td`
  position: relative;
  width: 2em;
  height: 2em;
  overflow: hidden
  cursor: pointer;
  background: ${({ theme }) => theme.neutralColor};
  transition: 0.25s ease-out;
  border: 0px solid #333;
  padding: 0px;
`;

ItemContainer.defaultProps = {
  theme: defaultTheme,
};

const Number = styled.div`
  text-align: center;
  font-size: 0.85em;
  line-height: 0.85em;
  font-weight: 400;
  height: 2em;
  line-height: 2em;
  
  ${ItemContainer}.selected.notRangeView & {
    opacity: 0;
    transition: .5s ease-out;
  }
`;

Number.defaultProps = {
  theme: defaultTheme,
};

const Bg = styled.div`
  position: absolute;
  top: 0;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: ${({ theme }) => theme.mainColor};
  width: 100%;
  opacity: 0;
  height: 1em;
  font-size: 2em;
  transition: 0.25s ease-out;
  
  ${ItemContainer}.selected & {
    opacity: 0.5;
    color: black;
    transition: .5s ease-in;
  }
`;

Bg.defaultProps = {
  theme: defaultTheme,
};

const Item = (props) => {
  const {
    value,
    onDateClick,
    showConfirmButton,
    formattedDate,
    selectedCell,
    disabledCell,
    startCell,
    betweenCell,
    endCell,
    selectedSat,
    selectedSun,
    rangeView,
  } = props;

  const onDateClickHandler = () => {
    onDateClick(value, showConfirmButton);
  };

  return (
    <ItemContainer
      className={classNames({
        disabled: disabledCell,
        selected: selectedCell,
        start: startCell,
        between: betweenCell,
        end: endCell,
        saturday: selectedSat,
        sunday: selectedSun,
        notRangeView: !rangeView,
      })}
      key={value}
      onClick={
        !disabledCell
          ? onDateClickHandler
          : () => {}
      }
    >
      <Number>
        {formattedDate}
      </Number>
      {
        rangeView
          ? ''
          : (<Bg>{formattedDate}</Bg>)
      }
    </ItemContainer>
  );
};

Item.defaultProps = {
  startCell: false,
  betweenCell: false,
  endCell: false,
  selectedSat: false,
  selectedSun: false,
  rangeView: false,
};

Item.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  showConfirmButton: PropTypes.bool.isRequired,
  formattedDate: PropTypes.oneOfType(PropTypes.number, PropTypes.string).isRequired,
  selectedCell: PropTypes.bool.isRequired,
  disabledCell: PropTypes.bool.isRequired,
  startCell: PropTypes.bool,
  betweenCell: PropTypes.bool,
  endCell: PropTypes.bool,
  selectedSat: PropTypes.bool,
  selectedSun: PropTypes.bool,
  rangeView: PropTypes.bool,
};

export default Item;
