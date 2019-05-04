import { combineReducers } from 'redux';

import user from 'redux/reducers/user.reducer';
import alerts from 'redux/reducers/alerts.reducer';
import app from 'redux/reducers/app.reducer';
import servers from 'redux/reducers/servers.reducer';
import orders from 'redux/reducers/orders.reducer';

const rootReducer = combineReducers({
  // app,
  // user,
  // alerts,
  // servers,
  // orders,
});

export default rootReducer;
