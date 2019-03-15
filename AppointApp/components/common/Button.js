import React from 'react';
import styled, { css } from 'styled-components/native';

const Button = (props) => (
  <Wrapper
    onPress={props.onPress}
    style={props.wrapperStyle}>
    <Inner
      isSmall={props.isSmall}
      background={props.background}>
      <Label
        isSmall={props.isSmall}
        color={props.color}
      >
        {props.label.toUpperCase()}
      </Label>
    </Inner>
  </Wrapper>
);

export default Button;

const Wrapper = styled.TouchableOpacity``;

const Inner = styled.View`
  width: 280px;
  height: 50px;
  background-color: ${({ background }) => background || '#dadada'};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  
  ${({ isSmall }) => isSmall && css`
    width: 70px;
    height: 25px;
    background: ${({ background }) => background || '#dadada'};
  `}
`;

const Label = styled.Text`
  color: ${({ color }) => color || '#444'};
  font-size: 18px;
  font-weight: 600;
  
  ${({ isSmall }) => isSmall && css`
    font-size: 11px;
  `}
`;
