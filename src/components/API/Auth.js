import axios from 'axios';

const apiURL = 'http://localhost:5000/api/v1';

export const login = async function (formData) {
  return axios
    .post(apiURL + `/auth/login`, {
      email: formData.email,
      password: formData.password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.user.email));
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }
      console.log(response.data);
      return response.data;
    });
};

export const register = async function (formData) {
  return axios
    .post(apiURL + `/auth/register`, {
      email: formData.email,
      password: formData.password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.user.email));
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }
      return response.data;
    });
};
