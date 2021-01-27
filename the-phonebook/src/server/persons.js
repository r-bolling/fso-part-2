import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then((res) => res.data);
};

const create = (person) => {
  const req = axios.post(baseURL, person);
  return req.then((res) => res.data);
};

const deleteReq = (id) => {
  const req = axios.delete(`${baseURL}/${id}`);
  return req.then((res) => res);
};

const update = (id, newObject) => {
  const req = axios.put(`${baseURL}/${id}`, newObject);
  return req.then((res) => res.data);
};

export default { getAll, create, deleteReq, update };
