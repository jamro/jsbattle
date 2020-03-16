import React from 'react';
import {shallow} from 'enzyme';
import ScriptTableRow from '../ScriptTableRow.js';
import {Link} from 'react-router-dom';

test('ScriptTableRow renders properly', () => {
  const wrapper = shallow(<ScriptTableRow />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'tr');
});

test('display name', () => {
  const wrapper = shallow(<ScriptTableRow name="name85923452" />);
  expect(wrapper.text()).toMatch(/name85923452/);
});

test('blink at start', async () => {
  const wrapper = shallow(<ScriptTableRow />);

  let color;
  let newColor;
  color = parseInt(wrapper.prop('style').backgroundColor.substr(1), 16);
  while(wrapper.prop('style') && wrapper.prop('style').backgroundColor != '#ffffff') {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if(!wrapper.prop('style')) {
      break;
    }
    newColor = parseInt(wrapper.prop('style').backgroundColor.substr(1), 16);
    expect(newColor).toBeGreaterThan(color)
    color = newColor;
  }
  expect(wrapper.prop('style')).toBe(null)
});

test('display difficulty', () => {
  let wrapper;
  for(let i=0; i < 10; i++) {
    wrapper = shallow(<ScriptTableRow difficulty={i} />);
    expect(wrapper.find('.fa-star')).toHaveLength(i);
  }
});

test('display link', () => {
  const wrapper = shallow(<ScriptTableRow link="link89723434" />);
  expect(wrapper.find(Link).prop('to')).toBe('link89723434')
});


test('delete row', () => {
  const onDelete = jest.fn();
  const wrapper = shallow(<ScriptTableRow id="name9834" onDelete={onDelete} id="id-88734"/>);
  wrapper.find('.tank-remove').simulate('click');
  wrapper.find('.tank-remove-confirm-no').simulate('click');

  expect(wrapper.find('.tank-remove-confirm-no')).toHaveLength(0);
  expect(onDelete.mock.calls).toHaveLength(0);

  wrapper.find('.tank-remove').simulate('click');
  wrapper.find('.tank-remove-confirm-yes').simulate('click');

  expect(wrapper.find('.tank-remove-confirm-yes')).toHaveLength(0);
  expect(onDelete.mock.calls).toHaveLength(1);
  expect(onDelete.mock.calls[0][0]).toBe('id-88734');

});
