const api = (base) => ({
  BASE: base,
  PENDING: `${base}_PENDING`,
  SUCCESS: `${base}_SUCCESS`,
  ERROR: `${base}_ERROR`
});

export const API_REQUEST = 'API_REQUEST';

// AUTH
export const POST_PUSH_TOKEN = api('POST_PUSH_TOKEN');
export const SIGNUP = api('SIGNUP');
export const LOGIN = api('LOGIN');
export const LOGOUT = api('LOGOUT');
