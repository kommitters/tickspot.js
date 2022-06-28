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

export const noContentResponse = {
  data: {
    status: 204,
    statusText: 'No Content',
  },
};

export const notAcceptable = {
  data: {
    status: 406,
    statusText: 'Not Acceptable',
  },
};

export default {
  notFoundResponse, unprocessableEntityResponse, noContentResponse, notAcceptable,
};
