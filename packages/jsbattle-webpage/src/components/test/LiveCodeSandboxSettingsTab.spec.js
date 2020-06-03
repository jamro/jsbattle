import 'babel-polyfill';
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
    { id: 'op1',  label: 'alpha753', source: 'bundled' },
    { id: 'op2',  label: 'beta78732', source: 'league' },
    { id: 'op3',  label: 'gamma8784', source: 'league' },
  ]
  const wrapper = shallow(<LiveCodeSandboxSettingsTab
      selectedOpponent={{ id: 'op2',  label: 'beta78732', source: 'league' }}
      opponents={opponents}
    />);
  expect(wrapper.find('#category').text()).toMatch(/League/)
  expect(wrapper.find('#opponent').text()).toMatch(/beta78732/)
  expect(wrapper.find('#opponent').text()).toMatch(/gamma8784/)
  expect(wrapper.find('#opponent').props().value).toBe(1);
});

test('change opponent', async () => {
  const opponents = [
    { id: 'op532234',  label: 'alpha98324', source: 'league' },
    { id: 'op6543',  label: 'omega98324', source: 'league' },
    { id: 'op2345',  label: 'phi77532', source: 'bundled' },
    { id: 'op632243',  label: 'beta77532', source: 'bundled' },
  ];
  const onOpponentChange = jest.fn();
  const wrapper = shallow(<LiveCodeSandboxSettingsTab
      selectedOpponent={{ id: 'op532234',  label: 'alpha98324' }}
      opponents={opponents}
      onOpponentChange={onOpponentChange}
    />);
  await wrapper.find('#category').simulate('change', {target: { value : 'league'}});
  await wrapper.find('#opponent').simulate('change', {target: { value : 1}});
  expect(onOpponentChange.mock.calls).toHaveLength(2);
  expect(onOpponentChange.mock.calls[0][0]).toHaveProperty('id', 'op532234');
  expect(onOpponentChange.mock.calls[1][0]).toHaveProperty('id', 'op6543');
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
