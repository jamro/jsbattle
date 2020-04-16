import 'babel-polyfill';
import {
  getScriptNameList,
  getScript,
  createScript,
  renameScript,
  updateScript,
  deleteScript
} from '../aiRepoService.js';

beforeEach(() => {
  global.localStorage.getItem.mockReset();
  global.localStorage.setItem.mockReset();
  global.localStorage.clear.mockReset();
  global.localStorage.removeItem.mockReset();
});

test('get script', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({
    'alplha873': {
      name: 'alplha873',
      code: '// code 97734'
    }
  }))
  let result = await getScript('local_alplha873');

  expect(result).toHaveProperty('id', 'local_alplha873')
  expect(result).toHaveProperty('scriptName', 'alplha873')
  expect(result).toHaveProperty('code', '// code 97734')
});

test('thorw error when getting not existing script',  () => {
  return expect(getScript('local_z01210a')).rejects.toThrow(/not exist/);
});

test('create script with sugested name', async () => {
  let testValues = ['alpha897', 'abc', '123456789012345', 'ABC_def-123']
  let result;
  for(let testValue of testValues) {
    result = await createScript(testValue);
    expect(result).toHaveProperty('name', testValue);
    expect(result).toHaveProperty('code');
  }
});

test('create script with unique sugested name', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({
    'bravo98707321': {
      name: 'bravo98707321',
      code: '// code 97734'
    }
  }))
  let result = await createScript('bravo98707321');
  expect(result).not.toHaveProperty('name', 'bravo98707321');
  expect(result).toHaveProperty('code');
});

test('create script with unique name', async () => {
  let result1 = await createScript();
  let result2 = await createScript();
  expect(result1).toHaveProperty('name');
  expect(result2).toHaveProperty('name');
  expect(result1.name).not.toBe(result2.name)
  expect(result1).toHaveProperty('code');
  expect(result2).toHaveProperty('code');
});

test('limit amount of created scripts', async () => {
  const script = {
    name: 'gamma882345',
    code: '// code 5342'
  }
  const sixScripts = {};
  const sevenScripts = {};
  for(let i=0; i < 6; i ++) {
    sixScripts[script.name + "_" + i] = script;
    sevenScripts[script.name + "_" + i] = script;
  }
  sevenScripts[script.name + "_6"] = script;

  global.localStorage.getItem.mockReturnValue(JSON.stringify(sixScripts))
  let result = await createScript();
  expect(result).toHaveProperty('name');
  expect(result).toHaveProperty('code');

  global.localStorage.getItem.mockReturnValue(JSON.stringify(sevenScripts))
  return expect(createScript()).rejects.toThrow(/limit/);
});

test('rename script', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({
    'zetta8847': {
      name: 'zetta8847',
      code: '// code 0983'
    },
    'black590983': {
      name: 'black590983',
      code: '// code 2953'
    }
  }));
  let result = await renameScript("omega7743", 'local_zetta8847')
  expect(result).toHaveProperty('id', 'local_omega7743');
  expect(result).toHaveProperty('scriptName', 'omega7743');

  expect(global.localStorage.setItem.mock.calls[0][0]).toBe('scriptMap')
  let outcome = JSON.parse(global.localStorage.setItem.mock.calls[0][1])
  expect(outcome).toHaveProperty('omega7743');
  expect(outcome.omega7743).toHaveProperty('name', 'omega7743');
  expect(outcome.omega7743).toHaveProperty('code', '// code 0983');
});

test('reject too short names', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({
    'zetta26574': {
      name: 'zetta26574',
      code: '// code 8934'
    },
    'reserved7842': {
      name: 'reserved7842',
      code: '// code 19295'
    }
  }));

  let testValues = ['', 'xx', '1234567890123456', {}, 'alpha~', 'do.t', 'specia/', '@nother', 'reserved7842', 'no space']
  let testResults = [];
  for(let testValue of testValues) {
    testResults.push(expect(renameScript(testValue, 'local_zetta26574')).rejects.toThrow(/wrong script name/i))
  }
  return Promise.all(testResults)
});

test('throw error when renaming not existing script', async () => {
  return expect(renameScript('new_name', 'local_alpha1329')).rejects.toThrow(/not exist/);
});

test('list scripts is empty by default', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({
    'duck873': {
      name: 'duck873',
      code: '// code 921'
    },
    'cat762': {
      name: 'cat762',
      code: '// code 013'
    }
  }));
  let result = await getScriptNameList();
  expect(result).toHaveLength(2);
  expect(result[0]).toHaveProperty('id', 'local_duck873');
  expect(result[0]).toHaveProperty('scriptName', 'duck873');
  expect(result[0]).not.toHaveProperty('code');
  expect(result[1]).toHaveProperty('id', 'local_cat762');
  expect(result[1]).toHaveProperty('scriptName', 'cat762');
  expect(result[1]).not.toHaveProperty('code');
});

test('update script', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({
    'orange8874': {
      name: 'orange8874',
      code: '// code 19823'
    }
  }));
  let result = await updateScript('local_orange8874', '// new code 188273');
  expect(result).toHaveProperty('id', 'local_orange8874');
  expect(result).toHaveProperty('name', 'orange8874');
  expect(result).toHaveProperty('code', '// new code 188273');

  expect(global.localStorage.setItem.mock.calls[0][0]).toBe('scriptMap')
  let outcome = JSON.parse(global.localStorage.setItem.mock.calls[0][1])
  expect(outcome).toHaveProperty('orange8874');
  expect(outcome.orange8874).toHaveProperty('name', 'orange8874');
  expect(outcome.orange8874).toHaveProperty('code', '// new code 188273');
});

test('throw error when updatinig not existing script', async () => {
  return expect(updateScript('new_name', 'local_nothing89732')).rejects.toThrow(/not exist/);
});

test('delete script', async () => {
  global.localStorage.getItem.mockReturnValue(JSON.stringify({
    'blue717663': {
      name: 'blue717663',
      code: '// code 8302'
    },
    'pink6232': {
      name: 'pink6232',
      code: '// code 1453'
    }
  }));
  let result = await deleteScript('local_blue717663');

  expect(global.localStorage.setItem.mock.calls[0][0]).toBe('scriptMap')
  let outcome = JSON.parse(global.localStorage.setItem.mock.calls[0][1])
  expect(Object.keys(outcome)).toHaveLength(1);
  expect(outcome.pink6232).toHaveProperty('name', 'pink6232')

});

test('throw error when deletinig not existing script', async () => {
  return expect(updateScript('new_name', 'local_nothing2707332')).rejects.toThrow(/not exist/);
});
