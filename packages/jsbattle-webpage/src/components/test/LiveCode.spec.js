import 'babel-polyfill';
import React from 'react';
import {shallow, mount} from 'enzyme';
import LiveCode from '../LiveCode.js';
import JsBattle from 'jsbattle-engine';

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

test('LiveCode renders properly', async () => {
  const wrapper = shallow(<LiveCode renderer="void" disableSandbox={true}/>);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
  await new Promise((resolve) => setTimeout(resolve, 100));
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
});

test('play battle', async () => {
  let aiDef = JsBattle.createAiDefinition();
  const code = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });"
  aiDef.fromCode('opponent532', code);
  aiDef.disableSandbox();
  const aiDefList = [aiDef];

  let onFinishCallback;
  const modifier = {
    opponent532: [{x:1, y:2, a:3}]
  };
  const onFinish = jest.fn(() => {
    onFinishCallback();
  })
  const onFinishPromise = new Promise((resolve) => {
    onFinishCallback = resolve;
  })

  const wrapper = mount(<LiveCode
    renderer="void"
    disableSandbox={true}
    aiDefList={aiDefList}
    code={code}
    teamMode={true}
    timeLimit={100}
    modifier={modifier}
    onFinish={onFinish}
  />);

  await onFinishPromise;

  expect(onFinish.mock.calls).toHaveLength(1)
  expect(onFinish.mock.calls[0][0].tankWinner).toHaveProperty('name', 'opponent532');
});

test('update aiDefList', async () => {
  let log = [];
  console.log = (msg) => {
    log.push(msg);
  }
  const code1 = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });"
  const code2 = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { control.TURN = 1; });"
  const aiDef1 = JsBattle.createAiDefinition();
  aiDef1.fromCode('opponent532', code1);
  aiDef1.disableSandbox();
  const aiDef2 = JsBattle.createAiDefinition();
  aiDef2.fromCode('opponent4663', code2);
  aiDef2.disableSandbox();
  const aiDefList1 = [aiDef1];
  const aiDefList2 = [aiDef2];

  const wrapper = mount(<LiveCode
    debug={true}
    renderer="void"
    disableSandbox={true}
    aiDefList={aiDefList1}
    code={code1}
  />);

  wrapper.setProps({aiDefList: aiDefList2})

  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(log.filter((line) => line == 'battle started')).toHaveLength(2);
  expect(log.filter((line) => line == 'battle initialized')).toHaveLength(2);
  expect(log.filter((line) => line == 'Refreshing aiDefList')).toHaveLength(1);
});
