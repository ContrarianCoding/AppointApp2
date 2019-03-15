import React from 'react';
import styled from 'styled-components/native';

const Input = (props) => (
  <StyledInput
    value={props.value}
    placeholder={props.placeholder}
    underlineColorAndroid="transparent"
    secureTextEntry={props.secure}
    textContentType={props.type || 'none'}
    autoCapitalize='none'
    autoCorrect={false}
    keyboardType={props.keyboardType || 'default'}
    onChangeText={props.onChange}
  />
);

export default Input;

const StyledInput = styled.TextInput`
  width: 280px;
  height: 50px;
  border-color: #dadada;
  background-color: #fff;
  border-width: 1;
  color: #444;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px;
`;
