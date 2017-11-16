import createRestApiClient from '../utils/createRestApi';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: '' });
  return {
    creatBlogPost: ({ title, subtitle, body }) => client.request({
      method: 'POST',
      url: '/api/blog',
      data: {
        title,
        subtitle,
        body
      }
    }),
    logout: () => client.request({
      method: 'DELETE',
      url: '/api/blog'
    })
  };
};