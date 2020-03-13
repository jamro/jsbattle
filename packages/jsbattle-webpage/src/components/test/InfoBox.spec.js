import React from 'react';
import {shallow} from 'enzyme';
import InfoBox from '../InfoBox.js';

test('InfoBox renders properly', () => {
  const wrapper = shallow(<InfoBox />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
  expect(wrapper.find('.alert').text()).toMatch(/oh snap/i)
});

test('renders children', () => {
  const wrapper = shallow(<InfoBox><div id="testChild">hello73425</div></InfoBox>);
  expect(wrapper.find('#testChild').text()).toBe('hello73425')
  expect(wrapper.find('.alert').text()).toMatch(/hello73425/)
});

test('display title & message', () => {
  const wrapper = shallow(<InfoBox title="critical94473" message="error9473452"/>);
  expect(wrapper.find('.alert').text()).toMatch(/error9473452/)
  expect(wrapper.find('.alert').text()).toMatch(/critical94473/)
});

test('supports error levels', () => {
  let wrapper = shallow(<InfoBox/>);
  expect(wrapper.find('.alert-error')).toHaveLength(1);

  wrapper = shallow(<InfoBox level="warn"/>);
  expect(wrapper.find('.alert-warn')).toHaveLength(1);

  wrapper = shallow(<InfoBox level="info"/>);
  expect(wrapper.find('.alert-info')).toHaveLength(1);
});
