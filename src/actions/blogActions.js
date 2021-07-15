import { FETCH_BLOGS, SELECTED_BLOG, DISMISS_POST, DISMISS_ALL } from '../actions/actionTypes';
import { getPosts } from '../api';

export const fetchPosts = params => ({
  type: FETCH_BLOGS,
  payload: getPosts(params),
});

export const selectPost = post => ({
  type: SELECTED_BLOG,
  payload: { post },
});

export const dismiss = id => ({
  type: DISMISS_POST,
  payload: { id },
});

export const dismissAll = () => ({
  type: DISMISS_ALL,
});
