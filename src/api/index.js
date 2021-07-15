import { BLOGS_LIMIT_PER_PAGE } from '../actions/actionTypes';
import { api } from './config';

export function getPosts(params = {}) {
  return api.get('r/all/top.json', { params: { ...params, limit: BLOGS_LIMIT_PER_PAGE } });
}
