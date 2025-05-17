import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}token/`; // endpoint del backend

export const loginUser = async ({ username, password }) => {
  const response = await axios.post(API_URL, {
    username,
    password,
  });

  return response.data; // { access, refresh }
};
