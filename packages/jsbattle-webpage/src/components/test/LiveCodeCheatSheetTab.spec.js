import React from 'react';
import {shallow} from 'enzyme';
import LiveCodeCheatSheetTab from '../LiveCodeCheatSheetTab.js';

test('LiveCodeCheatSheetTab renders properly', () => {
  const wrapper = shallow(<LiveCodeCheatSheetTab />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
  expect(wrapper.render().text()).toMatch(/SKIN/);
  expect(wrapper.render().text()).toMatch(/THROTTLE/);
  expect(wrapper.render().text()).toMatch(/BOOST/);
  expect(wrapper.render().text()).toMatch(/TURN/);
  expect(wrapper.render().text()).toMatch(/DEBUG/);
  expect(wrapper.render().text()).toMatch(/targetingAlarm/);
  expect(wrapper.render().text()).toMatch(/wallDistance/);
  expect(wrapper.render().text()).toMatch(/mates/);
});
