import 'babel-polyfill';
import aiRepoReducer from '../aiRepoReducer.js';
import {
  SANDBOX_AI_SCRIPT_LIST_SUCCESS,
} from '../../actions/actionTypes.js';

test('has init state', () => {
  const outcomeState = aiRepoReducer();
  expect(outcomeState).toHaveProperty('tankList');
});

test('update tank list', () => {
  const outcomeState = aiRepoReducer({}, {
    type: SANDBOX_AI_SCRIPT_LIST_SUCCESS,
    payload: [
      { id: 'op1',  scriptName: 'alpha753' },
      { id: 'op2',  scriptName: 'beta78732' }
    ]
  });
  expect(outcomeState.tankList).toHaveLength(2);
  expect(outcomeState.tankList[0]).toHaveProperty('id', 'op1');
  expect(outcomeState.tankList[1]).toHaveProperty('id', 'op2');
  expect(outcomeState.tankList[0]).toHaveProperty('scriptName', 'alpha753');
  expect(outcomeState.tankList[1]).toHaveProperty('scriptName', 'beta78732');
});
