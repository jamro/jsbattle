import 'babel-polyfill';
import React from 'react';
import {shallow} from 'enzyme';
import {SandboxScreen} from '../SandboxScreen.js';
import LiveCode from '../../components/LiveCode.js';
import EditableText from '../../components/EditableText.js';
import DuelResultScreen from '../../components/DuelResultScreen.js';

const match = {
  params: {
    id: 'challenge-24634'
  }
}

const userOpponent = {
  type: 'user',
  name: "opponent83",
  code: "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });",
}

const script = {
  id: '1234',
  scriptName: 'examplescript843435',
  code: '// my code comes here 623482340',
}

test('SandboxScreen renders properly', () => {
  const wrapper = shallow(<SandboxScreen
    match={match}
    script={script}
    logging={false}
  />);
  expect(wrapper.find('.breadcrumb').text()).toMatch(/Sandbox/);
  expect(wrapper.find('.breadcrumb').find(EditableText).render().text()).toMatch(new RegExp(script.scriptName));
  expect(wrapper.find(LiveCode).prop('code')).toBe(script.code)
  expect(wrapper.find(LiveCode).prop('name')).toBe(script.scriptName);
});

test('display loading', () => {
  let wrapper = shallow(
    <SandboxScreen
      match={match}
      isLoading={true}
      logging={false}
    />
  );
  expect(wrapper.find(LiveCode).prop('isLoading')).toBe(true);

  wrapper = shallow(
    <SandboxScreen
      match={match}
      isLoading={false}
      logging={false}
    />
  );
  expect(wrapper.find(LiveCode).prop('isLoading')).toBe(false);
});

test('restarts the battle', async () => {
  const wrapper = shallow(<SandboxScreen
    match={match}
    script={script}
    logging={false}
  />);
  const liveCode = {
    restartBattle: jest.fn()
  }
  wrapper.instance().liveCode = { current: liveCode }
  wrapper.find('.restart-sandbox-battle').simulate('click');
  expect(liveCode.restartBattle.mock.calls).toHaveLength(1);

  wrapper.find('.restart-battle').simulate('click');
  expect(liveCode.restartBattle.mock.calls).toHaveLength(2);
});

test('edit code', async () => {
  const updateCode = jest.fn()
  const wrapper = shallow(<SandboxScreen
    match={match}
    script={script}
    logging={false}
    updateAiScript={updateCode}
  />);
  wrapper.find(LiveCode).props().onCodeChanged('new code 34523');

  expect(updateCode.mock.calls).toHaveLength(1);
  expect(updateCode.mock.calls[0][0]).toBe(script.id);
  expect(updateCode.mock.calls[0][1]).toBe('new code 34523');
});

test('win duel', async () => {
  const wrapper = shallow(
      <SandboxScreen
        match={match}
        script={script}
        mode="duel"
        logging={false}
      />
  );
  wrapper.find(LiveCode).props().onFinish({
    tankList: [
      {name: "examplescript843435", score: 12},
      {name: "opponent83", score: 11}
    ]
  });

  expect(wrapper.find(DuelResultScreen)).toHaveLength(1);
  expect(wrapper.find(DuelResultScreen).prop('hasWon')).toBe(true);
  expect(wrapper.find(DuelResultScreen).prop('winnerName')).toBe("examplescript843435");
  expect(wrapper.find(DuelResultScreen).prop('loserName')).toBe("opponent83");
  expect(wrapper.find(DuelResultScreen).prop('winnerScore')).toBe(12);
  expect(wrapper.find(DuelResultScreen).prop('loserScore')).toBe(11);
});

test('win team match', async () => {
  const wrapper = shallow(
      <SandboxScreen
        match={match}
        script={script}
        mode="team"
        logging={false}
      />
  );
  wrapper.find(LiveCode).props().onFinish({
    teamList: [
      {name: "examplescript843435", score: 12, members: [ {} ]},
      {name: "opponent83", score: 11, members: [ {} ]}
    ]
  });

  expect(wrapper.find(DuelResultScreen)).toHaveLength(1);
  expect(wrapper.find(DuelResultScreen).prop('hasWon')).toBe(true);
  expect(wrapper.find(DuelResultScreen).prop('winnerName')).toBe("examplescript843435");
  expect(wrapper.find(DuelResultScreen).prop('loserName')).toBe("opponent83");
  expect(wrapper.find(DuelResultScreen).prop('winnerScore')).toBe(12);
  expect(wrapper.find(DuelResultScreen).prop('loserScore')).toBe(11);
});

