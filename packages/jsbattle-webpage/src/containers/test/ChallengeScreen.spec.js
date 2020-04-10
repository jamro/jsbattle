import 'babel-polyfill';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {ChallengeScreen} from '../ChallengeScreen.js';
import LiveCode from '../../components/LiveCode.js';
import Loading from '../../components/Loading.js';
import { BrowserRouter as Router } from 'react-router-dom';

const dummyAiDef = {
  "source": "code",
  "name": "dummy",
  "code": "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });",
}

const match = {
  params: {
    id: 'challenge-24634'
  }
}

const currentChallenge = {
  id: 'challenge-24634',
  level: 2,
  name: 'Challenge name 879234',
  code: '// code 892435256423',
  description: 'description of challange: 892374912',
  aiDefList: [dummyAiDef]
};

test('ChallengeScreen renders properly without params', () => {
  const wrapper = shallow(
    <ChallengeScreen
      match={match}
      logging={false}
    />
  );
  expect(wrapper.find(LiveCode)).toHaveLength(1);
  expect(wrapper.find('.breadcrumb').text()).toMatch(/Challenges/);
});

test('enable logging', () => {
  let logOrig = console.log;
  console.log = jest.fn();

  shallow(
      <ChallengeScreen
        match={match}
        currentChallenge={currentChallenge}
        renderer="void"
      />
  );
  expect(console.log.mock.calls.length).toBeGreaterThan(0)

  console.log.mockReset();
  shallow(
      <ChallengeScreen
        match={match}
        currentChallenge={currentChallenge}
        renderer="void"
        logging={false}
      />
  );
  expect(console.log.mock.calls.length).toBe(0)

  console.log.mockReset();
  shallow(
      <ChallengeScreen
        match={match}
        currentChallenge={currentChallenge}
        renderer="void"
        logging={true}
      />
  );

  expect(console.log.mock.calls.length).toBeGreaterThan(0)

  console.log = logOrig
});

test('display loading', () => {
  const wrapper = shallow(
    <ChallengeScreen
      match={match}
      isLoading={true}
      logging={false}
    />
  );
  expect(wrapper.find(Loading)).toHaveLength(1);
  expect(wrapper.text()).not.toMatch(/Challenges/);
});

test('Challenge unavailable', () => {
  const wrapper = shallow(
    <ChallengeScreen
      match={match}
      currentChallenge={null}
      logging={false}
    />
  );
  expect(wrapper.find('.breadcrumb').text()).toMatch(/Challenge unavailable/);
});


test('ChallengeScreen renders properly', () => {
  const wrapper = shallow(
    <ChallengeScreen
      match={match}
      currentChallenge={currentChallenge}
      logging={false}
    />
  );
  expect(wrapper.find('.breadcrumb').text()).toMatch(/Challenges/);
  expect(wrapper.find('.breadcrumb').text()).toMatch(new RegExp(`Level ${currentChallenge.level}`));
  expect(wrapper.find('.breadcrumb').text()).toMatch(new RegExp(currentChallenge.name));
  expect(wrapper.find(LiveCode).prop('code')).toBe(currentChallenge.code)
  expect(wrapper.find(LiveCode).prop('info')).toBe(currentChallenge.description)
});

test('restarts the battle', async () => {
  const wrapper = shallow(
      <ChallengeScreen
        match={match}
        currentChallenge={currentChallenge}
        renderer="void"
        logging={false}
      />
  );
  const liveCode = {
    restartBattle: jest.fn()
  }
  wrapper.instance().liveCode = { current: liveCode }
  wrapper.find('.restart-challenge-battle').simulate('click');

  expect(liveCode.restartBattle.mock.calls).toHaveLength(1);
});

test('edit code', async () => {
  const updateChallengeCode = jest.fn()
  const wrapper = shallow(
      <ChallengeScreen
        match={match}
        currentChallenge={currentChallenge}
        renderer="void"
        updateChallengeCode={updateChallengeCode}
        logging={false}
      />
  );
  wrapper.find(LiveCode).props().onCodeChanged('new code 34523');

  expect(updateChallengeCode.mock.calls).toHaveLength(1);
  expect(updateChallengeCode.mock.calls[0][0]).toBe(currentChallenge.id);
  expect(updateChallengeCode.mock.calls[0][1]).toBe('new code 34523');
});

test('win battle', async () => {
  const completeChallenge = jest.fn()
  const wrapper = shallow(
      <ChallengeScreen
        match={match}
        currentChallenge={currentChallenge}
        renderer="void"
        completeChallenge={completeChallenge}
        logging={false}
      />
  );
  wrapper.find(LiveCode).props().onFinish({
    tankList: [
      {name: "player", energy: 100},
      {name: "opponent", energy: 0}
    ]
  });

  expect(completeChallenge.mock.calls).toHaveLength(1)
  expect(completeChallenge.mock.calls[0][0]).toBe(currentChallenge.id);

});


test('lose battle', async () => {
  const completeChallenge = jest.fn()
  const wrapper = shallow(
      <ChallengeScreen
        match={match}
        currentChallenge={currentChallenge}
        renderer="void"
        completeChallenge={completeChallenge}
        logging={false}
      />
  );
  const liveCode = {
    restartBattle: jest.fn()
  }
  wrapper.instance().liveCode = { current: liveCode }

  wrapper.find(LiveCode).props().onFinish({
    tankList: [
      {name: "player", energy: 0},
      {name: "opponent", energy: 100}
    ]
  });

  expect(completeChallenge.mock.calls).toHaveLength(0)
  expect(liveCode.restartBattle.mock.calls).toHaveLength(1);

});

test('disable sandbox', () => {
  let warnOrig = console.warn;
  console.warn = jest.fn();
  const wrapper = shallow(
    <ChallengeScreen
      match={match}
      currentChallenge={currentChallenge}
      logging={false}
      disableSandbox={true}
    />
  );
  const log = console.warn.mock.calls.map((call) => call.join(" ")).join(" ")
  expect(log).toMatch(/disabling sanboxing/i);

  console.warn = warnOrig;
});
