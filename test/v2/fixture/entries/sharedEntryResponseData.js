export const dataEntryNotFound = {
  data: {
    status: 404,
    statusText: 'Not Found',
  },
};

export const dataEntryUnprocessableEntity = {
  data: {
    status: 422,
    statusText: 'Unprocessable Entity',
  },
};

export default { dataEntryNotFound, dataEntryUnprocessableEntity };
