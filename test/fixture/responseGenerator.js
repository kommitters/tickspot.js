/**
 * Generates custom API responses
 * @param {string} url
 * @param {string} status code status
 * @param {string} statusText status text
 * @param {string} method verb to do the request
 * @param {string} requestData data passed in the request
 * @param {string} data data returned in the response
 * @param {string} authorization authorization formed according to the documentation
 * @returns complete response
 */
const responseGenerator = (
  url,
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
    date: 'Tue, 09 Nov 2021 16:30:40 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'close',
    location: url,
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '1; mode=block',
    'x-content-type-options': 'nosniff',
    'access-control-allow-origin': '*',
    etag: 'W/"2dc0e7bc69c95451f6872217c20b0dfc"',
    'cache-control': 'max-age=0, private, must-revalidate',
    'x-request-id': 'f0599106-698c-4b68-bf93-2b3744a278cc',
    'x-runtime': '0.051944',
    'cf-cache-status': 'DYNAMIC',
    'expect-ct':
    'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
    'report-to':
    `{"endpoints":
    [{"url":
    "https:\\/\\/a.nel.cloudflare.com\\/report\\/v3?s=tl9eMgvXg%2F3Yk%2BG%2FEm%2BziCf%2FEF50NeJ"}],
    "group":"cf-nel","max_age":604800}`,
    nel: '{"success_fraction":0,"report_to":"cf-nel","max_age":604800}',
    server: 'cloudflare',
    'cf-ray': '6ab86d506cd0370c-MIA',
    'alt-svc':
    'h3=":443"; ma=86400, h3-29=":443"; ma=86400, h3-28=":443"; ma=86400, h3-27=":443"; ma=86400',
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
      'Content-Type': 'application/json',
      Authorization: authorization,
      'User-Agent': 'Toggltickjs/1.0 (user@kommit.co)',
      'Content-Length': 70,
    },
    method,
    url,
    data: requestData,
  },
  data: dataResponse,
});

export default responseGenerator;
