import createRestApiClient from '../utils/createRestApi';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: '' });
  return {
    createContributor: ({ name, email, skills, education, links, wwsk }) => client.request({
      method: 'POST',
      url: '/api/blog',
      data: {
        name,
        email,
        skills,
        education,
        links,
        wwsk
      }
    }),
    createAdvertiser: ({ name, email, business, password }) => client.request({
      method: 'POST',
      url: '/api/advertiser',
      data: {
        name,
        email,
        business,
        password,
      }
    }),
    contact: ({ email, concerns }) => client.request({
      method: 'POST',
      url: '/api/contact',
      data: {
        email,
        concerns
      }
    }),
    delete: () => client.request({
      method: 'DELETE',
      url: '/api/blog'
    })
  };
};