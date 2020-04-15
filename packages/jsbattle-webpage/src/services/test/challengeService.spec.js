import 'babel-polyfill';
import {
  getCompletedChallenges,
  getChallengeList,
  getChallengeDefinition,
  completeChallenge,
  updateChallengeCode
} from '../challengeService.js'

beforeEach(() => {
  global.localStorage.getItem.mockReset();
  global.localStorage.setItem.mockReset();
  global.localStorage.clear.mockReset();
  global.localStorage.removeItem.mockReset();
});

test('no challenges completed by default', () => {
  let result = getCompletedChallenges();
  expect(result).toHaveLength(0);
});

test('get completed challenges', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify([{id: 'a43'}, {id: '9d1'}]))
  const result = await getCompletedChallenges();
  expect(result).toHaveLength(2);
  expect(result[0]).toHaveProperty('id', 'a43');
  expect(result[1]).toHaveProperty('id', '9d1');
});

test('list challenges', async () => {
  let result = await getChallengeList(['challenge-Du7tyrCB']);

  expect(result.length).toBeGreaterThan(0);

  expect(result[0]).toHaveProperty('level', 1);
  expect(result[1]).toHaveProperty('level', 2);
  expect(result[2]).toHaveProperty('level', 3);
  expect(result[3]).toHaveProperty('level', 4);

  expect(result[1]).toHaveProperty('id', 'challenge-Du7tyrCB');

  expect(result[0]).toHaveProperty('completed', false);
  expect(result[1]).toHaveProperty('completed', true);
  expect(result[2]).toHaveProperty('completed', false);
  expect(result[3]).toHaveProperty('completed', false);

  expect(result[0]).toHaveProperty('isUnlocked', true);
  expect(result[1]).toHaveProperty('isUnlocked', true);
  expect(result[2]).toHaveProperty('isUnlocked', true);
  expect(result[3]).toHaveProperty('isUnlocked', false);

});

test('thorw error when list challenges without list of completed',  () => {
  return expect(getChallengeList()).rejects.toThrow(/is required/);
});

test('get challenge definition', async () => {
  let result = await getChallengeDefinition('challenge-8UCUaNvC');
  expect(result).toHaveProperty('id', 'challenge-8UCUaNvC')
  expect(result).toHaveProperty('level', 1)
  expect(result).toHaveProperty('description')
  expect(result).toHaveProperty('rngSeed')
  expect(result).toHaveProperty('timeLimit')
  expect(result).toHaveProperty('aiDefList')
  expect(result).toHaveProperty('modifier')
  expect(result).toHaveProperty('code')
});

test('restore challenge code within the definition (backward compability)', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({'challenge-8UCUaNvC': { code: '// code 8432' }}))
  let result = await getChallengeDefinition('challenge-8UCUaNvC');

  expect(result).toHaveProperty('code', '// code 8432')
});

test('restore challenge code within the definition', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({'challenge-8UCUaNvC': '// code 632246' }))
  let result = await getChallengeDefinition('challenge-8UCUaNvC');

  expect(result).toHaveProperty('code', '// code 632246')
});

test('throw error when challenge definition does not exist', () => {
  return expect(getChallengeDefinition('789xxxxxxxxx123')).rejects.toThrow(/not found/);
});

test('complete challenge', async () => {
  let result = await completeChallenge('challenge-8UCUaNvC');

  expect(result).toHaveProperty('id', 'challenge-8UCUaNvC')
  expect(result).toHaveProperty('completed', true)
  expect(global.localStorage.setItem).toHaveBeenCalled();
  expect(global.localStorage.setItem.mock.calls[0][0]).toBe('challenges.completed');
  const output = JSON.parse(global.localStorage.setItem.mock.calls[0][1]);
  expect(output).toHaveLength(1);
  expect(output[0]).toBe('challenge-8UCUaNvC');
});

test('update challenge code', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({
    'challenge-8UCUaNvC': '// old code 18842723'
  }))
  let result = await updateChallengeCode('challenge-8UCUaNvC', '// code 8982345');

  expect(result).toHaveProperty('id', 'challenge-8UCUaNvC')
  expect(result).toHaveProperty('code', '// code 8982345')
  expect(global.localStorage.setItem).toHaveBeenCalled();
  expect(global.localStorage.setItem.mock.calls[0][0]).toBe('challengeLibrary.scriptMap');
  const output = JSON.parse(global.localStorage.setItem.mock.calls[0][1]);
  expect(output).toHaveProperty('challenge-8UCUaNvC', '// code 8982345');
});

test('throw error when updatinig code of not existing challenge', () => {
  return expect(updateChallengeCode('789xxxxxxxxx123', '// code 4858432')).rejects.toThrow(/does not exists/);
});
