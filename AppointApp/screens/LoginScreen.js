import React from 'react';
import styled from 'styled-components';
import { Notifications } from 'expo';
import JSEncrypt from 'jsencrypt';

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Text } from "react-native";

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    repeatPassword: '',
    phoneNum: '',
    loggedIn: false,
    signUp: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.loggedIn !== prevState.loggedIn) {
      this.props.navigation.navigate('Home');
      setTimeout(() => {
        alert('Welcome!')
      }, 1000);
    }
  }

  toggleSignUp = () => {
    this.setState({ signUp: !this.state.signUp });
  }

  // async componentDidUpdate(prevProps) {
  //   if (!get(['user', 'token'], prevProps) && get(['user', 'token'], this.props)) {
  //     this.props.navigation.navigate('Home');
  //   };
  //
  //   if (!prevProps.user.token) {
  //     if (user && user.token) {
  //       this.register().then(() => {
  //         this.props.navigation.navigate('Home');
  //
  //         setTimeout(() => {
  //           alert('Welcome!')
  //         }, 1000);
  //       });
  //     }
  //   }
  // }

  signIn = () => {
    const { email, password } = this.state;
    const pub_key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n' +
      'FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n' +
      'xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n' +
      'gwQco1KRMDSmXSMkDwIDAQAB';
    const encryption = new JSEncrypt();
    encryption.setPublicKey(pub_key);

    const encryptedPassword = encryption.encrypt(password);

    console.log('save encrypted password: ', encryptedPassword);
    this.setState({ loggedIn: true });
  };

  register = async () => {
    const { user = { id: 1 } } = this.props;
    //TODO - real register

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // API call
    this.postPushToken(user.id, token);
  };

  postPushToken(userId, token) {
    console.log('Add push token functionality: ', userId, token);
  }

  render() {
    const { signUp } = this.state;
    return (
      <Container>
        <Logo source={ require('../assets/images/robot-dev.png') } resizeMode="contain"/>
        <Row>
          <Input
            value={this.state.email}
            placeholder="Email"
            type="emailAddress"
            keyboardType="email-address"
            onChange={email => this.setState({ email })}
          />
          <Input
            value={this.state.password}
            placeholder="Password"
            secure
            type="password"
            onChange={password => this.setState({ password })}
          />
          {signUp && (
            <Input
              value={this.state.repeatPassword}
              placeholder="Password"
              secure
              type="password"
              onChange={password => this.setState({ password })}
            />
          )}
          {signUp && (
            <Input
              value={this.state.repeatPassword}
              placeholder="Phone Number"
              type="phoneNumber"
              keyboardType="phone-number"
              onChange={phoneNum => this.setState({ phoneNum })}
            />
          )}

        </Row>

        <Button
          onPress={this.signIn}
          label='Login'
          background='#a97189'
          color='#ffffff'
        />
        <Link onPress={this.toggleSignUp} >
          {signUp ? 'Login' : 'Sign Up'}
        </Link>
      </Container>
    );
  }
}

export default Login;

const Container = styled.View`
  flex: 1;
  background-color: ${'#112133'};
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 260px;
  height: 90px;
`;

const Row = styled.View`
  margin: 40px 0;
`;

const Link = styled.Text`
  margin-top: 20;
  fontSize: 14;
  color: ${'#43a7ff'};
`;
