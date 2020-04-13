import 'babel-polyfill';
import authReducer from '../authReducer.js';
import {
  AUTH_METHODS_SUCCESS,
  AUTH_METHODS_FAILURE,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  PROFILE_REGISTER_SUCCESS,
  PROFILE_REGISTER_FAILURE,
} from '../../actions/actionTypes.js';

test('has init state', () => {
  const outcomeState = authReducer();
  expect(outcomeState).toHaveProperty('authMethods')
  expect(outcomeState).toHaveProperty('profile')
  expect(Object.keys(outcomeState.authMethods)).toHaveLength(0)
  expect(Object.keys(outcomeState.profile)).toHaveLength(0)
});

test('get auth methods [ok]', () => {
  const outcomeState = authReducer({}, {
    type: AUTH_METHODS_SUCCESS,
    payload: {
      method1: {
        name: "Method-9934",
        url: "http://example.com/5242"
      }
    }
  });
  expect(outcomeState.authMethods).toHaveProperty('method1')
  expect(outcomeState.authMethods.method1).toHaveProperty('name', "Method-9934")
  expect(outcomeState.authMethods.method1).toHaveProperty('url', "http://example.com/5242")
});

test('get auth methods [fail]', () => {
  const outcomeState = authReducer(
  {
    authMethods: {
        method346: {
        name: "Method-643",
        url: "http://example.com/632"
      }
    }
  },
  {
    type: AUTH_METHODS_FAILURE,
    payload: {}
  });
  expect(outcomeState.authMethods).not.toHaveProperty('method346')
});

test('get user profile [ok]', () => {
  const outcomeState = authReducer({}, {
    type: USER_PROFILE_SUCCESS,
    payload: {
      id: 9023452
    }
  });
  expect(outcomeState.profile).toHaveProperty('id', 9023452)
});

test('get user profile [fail]', () => {
  const outcomeState = authReducer(
  {
    profile: {
      id: 16352345
    }
  },
  {
    type: USER_PROFILE_FAILURE,
    payload: {}
  });
  expect(outcomeState.profile).not.toHaveProperty('id')
});

test('register user profile [ok]', () => {
  const outcomeState = authReducer({}, {
    type: PROFILE_REGISTER_SUCCESS,
    payload: {
      id: 6543
    }
  });
  expect(outcomeState.profile).toHaveProperty('id', 6543)
});

test('register user profile [fail]', () => {
  const outcomeState = authReducer(
  {
    profile: {
      id: 5432244
    }
  },
  {
    type: PROFILE_REGISTER_FAILURE,
    payload: {}
  });
  expect(outcomeState.profile).toHaveProperty('id', 5432244)
});
