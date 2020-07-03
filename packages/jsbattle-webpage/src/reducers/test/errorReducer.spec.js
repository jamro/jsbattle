import 'babel-polyfill';
import errorReducer from '../errorReducer.js';

let logOrig;
let warnOrig;

beforeAll(() => {
  logOrig = console.log;
  warnOrig = console.warn;
  console.log = () => {};
  console.warn = () => {};
});

afterAll(() => {
  console.log = logOrig;
  console.warn = warnOrig;
});

test('has init state', () => {
  const outcomeState = errorReducer();
  expect(Object.keys(outcomeState)).toHaveLength(0)
});

test('ignore invalid actions', () => {
  const outcomeState = errorReducer(
    {},
    {
      type: 'INVALID_ACTIOIN'
    }
  );
  expect(Object.keys(outcomeState)).toHaveLength(0)
});

test('store error', () => {
  const outcomeState = errorReducer(
    {},
    {
      type: 'MY_ACTION_FAILURE',
      payload: new Error('Ooops 4523456')
    }
  );
  expect(outcomeState).toHaveProperty('MY_ACTION', 'Ooops 4523456')
});

test('clear error', () => {
  errorReducer(
    {},
    {
      type: 'MY_ACTION_FAILURE',
      payload: new Error('Ooops 4523456')
    }
  );
  const state = errorReducer(
    {},
    {
      type: 'MY_ACTION_CLEAR_ERROR'
    }
  );
  expect(!!state.MY_ACTION).toBe(false)
});

test('clear error on another request', () => {
  errorReducer(
    {},
    {
      type: 'MY_ACTION_FAILURE',
      payload: new Error('Ooops 4523456')
    }
  );
  const state = errorReducer(
    {},
    {
      type: 'MY_ACTION_REQUEST'
    }
  );
  expect(!!state.MY_ACTION).toBe(false)
});
