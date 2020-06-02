import 'babel-polyfill';
import sandboxReducer from '../sandboxReducer.js';
import {
  SETTINGS_SUCCESS,
  SETTINGS_FAILURE,
  AI_SCRIPT_REQUEST,
  AI_SCRIPT_SUCCESS,
  AI_SCRIPT_FAILURE,
  AI_SCRIPT_CHANGED_SUCCESS,
  AI_SCRIPT_CHANGED_FAILURE,
  AI_SCRIPT_RENAME_SUCCESS,
  AI_SCRIPT_RENAME_FAILURE,
  SANDBOX_OPPONENT_CHANGE,
  SANDBOX_RNG_LOCK,
  SANDBOX_RNG_UNLOCK,
  SANDBOX_OPPONENT_TEAM_MODE,
  SANDBOX_OPPONENT_DUEL_MODE,
} from '../../actions/actionTypes.js';


test('has init state', () => {
  const outcomeState = sandboxReducer();
  expect(outcomeState).toHaveProperty('opponentList')
  expect(outcomeState).toHaveProperty('script')
  expect(outcomeState).toHaveProperty('opponent')
  expect(outcomeState).toHaveProperty('lockRng', false)
  expect(outcomeState).toHaveProperty('mode', 'duel')
  expect(outcomeState.opponentList).toHaveLength(0)
  expect(outcomeState.opponent).toHaveProperty('source', 'bundled')
  expect(outcomeState.opponent).toHaveProperty('name', 'dummy')
  expect(outcomeState.opponent).toHaveProperty('code', '')
});

test('get ai script [request]', () => {
  const outcomeState = sandboxReducer(
    {
      script: {
        id: 452
      }
    },
    {
      type: AI_SCRIPT_REQUEST
    }
  );
  expect(Object.keys(outcomeState.script)).toHaveLength(0)
});

test('get ai script [fail]', () => {
  const outcomeState = sandboxReducer(
    {
      script: {
        id: 632
      }
    },
    {
      type: AI_SCRIPT_FAILURE
    }
  );
  expect(Object.keys(outcomeState.script)).toHaveLength(0)
});

test('get ai script [ok]', () => {
  const outcomeState = sandboxReducer(
    {},
    {
      type: AI_SCRIPT_SUCCESS,
      payload: {
        id: 9842
      }
    }
  );
  expect(outcomeState.script).toHaveProperty('id', 9842)
});

test('change ai script code [ok]', () => {
  const outcomeState = sandboxReducer(
    {
      script: {
        id: 1993325,
        code: '// code 198023'
      }
    },
    {
      type: AI_SCRIPT_CHANGED_SUCCESS,
      payload: {
        id: 83725,
        code: '// code 883425'
      }
    }
  );
  expect(outcomeState.script).toHaveProperty('id', 1993325)
  expect(outcomeState.script).toHaveProperty('code', '// code 883425')
});

test('change ai script code [fail]', () => {
  const outcomeState = sandboxReducer(
    {
      script: {
        id: 1993325,
        code: '// code 198023'
      }
    },
    {
      type: AI_SCRIPT_CHANGED_FAILURE
    }
  );
  expect(outcomeState.script).toHaveProperty('id', 1993325)
  expect(outcomeState.script).toHaveProperty('code', '// code 198023')
});


test('rename ai script code [ok]', () => {
  const outcomeState = sandboxReducer(
    {
      script: {
        id: 1993325,
        scriptName: 'myscript-2492'
      }
    },
    {
      type: AI_SCRIPT_RENAME_SUCCESS,
      payload: {
        id: 83725,
        scriptName: 'myscript-89983'
      }
    }
  );
  expect(outcomeState.script).toHaveProperty('id', 1993325)
  expect(outcomeState.script).toHaveProperty('scriptName', 'myscript-89983')
});

test('rename ai script code [fail]', () => {
  const outcomeState = sandboxReducer(
    {
      script: {
        id: 1993325,
        scriptName: 'myscript-8787734'
      }
    },
    {
      type: AI_SCRIPT_RENAME_FAILURE
    }
  );
  expect(outcomeState.script).toHaveProperty('id', 1993325)
  expect(outcomeState.script).toHaveProperty('scriptName', 'myscript-8787734')
});

test('change opponent', () => {
  const outcomeState = sandboxReducer(
    {},
    {
      type: SANDBOX_OPPONENT_CHANGE,
      payload: {
        type: 'local_user',
        name: 'tank774',
        code: '// code 98243'
      }
    }
  );
  expect(outcomeState.opponent).toHaveProperty('name', 'tank774')
  expect(outcomeState.opponent).toHaveProperty('code', '// code 98243')
});

test('lock rng', () => {
  const outcomeState = sandboxReducer(
    {
      lockRng: false
    },
    {
      type: SANDBOX_RNG_LOCK,
    }
  );
  expect(outcomeState).toHaveProperty('lockRng', true)
});

test('unlock rng', () => {
  const outcomeState = sandboxReducer(
    {
      lockRng: true
    },
    {
      type: SANDBOX_RNG_UNLOCK,
    }
  );
  expect(outcomeState).toHaveProperty('lockRng', false)
});

test('set duel mode', () => {
  const outcomeState = sandboxReducer(
    {
      mode: 'team'
    },
    {
      type: SANDBOX_OPPONENT_DUEL_MODE,
    }
  );
  expect(outcomeState).toHaveProperty('mode', 'duel')
});

test('set team mode', () => {
  const outcomeState = sandboxReducer(
    {
      mode: 'duel'
    },
    {
      type: SANDBOX_OPPONENT_TEAM_MODE,
    }
  );
  expect(outcomeState).toHaveProperty('mode', 'team')
});
