import 'babel-polyfill';
import settingsReducer from '../settingsReducer.js';
import {
  SET_SIM_SPEED_REQUEST,
  SET_SIM_QUALITY_REQUEST,
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
} from '../../actions/actionTypes.js';


test('has init state', () => {
  const outcomeState = settingsReducer();
  expect(outcomeState).toHaveProperty('simSpeed', 1)
  expect(outcomeState).toHaveProperty('simQuality', 'auto')
  expect(outcomeState).toHaveProperty('teamMode', false)
  expect(outcomeState).toHaveProperty('loaded', false)
});

test('set sim speed', () => {
  const outcomeState = settingsReducer(
    {
      simSpeed: 1
    },
    {
      type: SET_SIM_SPEED_REQUEST,
      payload: 2
    }
  );
  expect(outcomeState).toHaveProperty('simSpeed', 2)
});

test('set sim quality', () => {
  const outcomeState = settingsReducer(
    {
      simQuality: 'auto'
    },
    {
      type: SET_SIM_QUALITY_REQUEST,
      payload: 0.5
    }
  );
  expect(outcomeState).toHaveProperty('simQuality', 0.5)
});

test('load settings [request]', () => {
  const outcomeState = settingsReducer(
    {
      loaded: true
    },
    {
      type: SETTINGS_REQUEST
    }
  );
  expect(outcomeState).toHaveProperty('loaded', false)
});

test('load settings [ok]', () => {
  let logOrig = console.log;
  console.log =  () => {};

  const outcomeState = settingsReducer(
    {
      loaded: false,
      simSpeed: 2,
      simQuality: 1,
      teamMode: true
    },
    {
      type: SETTINGS_SUCCESS,
      payload : {
        simSpeed: 0.2,
        qualitySettings: 0.2,
        teamMode: false
      }
    }
  );
  expect(outcomeState).toHaveProperty('simSpeed', 0.2)
  expect(outcomeState).toHaveProperty('simQuality', 0.2)
  expect(outcomeState).toHaveProperty('teamMode', false)
  expect(outcomeState).toHaveProperty('loaded', true)

  console.log = logOrig
});
