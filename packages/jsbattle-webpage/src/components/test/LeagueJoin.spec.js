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
        scriptId: '65262326234',
        scriptName: 'alpha8664',
        joinedAt: '2020-11-29 01:02:03',
        latest: true,
        history: [
          {
            id: '324534',
            opponent: {
              id: '5234523465',
              name: 'oponent11108432'
            },
            winner: false
          },
          {
            id: '998523',
            opponent: {
              id: '65343402',
              name: 'oponent222854923'
            },
            winner: true
          }
        ]
      }}
    />);
  expect(wrapper.find('.script-link').props()).toHaveProperty('href');
  expect(wrapper.find('.new-version-badge')).toHaveLength(0);
  expect(wrapper.find('a.script-link').prop('href')).toMatch(/65262326234/);
  expect(wrapper.render().text()).toMatch(/alpha8664/i);
  expect(wrapper.render().text()).toMatch(/2020/i);
  expect(wrapper.render().text()).toMatch(/11/i);
  expect(wrapper.render().text()).toMatch(/29/i);
  expect(wrapper.render().text()).toMatch(/02:03/i);
  expect(wrapper.find("button.league-edit")).toHaveLength(1)

  expect(wrapper.find(".submission-history-item")).toHaveLength(2);
  expect(wrapper.find(".submission-history-item").at(0).props()).toHaveProperty('href', '#/league/replay/324534');
  expect(wrapper.find(".submission-history-item").at(0).props()).toHaveProperty('title', 'oponent11108432');
  expect(wrapper.find(".submission-history-item").at(1).props()).toHaveProperty('href', '#/league/replay/998523');
  expect(wrapper.find(".submission-history-item").at(1).props()).toHaveProperty('title', 'oponent222854923');

  expect(wrapper.find(".submission-history-item").at(0).find('i').prop('className')).toMatch(/skull/);
  expect(wrapper.find(".submission-history-item").at(1).find('i').prop('className')).toMatch(/trophy/);
});

test('Renders new version badge', () => {
  const wrapper = shallow(<LeagueJoin
      selected={{
        scriptId: '65262326234',
        scriptName: 'alpha8664',
        joinedAt: '2020-11-29 01:02:03',
        latest: false,
        history: []
      }}
    />);

  expect(wrapper.find('.new-version-badge')).toHaveLength(1);
  wrapper.find('.new-version-badge').simulate('click');
  expect(wrapper.find("button.league-leave")).toHaveLength(1);
});

test('Leave the leauge', () => {
  const onLeave = jest.fn()
  const wrapper = shallow(<LeagueJoin
      onLeave={onLeave}
      selected={{
        scriptName: 'alpha5622',
        joinedAt: '2020-01-02 12:02:03',
        history: []
      }}
    />);

  wrapper.find('button.league-edit').simulate('click');
  wrapper.find('button.league-leave').simulate('click');
  expect(onLeave.mock.calls).toHaveLength(1)
});
