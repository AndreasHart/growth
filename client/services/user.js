// import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApi';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: '' });
  return {
    check: () => client.request({
      method: 'get',
      url: '/api/session'
    }),
    login: ({ email, password }) => client.request({
      method: 'POST',
      url: '/api/login',
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
    logout: () => client.request({
      method: 'DELETE',
      url: '/api/logout'
    })
  };
};