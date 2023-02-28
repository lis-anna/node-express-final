import axios from 'axios';

const apiURL = process.env.REACT_APP_BASE_URL;

export const login = async function (formData) {
  return axios
    .post(apiURL + `/auth/login`, {
      email: formData.email,
      password: formData.password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.user.email));
        localStorage.setItem('name', JSON.stringify(response.data.user.name));
        localStorage.setItem(
          'lastname',
          JSON.stringify(response.data.user.lastname)
        );
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }
      //    console.log(response.data);
      return response.data;
    });
};

export const register = async function (formData) {
  // console.log(formData, 'to be registered');
  return axios
    .post(apiURL + `/auth/register`, {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.user.email));
        localStorage.setItem('name', JSON.stringify(response.data.user.name));
        localStorage.setItem(
          'lastname',
          JSON.stringify(response.data.user.lastname)
        );
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }
      return response.data;
    });
};
