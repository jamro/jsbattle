import 'babel-polyfill';
import leagueReducer from '../leagueReducer.js';
import {
  LEAGUE_SUMMARY_SUCCESS,
  LEAGUE_NEW_SUBMISSION_SUCCESS,
  LEAGUE_CLEAR_SUBMISSION_SUCCESS
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
      type: LEAGUE_SUMMARY_SUCCESS,
      payload: {
        submission: {
          id: 7245,
          scriptName: 'humau4316',
          history: []
        },
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
      type: LEAGUE_NEW_SUBMISSION_SUCCESS,
      payload: {
        submission: {
          id: 7245,
          scriptName: 'humau4316',
          history: [
            {
              id: '523423nnfd',
              players: [
                {
                  id: 7245,
                  winner: false
                },
                {
                  id: 1983,
                  winner: true
                }
              ]
            },
            {
              id: '62odu03j4f',
              players: [
                {
                  id: 9823,
                  winner: false
                },
                {
                  id: 7245,
                  winner: true
                }
              ]
            }
          ]
        },
        ranktable: [
          {id: 982354, scriptName: 'bobb9245'}
        ],
        history: [
          {id: 'jau7fas9n3'},
          {id: '9s89dfg73k'},
          {id: '298jn259sj'},
        ]
      }
    }
  );

  expect(outcomeState).toHaveProperty('submission')
  expect(outcomeState.submission).toHaveProperty('id', 7245)
  expect(outcomeState.submission).toHaveProperty('scriptName', 'humau4316')
  expect(outcomeState.submission).toHaveProperty('history')
  expect(outcomeState.submission.history).toHaveLength(2)
  expect(outcomeState.submission.history[0]).toHaveProperty('id', '523423nnfd')
  expect(outcomeState.submission.history[1]).toHaveProperty('id', '62odu03j4f')
  expect(outcomeState.submission.history[0]).toHaveProperty('winner', false)
  expect(outcomeState.submission.history[1]).toHaveProperty('winner', true)
  expect(outcomeState.submission.history[0]).toHaveProperty('opponent')
  expect(outcomeState.submission.history[1]).toHaveProperty('opponent')
  expect(outcomeState.submission.history[0].opponent).toHaveProperty('id', 1983)
  expect(outcomeState.submission.history[1].opponent).toHaveProperty('id', 9823)

  expect(outcomeState).toHaveProperty('ranktable')
  expect(outcomeState.ranktable).toHaveLength(1)
  expect(outcomeState.ranktable[0]).toHaveProperty('id', 982354)
  expect(outcomeState.ranktable[0]).toHaveProperty('scriptName', 'bobb9245')
  expect(outcomeState).toHaveProperty('history')
  expect(outcomeState.history).toHaveLength(3)

});

test('join league', () => {
  const outcomeState = leagueReducer(
    {},
    {
      type: LEAGUE_CLEAR_SUBMISSION_SUCCESS,
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
