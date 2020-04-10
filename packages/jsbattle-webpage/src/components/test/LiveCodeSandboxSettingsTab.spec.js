import React from 'react';
import {shallow} from 'enzyme';
import LiveCodeSandboxSettingsTab from '../LiveCodeSandboxSettingsTab.js';

test('LiveCodeSandboxSettingsTab renders properly', () => {
  const wrapper = shallow(<LiveCodeSandboxSettingsTab />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
  expect(wrapper.find('#opponent')).toHaveLength(1);
});

test('list opponents', () => {
  const opponents = [
    { id: 'op1',  scriptName: 'alpha753' },
    { id: 'op2',  scriptName: 'beta78732' }
  ]
  const wrapper = shallow(<LiveCodeSandboxSettingsTab
      selectedOpponent="op2"
      opponents={opponents}
    />);
  expect(wrapper.find('#opponent').text()).toMatch(/alpha753/)
  expect(wrapper.find('#opponent').text()).toMatch(/beta78732/)
  expect(wrapper.find('#opponent').props().value).toBe('op2');
});

test('change opponent', () => {
  const opponents = [
    { id: 'op532234',  scriptName: 'alpha98324' },
    { id: 'op632243',  scriptName: 'beta77532' }
  ];
  const onOpponentChange = jest.fn();
  const wrapper = shallow(<LiveCodeSandboxSettingsTab
      selectedOpponent="op532234"
      opponents={opponents}
      onOpponentChange={onOpponentChange}
    />);
  wrapper.find('#opponent').simulate('change', {target: { value : 'op632243'}});
  expect(onOpponentChange.mock.calls).toHaveLength(1);
  expect(onOpponentChange.mock.calls[0][0]).toBe('op632243');
});

test('change mode', () => {
  const onBattleModeChange = jest.fn();
  const wrapper = shallow(<LiveCodeSandboxSettingsTab
      mode='duel'
      onBattleModeChange={onBattleModeChange}
    />);
  wrapper.find('#mode').simulate('change', {target: { value : 'duel'}});
  expect(onBattleModeChange.mock.calls).toHaveLength(1);
  expect(onBattleModeChange.mock.calls[0][0]).toBe(false);

  onBattleModeChange.mockReset();
  wrapper.find('#mode').simulate('change', {target: { value : 'team'}});
  expect(onBattleModeChange.mock.calls).toHaveLength(1);
  expect(onBattleModeChange.mock.calls[0][0]).toBe(true);
});

test('lock rng', () => {
  const onRngLock = jest.fn();
  const wrapper = shallow(<LiveCodeSandboxSettingsTab
      onRngLock={onRngLock}
    />);
  wrapper.find('#lock').simulate('change', {target: { checked : true}});
  expect(onRngLock.mock.calls).toHaveLength(1);
  expect(onRngLock.mock.calls[0][0]).toBe(true);

  onRngLock.mockReset();
wrapper.find('#lock').simulate('change', {target: { checked : false}});
expect(onRngLock.mock.calls).toHaveLength(1);
expect(onRngLock.mock.calls[0][0]).toBe(false);

});
