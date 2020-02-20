import 'babel-polyfill';
import {combineReducers} from 'redux';
import loading from './loadingReducer.js';
import error from './errorReducer.js';
import challenge from './challengeReducer.js';
import sandbox from './sandboxReducer.js';
import aiRepo from './aiRepoReducer.js';
import settings from './settingsReducer.js';
import auth from './authReducer.js';

export default combineReducers({
  loading,
  error,
  settings,
  challenge,
  sandbox,
  aiRepo,
  auth
});
