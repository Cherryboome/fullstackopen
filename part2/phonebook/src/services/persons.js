import axios from "axios";
const baseURL = "http://localhost:3001/persons";

export const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

export const create = obj => {
  const request = axios.post(baseURL, obj);
  return request.then(response => response.data);
};

export const deleteObj = id => {
  const baseURL = `http://localhost:3001/persons/${id}`;
  const request = axios.delete(baseURL);
  return request
    .then(response => response.data)
    .catch(error => console.log(error));
};
