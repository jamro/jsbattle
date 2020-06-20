import 'babel-polyfill';
import {combineReducers} from 'redux';
import auth from './authReducer.js';
import loading from './loadingReducer.js';
import error from './errorReducer.js';
import users from './usersReducer.js';
import scripts from './scriptsReducer.js';
import battles from './battlesReducer.js';
import league from './leagueReducer.js';
import system from './systemReducer.js';

export default combineReducers({
  loading,
  error,
  auth,
  users,
  scripts,
  battles,
  league,
  system
});
