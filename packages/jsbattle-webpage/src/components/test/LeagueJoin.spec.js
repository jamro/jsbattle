import React from 'react';
import {shallow} from 'enzyme';
import LeagueJoin from '../LeagueJoin.js';

test('Renders empty', () => {
  const wrapper = shallow(<LeagueJoin />);
  expect(wrapper.render().text()).toMatch(/JsBattle League/i);
  expect(wrapper.find("button.league-edit")).toHaveLength(1)

});

test('Try join league with empty sandbox', () => {
  const wrapper = shallow(<LeagueJoin />);
  wrapper.find('button.league-edit').simulate('click');
  expect(wrapper.render().text()).toMatch(/Create script/i);
  expect(wrapper.find("button.league-cancel")).toHaveLength(1)
  expect(wrapper.find("button.league-edit")).toHaveLength(0)
  expect(wrapper.find("button.league-join")).toHaveLength(0)

  wrapper.find('button.league-cancel').simulate('click');
  expect(wrapper.render().text()).toMatch(/JsBattle League/i);
  expect(wrapper.find("button.league-cancel")).toHaveLength(0)
  expect(wrapper.find("button.league-edit")).toHaveLength(1)
  expect(wrapper.find("button.league-join")).toHaveLength(0)
});

test('Join league', () => {
  const onJoin = jest.fn();
  const wrapper = shallow(<LeagueJoin
    onJoin={onJoin}
    tankList={[
      {id: '54235', scriptName: 'bravo974'},
      {id: '87632', scriptName: 'charlie75'}
    ]}/>);
  wrapper.find('button.league-edit').simulate('click');
  expect(wrapper.find("button.league-cancel")).toHaveLength(1)
  expect(wrapper.find("button.league-edit")).toHaveLength(0)
  expect(wrapper.find("button.league-join")).toHaveLength(1)
  expect(wrapper.find("select").find('option').at(0).text()).toMatch(/bravo974/);
  expect(wrapper.find("select").find('option').at(1).text()).toMatch(/charlie75/);

  wrapper.find("select").simulate('change',{target: { value : '87632'}});
  wrapper.find('button.league-join').simulate('click');


  expect(onJoin.mock.calls).toHaveLength(1);
  expect(onJoin.mock.calls[0][0]).toBe('87632');
  expect(onJoin.mock.calls[0][1]).toBe('charlie75');
});

test('Cancel joining league', () => {
  const onJoin = jest.fn();
  const wrapper = shallow(<LeagueJoin
    onJoin={onJoin}
    tankList={[
      {id: '54235', scriptName: 'bravo974'},
      {id: '87632', scriptName: 'charlie75'}
    ]}/>);
  wrapper.find('button.league-edit').simulate('click');
  expect(wrapper.find("button.league-cancel")).toHaveLength(1)
  expect(wrapper.find("button.league-edit")).toHaveLength(0)
  expect(wrapper.find("button.league-join")).toHaveLength(1)

  wrapper.find('button.league-cancel').simulate('click');

  expect(onJoin.mock.calls).toHaveLength(0);
});

test('Renders submission', () => {
  const wrapper = shallow(<LeagueJoin
      selected={{
        scriptName: 'alpha8664',
        joinedAt: '2020-01-02 01:02:03',
      }}
    />);
  expect(wrapper.render().text()).toMatch(/alpha8664/i);
  expect(wrapper.render().text()).toMatch(/2020-01-02 01:02:03/i);
  expect(wrapper.find("button.league-edit")).toHaveLength(1)
});

test('Leave the leauge', () => {
  const onLeave = jest.fn()
  const wrapper = shallow(<LeagueJoin
      onLeave={onLeave}
      selected={{
        scriptName: 'alpha5622',
        joinedAt: '2020-01-02 12:02:03',
      }}
    />);

  wrapper.find('button.league-edit').simulate('click');
  wrapper.find('button.league-leave').simulate('click');
  expect(onLeave.mock.calls).toHaveLength(1)
});
