import React from 'react';
import expect from 'expect';
import {mount, configure} from 'enzyme';
import { render } from "@testing-library/react";

import {BlogList} from './index';
// setup enzyme
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

configure({ adapter: new Adapter() });


describe('With React Testing Library', () => {
  it('sets renders Reddit Posts in title', () => {
    const props = {
      posts:{loading: false, data: [], selected: {}}
    };
    const mockStore = configureStore()
    let store
    store = mockStore(props)
    const { getByText } = render(<Provider store={store}><BlogList /></Provider>)
    expect(getByText('Reddit Posts')).not.toBeNull()
  });
});

describe('With Enzyme Library', () => {
  it('sets renders Reddit Posts in title', () => {
    const props = {
      posts:{loading: false, data: [], selected: {}}
    };
    const mockStore = configureStore()
    let store,wrapper
    store = mockStore(props)

    wrapper = mount(<Provider store={store}>
      <BlogList />
    </Provider>);
    expect(wrapper.find('BlogList').find('h6').text()).toBe('Reddit Posts')
  })
})