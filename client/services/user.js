// import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApi';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: '' });
  return {
    login: ({ email, password }) => client.request({
      method: 'POST',
      url: '/api/sessions',
      data: {
        email,
        password
      }
    }),
    getUsers: () => client.request({
      method: 'GET',
      url: '/api/user'
    }),
    signUp: ({ email, name, password }) => client.request({
      method: 'POST',
      url: '/api/user',
      data: {
        email,
        name,
        password
      }
    }),
    logOut: () => client.request({
      method: 'DELETE',
      url: '/api/sessions'
    })
  };
};