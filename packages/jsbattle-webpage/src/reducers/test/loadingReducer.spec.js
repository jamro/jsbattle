import 'babel-polyfill';
import loadingReducer from '../loadingReducer.js';

test('has init state', () => {
  const outcomeState = loadingReducer();
  expect(Object.keys(outcomeState)).toHaveLength(0)
});

test('ignore invalid actions', () => {
  const outcomeState = loadingReducer(
    {},
    {
      type: 'INVALID_ACTIOIN'
    }
  );
  expect(Object.keys(outcomeState)).toHaveLength(0)
});

test('start loading', () => {
  const outcomeState = loadingReducer(
    {},
    {
      type: 'MY_ACTION_REQUEST'
    }
  );
  expect(outcomeState).toHaveProperty('MY_ACTION', true)
});

test('finish loading on success', () => {
  const outcomeState = loadingReducer(
    {
      MY_ACTION: true
    },
    {
      type: 'MY_ACTION_SUCCESS'
    }
  );
  expect(!!outcomeState.MY_ACTION).toBe(false)
});

test('finish loading on failuer', () => {
  const outcomeState = loadingReducer(
    {
      MY_ACTION: true
    },
    {
      type: 'MY_ACTION_FAILURE'
    }
  );
  expect(!!outcomeState.MY_ACTION).toBe(false)
});
