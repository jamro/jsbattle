import React from 'react';
import {shallow, mount} from 'enzyme';
import LiveCodeCodeTab from '../LiveCodeCodeTab.js';

test('LiveCodeCodeTab renders properly', () => {
  const wrapper = shallow(<LiveCodeCodeTab />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
});

test('trigger on change', () => {
  const onChange = jest.fn();
  const wrapper = mount(<LiveCodeCodeTab onChange={onChange} />);

  wrapper.find('textarea.code-editor').simulate("change", {target: {value: 'My new code #1'}});

  expect(onChange.mock.calls.length).toBe(1);
  expect(onChange.mock.calls[0][0]).toBe('My new code #1');
});
