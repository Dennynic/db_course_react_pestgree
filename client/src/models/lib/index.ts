import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:3090/',
  headers: {
    'Content-type': 'application/json',
  },
});

export { $host };
