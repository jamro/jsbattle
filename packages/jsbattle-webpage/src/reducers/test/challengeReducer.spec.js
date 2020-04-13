import 'babel-polyfill';
import challengeReducer from '../challengeReducer.js';
import {
  CHALLENGE_LIST_SUCCESS,
  CHALLENGE_LIST_FAILURE,
  CHALLENGE_CODE_CHANGED_SUCCESS,
  CHALLENGE_FAILURE,
  CHALLENGE_SUCCESS
} from '../../actions/actionTypes.js';

test('has init state', () => {
  const outcomeState = challengeReducer();
  expect(outcomeState).toHaveProperty('list')
  expect(outcomeState).toHaveProperty('currentChallenge', null)
  expect(outcomeState.list).toHaveLength(0)
});

test('get list of challenges [ok]', () => {
  const outcomeState = challengeReducer(
    {},
    {
      type: CHALLENGE_LIST_SUCCESS,
      payload: [
        {id: 4523},
        {id: 6432},
        {id: 9830}
      ]
    }
  );
  expect(outcomeState.list).toHaveLength(3);
  expect(outcomeState.list[0]).toHaveProperty('id', 4523);
  expect(outcomeState.list[1]).toHaveProperty('id', 6432);
  expect(outcomeState.list[2]).toHaveProperty('id', 9830);
});

test('get list of challenges [fail]', () => {
  const outcomeState = challengeReducer(
    {
      list: [
        {id: 9954},
        {id: 2346},
        {id: 1043}
      ]
    },
    {
      type: CHALLENGE_LIST_FAILURE
    }
  );
  expect(outcomeState.list).toHaveLength(3);
  expect(outcomeState.list[0]).toHaveProperty('id', 9954);
  expect(outcomeState.list[1]).toHaveProperty('id', 2346);
  expect(outcomeState.list[2]).toHaveProperty('id', 1043);
});

test('challenge code change [ok]', () => {
  const outcomeState = challengeReducer(
    {
      currentChallenge: {
        id: 93245,
        code: ''
      }
    },
    {
      type: CHALLENGE_CODE_CHANGED_SUCCESS,
      payload: {
        id: 6436,
        code: '// code 8932452'
      }
    }
  );
  expect(outcomeState.currentChallenge).toHaveProperty('code', '// code 8932452');
  expect(outcomeState.currentChallenge).toHaveProperty('id', 93245);
});

test('challenge code change [fail]', () => {
  const outcomeState = challengeReducer(
    {
      currentChallenge: {
        code: '// code 5239931'
      }
    },
    {
      type: CHALLENGE_LIST_FAILURE
    }
  );
  expect(outcomeState.currentChallenge).toHaveProperty('code', '// code 5239931');
});

test('get challenge [ok]', () => {
  const outcomeState = challengeReducer(
    {},
    {
      type: CHALLENGE_SUCCESS,
      payload: {
        id: 998732,
        code: '// code 1127734'
      }
    }
  );
  expect(outcomeState.currentChallenge).toHaveProperty('code', '// code 1127734');
  expect(outcomeState.currentChallenge).toHaveProperty('id', 998732);
});

test('get challenge [fail]', () => {
  const outcomeState = challengeReducer(
    {
      currentChallenge: {
        id: 87842,
        code: '// code 40934'
      }
    },
    {
      type: CHALLENGE_FAILURE
    }
  );
  expect(outcomeState).toHaveProperty('currentChallenge', null);
});
