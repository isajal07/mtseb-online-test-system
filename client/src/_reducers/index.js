import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { test } from './test.reducer'
import { question } from './question.reducer'
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  test,
  question
});

export default rootReducer;