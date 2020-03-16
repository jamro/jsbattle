import React from 'react';
import {shallow} from 'enzyme';
import LiveCodeInfoTab from '../LiveCodeInfoTab.js';

test('LiveCodeInfoTab renders properly', () => {
  const wrapper = shallow(<LiveCodeInfoTab />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
  expect(wrapper.find('.start-coding-button')).toHaveLength(1);
});

test('contains info data', () => {
  const wrapper = shallow(<LiveCodeInfoTab info={"some help data \n with ![image](img.png), ![image2](img2.png) and [link](more.html) included"}/>);

  const imgLinks = [];
  const imgTags = wrapper.find('img');
  for(let i=0; i < imgTags.length; i++ ) {
    imgLinks.push(imgTags.get(i).props.src);
  }
  const aLinks = [];
  const aTags = wrapper.find('a');
  for(let i=0; i < aTags.length; i++ ) {
    aLinks.push(aTags.get(i).props.href);
  }

  expect(wrapper.text()).toMatch(/some help data.*included/);
  expect(imgLinks).toContain('img.png')
  expect(imgLinks).toContain('img2.png')
  expect(aLinks).toContain('more.html')
  expect(wrapper.find('.start-coding-button')).toHaveLength(1);
  expect(wrapper.find('br')).toHaveLength(1);
});

test('skip info', () => {
  const onSkip = jest.fn();
  const wrapper = shallow(<LiveCodeInfoTab onSkip={onSkip}/>);
  wrapper.find('.start-coding-button').simulate('click');
  expect(onSkip.mock.calls).toHaveLength(1)
});
