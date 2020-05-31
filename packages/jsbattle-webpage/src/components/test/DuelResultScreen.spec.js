import React from 'react';
import {mount} from 'enzyme';
import DuelResultScreen from '../DuelResultScreen.js';

test('renders properly with defulats', () => {
  const wrapper = mount(<DuelResultScreen />);
  expect(wrapper.render().find('.result-title').text()).toMatch(/lost/i);
  expect(wrapper.render().find('.winner-label').text()).toBe('unknown');
  expect(wrapper.render().find('.loser-label').text()).toBe('unknown');
  expect(wrapper.render().find('.winner-score').text()).toBe('0.0');
  expect(wrapper.render().find('.loser-score').text()).toBe('0.0');
  expect(wrapper.render().find('.winner-img').prop("src")).toBe(`img/tank_skin_forest.png`);
  expect(wrapper.render().find('.loser-img').prop("src")).toBe(`img/tank_skin_forest.png`);
});

test('rounds score', () => {
  let wrapper = mount(<DuelResultScreen
    winnerScore={1}
    loserScore={0}
  />);
  expect(wrapper.render().find('.winner-score').text()).toBe('1.0');
  expect(wrapper.render().find('.loser-score').text()).toBe('0.0');

  wrapper = mount(<DuelResultScreen
    winnerScore={100.00000001}
    loserScore={17.99999999}
  />);
  expect(wrapper.render().find('.winner-score').text()).toBe('100.0');
  expect(wrapper.render().find('.loser-score').text()).toBe('18.0');

  wrapper = mount(<DuelResultScreen
    winnerScore={1093.40000001}
    loserScore={43.79999999}
  />);
  expect(wrapper.render().find('.winner-score').text()).toBe('1093.4');
  expect(wrapper.render().find('.loser-score').text()).toBe('43.8');
});

test('renders winner', () => {
  const wrapper = mount(<DuelResultScreen
    hasWon={true}
    winnerName='alpha83'
    winnerScore={343.7}
    winnerSkin='lava'
    loserName='beta6'
    loserScore={62}
    loserSkin='desert'
  />);
  expect(wrapper.render().find('.result-title').text()).toMatch(/won/i);
  expect(wrapper.render().find('.winner-label').text()).toBe('alpha83');
  expect(wrapper.render().find('.loser-label').text()).toBe('beta6');
  expect(wrapper.render().find('.winner-score').text()).toBe('343.7');
  expect(wrapper.render().find('.loser-score').text()).toBe('62.0');
  expect(wrapper.render().find('.winner-img').prop("src")).toBe(`img/tank_skin_lava.png`);
  expect(wrapper.render().find('.loser-img').prop("src")).toBe(`img/tank_skin_desert.png`);
});

test('hide header', () => {
  const wrapper = mount(<DuelResultScreen
    showHeader={false}
    hasWon={true}
    winnerName='alpha83'
    winnerScore={343.7}
    winnerSkin='lava'
    loserName='beta6'
    loserScore={62}
    loserSkin='desert'
  />);
  expect(wrapper.render().find('.result-title')).toHaveLength(0);
});
