import 'babel-polyfill';
import React from 'react';
import {shallow} from 'enzyme';
import {LeagueScreen} from '../LeagueScreen.js';
import Loading from '../../components/Loading.js';
import LeagueJoin from '../../components/LeagueJoin.js';


test('show unauthorized', () => {
  const wrapper = shallow(<LeagueScreen
    isAuthorized={false}
  />);
  expect(wrapper.text()).toMatch(/not authorized/i);
});

test('show loading', () => {
  const wrapper = shallow(<LeagueScreen
    isLoading={true}
    isAuthorized={true}
  />);
  expect(wrapper.find(Loading)).toHaveLength(1);
});

test('show joining', () => {
  const wrapper = shallow(<LeagueScreen
    isJoining={true}
    isAuthorized={true}
  />);
  expect(wrapper.find(Loading)).toHaveLength(1);
});

test('list league', () => {
  const wrapper = shallow(<LeagueScreen
    isAuthorized={true}
    ranktable={[
      {
        "id": "732692345",
        "scriptId": "62456242",
        "ownerId": "76457323452",
        "ownerName": "Mar87762",
        "scriptName": "greta875",
        "joinedAt": "2020-01-28T10:27:42.940Z",
        "fights_total": 7542,
        "fights_win": 3471,
        "fights_lose": 2346,
        "fights_error": 1320,
        "score": 8351
      }
    ]}
  />);

  expect(wrapper.find('table').find('th').at(0).text()).toMatch(/rank/i)
  expect(wrapper.find('table').find('th').at(1).text()).toMatch(/name/i)
  expect(wrapper.find('table').find('th').at(2).text()).toMatch(/fights/i)
  expect(wrapper.find('table').find('th').at(3).text()).toMatch(/won/i)
  expect(wrapper.find('table').find('th').at(4).text()).toMatch(/lost/i)
  expect(wrapper.find('table').find('th').at(5).text()).toMatch(/score/i)


  expect(wrapper.find('table').find('tr').at(1).find('td').at(1).text()).toMatch(/Mar87762/i)
  expect(wrapper.find('table').find('tr').at(1).find('td').at(1).text()).toMatch(/greta875/i)
  expect(wrapper.find('table').find('tr').at(1).find('td').at(2).text()).toMatch(/7542/i)
  expect(wrapper.find('table').find('tr').at(1).find('td').at(3).text()).toMatch(/3471/i)
  expect(wrapper.find('table').find('tr').at(1).find('td').at(4).text()).toMatch(/2346/i)
  expect(wrapper.find('table').find('tr').at(1).find('td').at(5).text()).toMatch(/8351/i)
});

test('join league', () => {
  const joinLeague = jest.fn();
  const wrapper = shallow(<LeagueScreen
    isAuthorized={true}
    joinLeague={joinLeague}
  />);

  wrapper.find(LeagueJoin).props().onJoin('ID-62423523', 'robo452');

  expect(joinLeague.mock.calls).toHaveLength(1)
  expect(joinLeague.mock.calls[0][0]).toBe('ID-62423523')
  expect(joinLeague.mock.calls[0][1]).toBe('robo452')
});


test('leave league', () => {
  const leaveLeague = jest.fn();
  const wrapper = shallow(<LeagueScreen
    isAuthorized={true}
    leaveLeague={leaveLeague}
  />);

  wrapper.find(LeagueJoin).props().onLeave();

  expect(leaveLeague.mock.calls).toHaveLength(1)
});
