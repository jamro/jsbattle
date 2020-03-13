import React from 'react';
import {mount} from 'enzyme';
import EditableText from '../EditableText.js';
import Loading from '../Loading.js';

test('enter view mode by default', () => {
  const wrapper = mount(<EditableText name="alpha"/>);
  expect(wrapper.find('.editable-text-view').text()).toEqual('alpha');
});

test('display loading', () => {
  const wrapper = mount(<EditableText loading={true}/>);
  expect(wrapper.contains(<Loading />)).toEqual(true);
});

test('switch to edit mode', () => {
  const wrapper = mount(<EditableText name="beta"/>);
  wrapper.find('.rename-button').simulate('click');
  expect(wrapper.find('.editable-text-edit').instance().value).toEqual('beta');
});

test('abort editing', () => {
  const wrapper = mount(<EditableText name="gamma"/>);
  wrapper.find('.rename-button').simulate('click');
  wrapper.find('.editable-text-edit').instance().value = 'omega'
  wrapper.find('.button-name-cancel').simulate('click');
  expect(wrapper.find('.editable-text-view').text()).toEqual('gamma');
});

test('confirm editing', () => {
  let onChange = jest.fn();
  const wrapper = mount(<EditableText name="lion" id={3} onChange={onChange}/>);
  wrapper.find('.rename-button').simulate('click');
  wrapper.find('.editable-text-edit').instance().value = 'cat'
  wrapper.find('.editable-text-edit').simulate('change', {target: {value: 'cat'}});
  wrapper.find('.button-name-confirm').simulate('click');

  expect(onChange.mock.calls.length).toBe(1);
  expect(onChange.mock.calls[0][0]).toBe('cat');
  expect(onChange.mock.calls[0][1]).toBe(3);
});
