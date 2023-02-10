import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:3090/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export { $host };
