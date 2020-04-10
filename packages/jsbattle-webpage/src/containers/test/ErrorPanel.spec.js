import 'babel-polyfill';
import React from 'react';
import {mount} from 'enzyme';
import {ErrorPanel} from '../ErrorPanel.js';

test('ErrorPanel renders empty properly', () => {
  const wrapper = mount(<ErrorPanel />);
  expect(wrapper.text()).toBe('');
});

test('ErrorPanel renders multiple properly', () => {
  const errors = [
    'error 435',
    'another error 64302'
  ]
  const wrapper = mount(<ErrorPanel errors={errors} />);
  expect(wrapper.text()).toMatch(/error 435/);
  expect(wrapper.text()).toMatch(/another error 64302/);
});

test('Close error', () => {
  const errors = [
    'test error'
  ];
  const clearError = jest.fn();
  const wrapper = mount(<ErrorPanel errors={errors} clearError={clearError} />);
  wrapper.find('.close').simulate('click');
  expect(clearError.mock.calls).toHaveLength(1);
  expect(clearError.mock.calls[0][0]).toBe("0");
});
