import 'babel-polyfill';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {LeagueReplayScreen} from '../LeagueReplayScreen.js';
import Loading from '../../components/Loading.js';
import JsBattleBattlefield from "jsbattle-react";

const match = {
  params: {
    id: '123456abcdXYZ'
  }
}

const aiList = [
   {
     name: 'brick',
     team: 'alpha/brick',
     code: "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });",
     initData: null,
     useSandbox: true,
     executionLimit: 100
   },
   {
     name: 'moore',
     team: 'beta/moore',
     code: "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });",
     initData: null,
     useSandbox: true,
     executionLimit: 100
   }
];

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

test('show unauthorized', () => {
  const wrapper = shallow(<LeagueReplayScreen
    match={match}
    isAuthorized={false}
  />);
  expect(wrapper.text()).toMatch(/not authorized/i);
});

test('show loading', () => {
  const wrapper = shallow(<LeagueReplayScreen
    match={match}
    isLoading={true}
    isAuthorized={true}
  />);
  expect(wrapper.find(Loading)).toHaveLength(1);
});

test('show player in breadcrumb', () => {
  const wrapper = shallow(<LeagueReplayScreen
    match={match}
    isLoading={false}
    isAuthorized={true}
    result={[
      {name: 'alpha7638'},
      {name: 'bravo9743'},
    ]}
  />);
  expect(wrapper.find('.breadcrumb').text()).toMatch(/league/i)
  expect(wrapper.find('.breadcrumb').text()).toMatch(/alpha7638/i)
  expect(wrapper.find('.breadcrumb').text()).toMatch(/bravo9743/i)
});

test('play the battle', () => {
  const wrapper = shallow(<LeagueReplayScreen
    match={match}
    isLoading={false}
    isAuthorized={true}
    rngSeed={787223}
    timeLimit={12340}
    simQuality={0.65}
    simSpeed={0.42}
    result={[
      {name: 'alpha7638'},
      {name: 'bravo9743'},
    ]}
    aiList={aiList}
  />);
  expect(wrapper.find(JsBattleBattlefield)).toHaveLength(1);
  expect(wrapper.find(JsBattleBattlefield).props()).toHaveProperty('rngSeed', 787223);
  expect(wrapper.find(JsBattleBattlefield).props()).toHaveProperty('timeLimit', 12340);
  expect(wrapper.find(JsBattleBattlefield).props()).toHaveProperty('speed', 0.42);
  expect(wrapper.find(JsBattleBattlefield).props()).toHaveProperty('quality', 0.65);
  expect(wrapper.find(JsBattleBattlefield).props()).toHaveProperty('aiDefList');
  expect(wrapper.find(JsBattleBattlefield).prop('aiDefList')).toHaveLength(2);
  expect(wrapper.find(JsBattleBattlefield).prop('aiDefList')[0]).toHaveProperty('name', 'brick');
  expect(wrapper.find(JsBattleBattlefield).prop('aiDefList')[1]).toHaveProperty('name', 'moore');

});

test('restart the battle', async () => {
  const wrapper = shallow(<LeagueReplayScreen
    match={match}
    isLoading={false}
    isAuthorized={true}
    rngSeed={787223}
    timeLimit={12340}
    simQuality={0.65}
    simSpeed={0.42}
    result={[
      {name: 'alpha7638'},
      {name: 'bravo9743'},
    ]}
    aiList={aiList}
  />);

  let onRestartCallback;
  let battlefieldMock = {
    restart: jest.fn(() => {
      onRestartCallback();
    })
  };

  const restartPromise = new Promise((resolve) => {
    onRestartCallback = resolve;
  })

  wrapper.instance().battlefield = battlefieldMock

  expect(wrapper.find(JsBattleBattlefield)).toHaveLength(1);
  wrapper.find(JsBattleBattlefield).props().onFinish()

  await restartPromise;
});


test('display battle errors', async () => {
  const showError = jest.fn()
  const wrapper = shallow(<LeagueReplayScreen
    match={match}
    isLoading={false}
    isAuthorized={true}
    rngSeed={787223}
    timeLimit={12340}
    simQuality={0.65}
    simSpeed={0.42}
    result={[
      {name: 'alpha7638'},
      {name: 'bravo9743'},
    ]}
    aiList={aiList}
    showError={showError}
  />);

  expect(wrapper.find(JsBattleBattlefield)).toHaveLength(1);
  wrapper.find(JsBattleBattlefield).props().onError('Ooooops3245234')

  expect(showError.mock.calls).toHaveLength(1);
  expect(showError.mock.calls[0][0]).toBe('Ooooops3245234');
});
