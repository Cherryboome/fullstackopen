import axios from "axios";
const baseURL = "http://localhost:3001/persons";

export const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

export const create = addPerson => {
  const request = axios.post(baseURL, addPerson);
  return request.then(response => response.data);
};
