import createRestApiClient from '../utils/createRestApi';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: '' });
  return {
    getEvents: () => client.request({
      method: 'GET',
      url: '/api/event'
    }),
    getEvent: ({ id }) => client.request({
      method: 'GET',
      url: `/api/event/${id}`
    }),
    createEvent: ({ title, subtitle, body }) => client.request({
      method: 'POST',
      url: '/api/event',
      data: {
        title,
        subtitle,
        body
      }
    }),
    deleteEvent: ({ id }) => client.request({
      method: 'DELETE',
      url: `/api/event/${id}`
    })
  };
};