/**
 * Generates custom API responses
 * @param {string} status code status
 * @param {string} statusText status text
 * @param {string} method verb to do the request
 * @param {string} requestData data passed in the request
 * @param {string} data data returned in the response
 * @param {string} authorization authorization in base64
 * @returns complete response
 */
const responseGenerator = (
  status,
  statusText,
  method,
  requestData,
  dataResponse,
  authorization,
) => ({
  status,
  statusText,
  headers: {
    server: 'nginx',
    date: 'Fri, 22 Oct 2021 16:16:18 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '1437',
    'cache-control':
      'no-cache,private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0',
    'x-toggl-request-id': 'dd9b6f6833d1efd8a3bbb7f573a63dd1',
    'x-service-level': 'GREEN',
    via: '1.1 google',
    'alt-svc': 'clear',
    connection: 'close',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['httpAdapter'],
    transformRequest: [['transformRequest']],
    transformResponse: [['transformResponse']],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: ['validateStatus'],
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: authorization,
      'User-Agent': 'axios/0.23.0',
    },
    method,
    url: 'https://api.track.toggl.com/api/v8/me',
    data: requestData,
  },
  data: dataResponse,
});

export default responseGenerator;
