import React from 'react';
import {shallow} from 'enzyme';
import JsonCode from '../JsonCode.js';

test('JsonCode renders properly', () => {
  const wrapper = shallow(<JsonCode />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'pre');
});

test('format JSON', () => {
  const json = {
    "foo": "bar",
    "arr": [
      1, 2, 3,
      {"whatever": false}
    ]
  };
  const wrapper = shallow(<JsonCode data={json} />);

  expect(wrapper.text()).toBe(JSON.stringify(json, null, 2));
});

test('include var name', () => {
  const json = {"foo": "bar"};
  const wrapper = shallow(<JsonCode varName="myData" data={json} />);
  expect(wrapper.text()).toMatch(/myData =/)
});

test('highlight syntax', () => {
  const json = {
    "foo234": "bar543",
    "arr6303": [
      1, 2558837, 3,
      {"whatever5432": false}
    ],
    "nothing": [undefined, null]
  };
  let wrapper = shallow(<JsonCode highlight={true} data={json} />);

  expect(wrapper.text()).toMatch(/foo234/)
  expect(wrapper.text()).toMatch(/bar543/)
  expect(wrapper.text()).toMatch(/arr6303/)
  expect(wrapper.text()).toMatch(/2558837/)
  expect(wrapper.text()).toMatch(/whatever5432/)

});
