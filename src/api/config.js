import axios from 'axios';

import { API_BASE_URL } from '../actions/actionTypes';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export { api };
