import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    login: ({ email, password }) => client.request({
      method: 'POST',
      url: '/sessions',
      data: {
        email,
        password
      }
    }),
    getUsers: () => client.request({
      method: 'GET',
      url: '/user'
    }),
    signUp: ({ email, firstName, lastName, password, occupation, region }) => client.request({
      method: 'POST',
      url: '/users',
      data: {
        email,
        firstName,
        lastName,
        password,
        occupation,
        region
      }
    }),
    logOut: () => client.request({
      method: 'DELETE',
      url: '/sessions'
    })
  };
};