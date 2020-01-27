import 'babel-polyfill';
import {combineReducers} from 'redux';
import auth from './auth';
import loading from './loading';
import error from './error';
import users from './users';
import battles from './battles';

export default combineReducers({
  loading,
  error,
  auth,
  users,
  battles
});
