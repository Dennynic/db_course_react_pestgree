import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:3090/api',
  headers: {
    'Content-type': 'application/json',
  },
});

function createObject(item: typeof classItem, classItem: any) {
  const classObject = new classItem({ ...item });

  return classObject;
}

export { $host, createObject };
