import React from 'react';
import {shallow} from 'enzyme';
import Avatar from '../Avatar.js';

test('Loading renders properly', () => {
  const defaultAvatar = shallow(<Avatar />);
  expect(defaultAvatar.html()).toMatch(/fa-user/);

  const userAvatar = shallow(<Avatar img='user' />);
  expect(userAvatar.html()).toMatch(/fa-user/);

  const unknownAvatar = shallow(<Avatar img='sdfasdf' />);
  expect(unknownAvatar.html()).toMatch(/fa-user/);

  const adminAvatar = shallow(<Avatar img='admin' />);
  expect(adminAvatar.html()).toMatch(/fa-user-cog/);
});
