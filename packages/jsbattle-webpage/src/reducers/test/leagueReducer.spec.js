import 'babel-polyfill';
import leagueReducer from '../leagueReducer.js';
import {
  LEAGUE_SUMMARY_SUCCESS,
  LEAGUE_SUMMARY_REQUEST,
  LEAGUE_SUMMARY_FAILURE,
} from '../../actions/actionTypes.js';

test('has init state', () => {
  const outcomeState = leagueReducer();
  expect(outcomeState).toHaveProperty('submission')
  expect(outcomeState).toHaveProperty('ranktable')
  expect(outcomeState.ranktable).toHaveLength(0)
});

test('league summary', () => {
  const outcomeState = leagueReducer(
    {},
    {
      type: 'LEAGUE_SUMMARY_SUCCESS',
      payload: {
        submission: {id: 7245, scriptName: 'humau4316'},
        ranktable: [
          {id: 982354, scriptName: 'bobb9245'}
        ],
        history: [
          {id: 3245},
          {id: 6543}
        ]
      }
    }
  );
  expect(outcomeState).toHaveProperty('submission')
  expect(outcomeState.submission).toHaveProperty('id', 7245)
  expect(outcomeState.submission).toHaveProperty('scriptName', 'humau4316')
  expect(outcomeState.ranktable).toHaveLength(1)
  expect(outcomeState.ranktable[0]).toHaveProperty('id', 982354)
  expect(outcomeState.ranktable[0]).toHaveProperty('scriptName', 'bobb9245')
  expect(outcomeState.history).toHaveLength(2)
  expect(outcomeState.history[0]).toHaveProperty('id', 3245)
  expect(outcomeState.history[1]).toHaveProperty('id', 6543)
});


test('join league', () => {
  const outcomeState = leagueReducer(
    {},
    {
      type: 'LEAGUE_NEW_SUBMISSION_SUCCESS',
      payload: {
        submission: {id: 7245, scriptName: 'humau4316'},
        ranktable: [
          {id: 982354, scriptName: 'bobb9245'}
        ]
      }
    }
  );
  expect(outcomeState).toHaveProperty('submission')
  expect(outcomeState.submission).toHaveProperty('id', 7245)
  expect(outcomeState.submission).toHaveProperty('scriptName', 'humau4316')
  expect(outcomeState.ranktable).toHaveLength(1)
  expect(outcomeState.ranktable[0]).toHaveProperty('id', 982354)
  expect(outcomeState.ranktable[0]).toHaveProperty('scriptName', 'bobb9245')
});

test('join league', () => {
  const outcomeState = leagueReducer(
    {},
    {
      type: 'LEAGUE_CLEAR_SUBMISSION_SUCCESS',
      payload: {
        submission: {},
        ranktable: [
          {id: 982354, scriptName: 'bobb9245'}
        ]
      }
    }
  );
  expect(outcomeState).toHaveProperty('submission')
  expect(outcomeState.submission).toBe(null)
  expect(outcomeState.ranktable).toHaveLength(1)
  expect(outcomeState.ranktable[0]).toHaveProperty('id', 982354)
  expect(outcomeState.ranktable[0]).toHaveProperty('scriptName', 'bobb9245')
});
