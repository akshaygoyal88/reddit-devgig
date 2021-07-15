import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import {fetchPosts} from '../actions/blogActions'

const initialState = { loading: false, data: [], selected: {} };

describe('Store', function() {
  it('Should trigger actions FETCH_BLOG', function() {
    // arrange
    const store = createStore(rootReducer, {});

    // act
    const action = fetchPosts();
    store.dispatch(action);

    // assert
    const actual = store.getState().posts.data;
    expect(actual).toEqual(initialState.data);
  });
});
