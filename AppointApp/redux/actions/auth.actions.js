import * as AT from '../actions.types';

export const postPushToken = (userId, token) => ({
  type: AT.API_REQUEST,
  meta: {
    url: `/users/${userId}/token`,
    method: 'POST',
    baseAction: AT.POST_PUSH_TOKEN,
    withToken: true,
    body: {
      token
    }
  }
});

export const signUp = (email, password) => ({
  type: AT.API_REQUEST,
  meta: {
    method: 'POST',
    baseAction: AT.SIGNUP,
    body: { email, password }
  }
});

export const logIn = (email, password) => ({
  type: AT.API_REQUEST,
  meta: {
    method: 'POST',
    baseAction: AT.LOGIN,
    body: { email, password }
  }
});

export const logOut = () => ({
  type: AT.API_REQUEST,
  meta: {
    method: 'POST',
    baseAction: AT.LOGOUT,
    withToken: true,
    body: {}
  }
});