test('lose duel', async () => {
  const wrapper = shallow(
      <SandboxScreen
        match={match}
        script={script}
        mode="duel"
        logging={false}
      />
  );
  wrapper.find(LiveCode).props().onFinish({
    tankList: [
      {name: "examplescript843435", score: 23},
      {name: "opponent83", score: 324}
    ]
  });

  expect(wrapper.find(DuelResultScreen)).toHaveLength(1);
  expect(wrapper.find(DuelResultScreen).prop('hasWon')).toBe(false);
  expect(wrapper.find(DuelResultScreen).prop('loserName')).toBe("examplescript843435");
  expect(wrapper.find(DuelResultScreen).prop('winnerName')).toBe("opponent83");
  expect(wrapper.find(DuelResultScreen).prop('loserScore')).toBe(23);
  expect(wrapper.find(DuelResultScreen).prop('winnerScore')).toBe(324);
});

test('lose team match', async () => {
  const wrapper = shallow(
      <SandboxScreen
        match={match}
        script={script}
        mode="team"
        logging={false}
      />
  );
  wrapper.find(LiveCode).props().onFinish({
    teamList: [
      {name: "examplescript843435", score: 23, members: [ {} ]},
      {name: "opponent83", score: 324, members: [ {} ]}
    ]
  });

  expect(wrapper.find(DuelResultScreen)).toHaveLength(1);
  expect(wrapper.find(DuelResultScreen).prop('hasWon')).toBe(false);
  expect(wrapper.find(DuelResultScreen).prop('loserName')).toBe("examplescript843435");
  expect(wrapper.find(DuelResultScreen).prop('winnerName')).toBe("opponent83");
  expect(wrapper.find(DuelResultScreen).prop('loserScore')).toBe(23);
  expect(wrapper.find(DuelResultScreen).prop('winnerScore')).toBe(324);
});


test('enable logging', () => {
  let logOrig = console.log;
  console.log = jest.fn();

  shallow(
    <SandboxScreen
      match={match}
    />
  );
  expect(console.log.mock.calls.length).toBeGreaterThan(0)

  console.log.mockReset();
  shallow(
    <SandboxScreen
      match={match}
      logging={false}
    />
  );
  expect(console.log.mock.calls.length).toBe(0)

  console.log.mockReset();
  shallow(
    <SandboxScreen
      match={match}
      logging={true}
    />
  );

  expect(console.log.mock.calls.length).toBeGreaterThan(0)

  console.log = logOrig
});

test('change opponent', () => {
  const opponent = {
    source: 'local_user',
    name: 'op8874',
    code: '// code'
  }
  const opponent2 = {
    source: 'bundled',
    name: 'bu76644'
  }
  const wrapper = shallow(<SandboxScreen
    match={match}
    script={script}
    logging={false}
    opponent={opponent}
  />);

  wrapper.setProps({opponent: opponent2})

  expect(wrapper.instance().aiDefList[0].name).toBe('bu76644')
});

test('notify opponent change', () => {
  const setSandboxOpponent = jest.fn();
  const wrapper = shallow(<SandboxScreen
    match={match}
    script={script}
    logging={false}
    setSandboxOpponent={setSandboxOpponent}
  />);
  wrapper.instance().onOpponentChange({source: 'bundled', id: 'op4352'});
  expect(setSandboxOpponent.mock.calls).toHaveLength(1);
  expect(setSandboxOpponent.mock.calls[0][0]).toBe('bundled');
  expect(setSandboxOpponent.mock.calls[0][1]).toBe('op4352');
});

test('rename script', () => {
  const renameAiScript= jest.fn();
  const wrapper = shallow(<SandboxScreen
    match={match}
    script={script}
    logging={false}
    renameAiScript={renameAiScript}
  />);
  wrapper.find('.breadcrumb').find(EditableText).props().onChange('name345', 'id5432');
  expect(renameAiScript.mock.calls).toHaveLength(1);
  expect(renameAiScript.mock.calls[0][0]).toBe('name345');
  expect(renameAiScript.mock.calls[0][1]).toBe('id5432');
});
