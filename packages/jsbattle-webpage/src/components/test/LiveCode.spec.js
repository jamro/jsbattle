import 'babel-polyfill';
import React from 'react';
import {shallow, mount} from 'enzyme';
import LiveCode from '../LiveCode.js';
import Loading from '../Loading.js';
import InfoBox from '../InfoBox.js';
import JsBattle from 'jsbattle-engine';
import JsBattleBattlefield from "jsbattle-react";

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
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Code/);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
});

test('include custom tab', async () => {
  const extraTab = {
    id: 'custom773',
    label: "Custom632",
    icon: 'fas fa-tools',
    content: <span>custom data 88776324</span>
  };
  const wrapper = shallow(<LiveCode
    renderer="void"
    disableSandbox={true}
    extraTabs={[extraTab]}
  />);

  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Code/);

  wrapper.find('.tab-link-custom773 .clickable').simulate('click');
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Custom632/);
  expect(wrapper.render().text()).toMatch(/custom data 88776324/);

});

test('displays loading', async () => {
  const wrapper = shallow(<LiveCode renderer="void" disableSandbox={true} isLoading={true}/>);
  await new Promise((resolve) => setTimeout(resolve, 100));
  expect(wrapper.find(Loading)).toHaveLength(1)
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

  mount(<LiveCode
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
  expect(onFinish.mock.calls[0][0].tankWinner).toHaveProperty('name');
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

test('move from info o code clicking skip', async () => {
  const wrapper = mount(<LiveCode renderer="void" info="Code info data 9235489234"/>);
  await new Promise((resolve) => setTimeout(resolve, 100));
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Info/);
  expect(wrapper.render().text()).toMatch(/Code info data 9235489234/);

  wrapper.find('.start-coding-button').simulate('click');
  await new Promise((resolve) => setTimeout(resolve, 100));
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Code/);
});

test('navigate through tabs', async () => {
  const wrapper = mount(<LiveCode renderer="void" info="some help"/>);
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Info/);
  expect(wrapper.find('.start-coding-button')).toHaveLength(1);

  wrapper.find('.tab-link-code .clickable').simulate('click');
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Code/);

  wrapper.find('.tab-link-cheatsheet .clickable').simulate('click');
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Cheat Sheet/);
  expect(wrapper.render().text()).toMatch(/THROTTLE/);

  wrapper.find('.tab-link-debug .clickable').simulate('click');
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Debug/);
  expect(wrapper.text()).toMatch(/control\.DEBUG = {}/)

  wrapper.find('.tab-link-info .clickable').simulate('click');
  expect(wrapper.find('.live-code-right-tabs .active').text()).toMatch(/Info/);
  expect(wrapper.find('.start-coding-button')).toHaveLength(1);
});

test('do not start when no player name', async () => {
  let aiDef = JsBattle.createAiDefinition();
  const code = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });"
  aiDef.fromCode('opponent532', code);
  aiDef.disableSandbox();
  const aiDefList = [aiDef];

  const wrapper = mount(<LiveCode
    renderer="void"
    name=""
    disableSandbox={true}
    aiDefList={aiDefList}
    code={code}
  />);

  expect(wrapper.find(JsBattleBattlefield)).toHaveLength(0)
  expect(wrapper.find(Loading)).toHaveLength(1)
  expect(wrapper.find('.alert')).toHaveLength(0);
});

test('write code', async () => {
  let log = [];
  console.log = (msg) => {
    log.push(msg);
  }

  let aiDef = JsBattle.createAiDefinition();
  const code = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });"
  const newCode = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { control.DEBUG = {hello: 'world'} });"
  aiDef.fromCode('opponent49345', code);
  aiDef.disableSandbox();
  const aiDefList = [aiDef];

  const onCodeChanged = jest.fn();

  const wrapper = mount(<LiveCode
    debug={true}
    renderer="void"
    disableSandbox={true}
    aiDefList={aiDefList}
    reloadTime={300}
    code={code}
    onCodeChanged={onCodeChanged}
  />);

  wrapper.find('.tab-link-code .clickable').simulate('click');

  //change twice to check if it such case work properly
  await new Promise((resolve) => setTimeout(resolve, 100));
  wrapper.find('textarea.code-editor').simulate("change", {target: {value: 'not working code'}});
  await new Promise((resolve) => setTimeout(resolve, 100));
  wrapper.find('textarea.code-editor').simulate("change", {target: {value: newCode}});
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(onCodeChanged.mock.calls).toHaveLength(0);

  await new Promise((resolve) => setTimeout(resolve, 500));

  expect(onCodeChanged.mock.calls).toHaveLength(1);
  expect(wrapper.find('.alert')).toHaveLength(0);

});

test('display AI errors', async () => {
  let aiDef = JsBattle.createAiDefinition();
  const code = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });"
  aiDef.fromCode('opponent532', code);
  aiDef.disableSandbox();
  const aiDefList = [aiDef];

  const wrapper = shallow(<LiveCode
    renderer="void"
    disableSandbox={true}
    aiDefList={aiDefList}
    code={code}
  />);

  wrapper.find(JsBattleBattlefield).props().onError('error #523452345 from AI')

  expect(wrapper.find(InfoBox)).toHaveLength(1);
  expect(wrapper.find(InfoBox).props().message).toMatch(/error #523452345 from AI/);

});

test('restart battle', async () => {
  let log = [];
  console.log = (msg) => {
    log.push(msg);
  }

  let aiDef = JsBattle.createAiDefinition();
  const code = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });"
  const newCode = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { control.DEBUG = {hello: 'world'} });"
  aiDef.fromCode('opponent99345', code);
  aiDef.disableSandbox();
  const aiDefList = [aiDef];

  const onCodeChanged = jest.fn();

  const wrapper = mount(<LiveCode
    debug={true}
    renderer="void"
    disableSandbox={true}
    aiDefList={aiDefList}
    code={code}
    onCodeChanged={onCodeChanged}
  />);

  //change twice to check if it such case work properly
  await new Promise((resolve) => setTimeout(resolve, 100));
  wrapper.find('textarea.code-editor').simulate("change", {target: {value: newCode}});
  await new Promise((resolve) => setTimeout(resolve, 100));
  wrapper.instance().restartBattle();
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(log.filter((line) => line == 'Restarting the battle')).toHaveLength(1);

  expect(wrapper.find('.alert')).toHaveLength(0);

});

test('display debug data', async () => {
  let aiDef = JsBattle.createAiDefinition();
  const code = "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { control.DEBUG = {data: 'debug-data-424597234523'}; });"
  aiDef.fromCode('opponent3943261', code);
  aiDef.disableSandbox();
  const aiDefList = [aiDef];

  const wrapper = mount(<LiveCode
    renderer="void"
    disableSandbox={true}
    aiDefList={aiDefList}
    code={code}
  />);

  await new Promise((resolve) => setTimeout(resolve, 100));

  wrapper.find('.tab-link-debug .clickable').simulate('click');

  expect(wrapper.find('.alert')).toHaveLength(0);
  expect(wrapper.text()).toMatch(/debug-data-424597234523/);
});
