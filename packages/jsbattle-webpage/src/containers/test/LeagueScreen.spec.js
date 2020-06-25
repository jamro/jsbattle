import 'babel-polyfill';
import React from 'react';
import {shallow} from 'enzyme';
import {LeagueScreen} from '../LeagueScreen.js';
import Loading from '../../components/Loading.js';
import LeagueJoin from '../../components/LeagueJoin.js';
import LeagueHistory from '../../components/LeagueHistory.js';


test('show unauthorized', () => {
  const wrapper = shallow(<LeagueScreen
    isAuthorized={false}
  />);
  expect(wrapper.find('.signin-button').text()).toMatch(/sign up/i);
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
        "fights_total": 752,
        "fights_win": 341,
        "fights_lose": 236,
        "fights_error": 130,
        "score": 831
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
  expect(wrapper.find('table').find('tr').at(1).find('td').at(2).text()).toMatch(/752/i)
  expect(wrapper.find('table').find('tr').at(1).find('td').at(3).text()).toMatch(/341/i)
  expect(wrapper.find('table').find('tr').at(1).find('td').at(4).text()).toMatch(/236/i)
  expect(wrapper.find('table').find('tr').at(1).find('td').at(5).text()).toMatch(/831/i)
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

test('show history league', () => {
  const selectedId = 'qPCEf8PXtg9ptvjA'
  const history = [
    {
        id: '2Z2QACxYU2TpNBcl',
        createdAt: new Date('2020-05-29T11:10:41.188Z'),
        players: [
          {
            id: '6qQC9NGqcBSvnNON',
            name: 'jsbattle/sniper',
            winner: true
          },
          {
            id: 'a3jpQn3XPWdjgSXo',
            name: 'jsbattle/chicken',
            winner: false
          }
        ]
      },
      {
        id: 'OyEbugs7DHZQmrDJ',
        createdAt: new Date('2020-05-29T11:10:09.039Z'),
        players: [
          {
            id: 'VPclRo1HV45EX3Qr',
            name: 'jsbattle/kamikaze',
            winner: false
          },
          {
            id: 'qPCEf8PXtg9ptvjA',
            name: 'jsbattle/crazy',
            winner: false
          }
        ]
      },
      {
        id: 'csKD4nuhtoA9cFn3',
        createdAt: new Date('2020-05-29T11:09:42.653Z'),
        players: [
          {
            id: '3xQuFw0Mr7x3lTGH',
            name: 'jsbattle/dodge',
            winner: false
          },
          {
            id: 'VPclRo1HV45EX3Qr',
            name: 'jsbattle/kamikaze',
            winner: true
          }
        ]
      }
  ];

  const wrapper = shallow(<LeagueScreen
    isAuthorized={true}
    leagueHistory={history}
    submission={{id: selectedId}}
  />);

  expect(wrapper.find(LeagueHistory).props()).toHaveProperty('selectedId', selectedId);
  expect(wrapper.find(LeagueHistory).props()).toHaveProperty('data', history);

});
