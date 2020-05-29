import React from 'react';
import {shallow} from 'enzyme';
import LeagueHistory from '../LeagueHistory.js';

test('Renders empty', () => {
  const wrapper = shallow(<LeagueHistory />);
  expect(wrapper.render().text()).toMatch(/Recent fights/i);
  expect(wrapper.render().text()).toMatch(/has not started/i);

});

test('list battles', () => {
  const selectedId = 'qPCEf8PXtg9ptvjA'
  const data = [
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
  const wrapper = shallow(<LeagueHistory
    data={data}
    selectedId={selectedId}
  />);
  expect(wrapper.find('tr').at(0).text()).toMatch(/[0-9]:[0-9]{2}:[0-9]{2}/i)
  expect(wrapper.find('tr').at(1).text()).toMatch(/[0-9]:[0-9]{2}:[0-9]{2}/i)
  expect(wrapper.find('tr').at(2).text()).toMatch(/[0-9]:[0-9]{2}:[0-9]{2}/i)

  expect(wrapper.find('tr').at(0).text()).toMatch(/jsbattle\/sniper/i)
  expect(wrapper.find('tr').at(0).text()).toMatch(/jsbattle\/chicken/i)
  expect(wrapper.find('tr').at(1).text()).toMatch(/jsbattle\/kamikaze/i)
  expect(wrapper.find('tr').at(1).text()).toMatch(/jsbattle\/crazy/i)
  expect(wrapper.find('tr').at(2).text()).toMatch(/jsbattle\/dodge/i)
  expect(wrapper.find('tr').at(2).text()).toMatch(/jsbattle\/kamikaze/i)

  expect(wrapper.find('tr').at(0).find('i').at(0).prop('className')).toMatch(/trophy/i);
  expect(wrapper.find('tr').at(0).find('i').at(1).prop('className')).toMatch(/skull/i);
  expect(wrapper.find('tr').at(1).find('i').at(0).prop('className')).toMatch(/skull/i);
  expect(wrapper.find('tr').at(1).find('i').at(1).prop('className')).toMatch(/skull/i);
  expect(wrapper.find('tr').at(2).find('i').at(0).prop('className')).toMatch(/skull/i);
  expect(wrapper.find('tr').at(2).find('i').at(1).prop('className')).toMatch(/trophy/i);

  expect(wrapper.find('tr').at(0).prop('style')).not.toHaveProperty('backgroundColor');
  expect(wrapper.find('tr').at(1).prop('style')).toHaveProperty('backgroundColor');
  expect(wrapper.find('tr').at(2).prop('style')).not.toHaveProperty('backgroundColor');
});
