import { FETCH_BLOGS, SELECTED_BLOG } from '../actions/actionTypes';
import { getPosts } from '../api';

export const fetchPosts = params => ({
  type: FETCH_BLOGS,
  payload: getPosts(params),
});

export const selectPost = post => ({
  type: SELECTED_BLOG,
  payload: { post },
});
