export const notFoundResponse = {
  data: {
    status: 404,
    statusText: 'Not Found',
  },
};

export const unprocessableEntityResponse = {
  data: {
    status: 422,
    statusText: 'Unprocessable Entity',
  },
};

export default { notFoundResponse, unprocessableEntityResponse };
