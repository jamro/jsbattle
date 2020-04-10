import 'babel-polyfill';
import React from 'react';
import {shallow} from 'enzyme';
import {Navi} from '../Navi.js';
import Loading from '../../components/Loading.js';

test('Navi renders properly', () => {
  const location = {
    pathname: '/challenge'
  }
  const wrapper = shallow(<Navi location={location}/>);
  expect(wrapper.text()).toMatch(/Challenges/)
  expect(wrapper.text()).toMatch(/Sandbox/)
  expect(wrapper.text()).toMatch(/Docs/)
});

test('displays loading', () => {
  const location = {
    pathname: '/challenge'
  }
  const wrapper = shallow(<Navi location={location} isLoading={true}/>);
  expect(wrapper.find(Loading)).toHaveLength(1)
});

test('activate links', () => {
  const location = {
    pathname: '/challenge'
  }
  let wrapper = shallow(<Navi location={location}/>);
  expect(wrapper.find('.nav-item .active').text()).toMatch(/Challenges/);

  location.pathname = '/sandbox'
  wrapper = shallow(<Navi location={location}/>);
  expect(wrapper.find('.nav-item .active').text()).toMatch(/Sandbox/);
});

test('log route changes', () => {
  let logOrig = console.log;
  let log = [];
  console.log = (msg) => {
    log.push(msg);
  }

  const location1 = {
    pathname: '/challenge'
  };
  const location2 = {
    pathname: '/sanbox'
  };
  const wrapper = shallow(<Navi location={location1}/>);
  wrapper.setProps({location: location2})
  expect(log.filter((line) => line == 'Route changed: /sanbox')).toHaveLength(1);
  console.log = logOrig;
});

test('Change sim speed', () => {
  const location = {
    pathname: '/challenge'
  }
  const setSimSpeed = jest.fn();
  let wrapper = shallow(<Navi location={location} setSimSpeed={setSimSpeed}/>);

  const levels = [
    {selector: '.sim-speed-50',  pattern: /^\s*Super Fast\s*$/i,  value: 50},
    {selector: '.sim-speed-2',   pattern: /^\s*Fast\s*$/i,  value: 2},
    {selector: '.sim-speed-1',   pattern: /^\s*Normal\s*$/i,  value: 1},
    {selector: '.sim-speed-0_3', pattern: /^\s*Slow\s*$/i,  value: 0.3},
    {selector: '.sim-speed-0_05',pattern: /^\s*Super Slow\s*$/i,  value: 0.05},
  ]

  for(let level of levels) {
    wrapper.find('.sim-speed-button').simulate('click');
    wrapper.find(level.selector).simulate('click');
    expect(setSimSpeed.mock.calls).toHaveLength(1)
    expect(setSimSpeed.mock.calls[0][0]).toBe(level.value);
    wrapper.setProps({simSpeed: level.value})
    expect(wrapper.find('.sim-speed-button').text()).toMatch(level.pattern);
    setSimSpeed.mockReset();
  }

});

test('Change sim quiality', () => {
  const location = {
    pathname: '/challenge'
  }
  const setSimQuality = jest.fn();
  let wrapper = shallow(<Navi location={location} setSimQuality={setSimQuality}/>);

  const levels = [
    {selector: '.sim-quality-auto', pattern: /^\s*Auto\s*$/i,    value: 'auto'},
    {selector: '.sim-quality-0',    pattern: /^\s*Low\s*$/i,     value: 0},
    {selector: '.sim-quality-0_5',  pattern: /^\s*Normal\s*$/i,  value: 0.5},
    {selector: '.sim-quality-1',    pattern: /^\s*High\s*$/i,    value: 1.0},
  ]

  for(let level of levels) {
    wrapper.find('.sim-quality-button').simulate('click');
    wrapper.find(level.selector).simulate('click');
    expect(setSimQuality.mock.calls).toHaveLength(1)
    expect(setSimQuality.mock.calls[0][0]).toBe(level.value);
    wrapper.setProps({simQuality: level.value})
    expect(wrapper.find('.sim-quality-button').text()).toMatch(level.pattern);
    setSimQuality.mockReset();
  }

});
