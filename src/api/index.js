import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const baseURL = isProd ? 'http://services.lxzmww.xyz/news' : 'http://localhost:4001/';
const fetch = axios.create({
  baseURL
});

export function fetchNews(type, page) {
  return fetch.get('/api/get', {
    params: {
      page,
      type
    }
  });
}