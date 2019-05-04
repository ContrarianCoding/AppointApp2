import * as AT from 'redux/actions.types';

import { showAlert } from 'redux/actions/alerts.actions';

const BASE = 'https://proggio.herokuapp.com';
const apiMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type !== AT.API_REQUEST) {
    return next(action);
  }

  const { meta } = action;

  let cfg = {
    method: meta.method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (meta.withToken) {
    cfg.headers.Authorization = get('user.token', getState());
  }
  if (meta.method === 'POST' || meta.method === 'PUT') {
    cfg.body = JSON.stringify(meta.body);
  }

  dispatch({
    type: meta.baseAction.PENDING,
    requestParams: meta.requestParams || {}
  });

  const handleResponse = response => {
    dispatch({
      type: meta.baseAction.SUCCESS,
      payload: response,
      requestParams: meta.requestParams || {}
    });
  };

  const handleErrors = async response => {
    dispatch({
      type: meta.baseAction.ERROR,
      payload: {
        message: response.error
      }
    });
  };

  switch (meta.baseAction) {
    case AT.LOGIN:
      firebase.auth().signInWithEmailAndPassword(meta.body.email, meta.body.password).then(handleResponse).catch(handleErrors);
      break;
    case AT.LOGOUT:
      firebase.auth().signOut().then(handleResponse).catch(handleErrors);
      break;
    case AT.SIGNUP:
      firebase.auth().createUserWithEmailAndPassword(meta.body.email, meta.body.password).then(handleResponse).catch(handleErrors);
      break;
    default:
      break;
  }
  // return fetch(`${BASE}${meta.url}`, cfg)
  //   .then(handleErrors)
  //   .then(handleResponse)
  //   .catch(({ error }) => {
  //     if (error && error.message === 'Invalid credentials' || error.message === 'Invalid token format') {
  //       dispatch({
  //         type: AT.SIGN_OUT.PENDING
  //       });
  //     }
  //     dispatch({
  //       type: meta.baseAction.ERROR,
  //       payload: {
  //         message: getOr(
  //           'There was a problem, please try again',
  //           ['errors', 0],
  //           error
  //         )
  //       }
  //     });
  //   });
};

export default apiMiddleware;
