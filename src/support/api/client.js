const axios = require('axios');
const common = require('../helpers/common');
const logger = require('../helpers/logger');

class ApiClient {
  constructor() {
    this.options = {};
    this.requestContent = {};
    this.client = axios.create();
  }

  setBaseURL(baseURL) {
    this.options = {
      ...this.options,
      baseURL,
    };
  }

  createRequest(method, path) {
    path = common.getTreatedValue(path);

    this.options = {
      ...this.options,
      method,
      url: path,
    };

    logger.debug(`User creates the [${method}] request to [${path}]`);
  }

  sendRequest() {
    this.addBody(this.requestContent);

    return this.client.request(this.options)
      .then((response) => {
        this.response = response;
        return Promise.resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          logger.error(error.response.data);
          logger.error(error.response.status);
          logger.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          logger.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          logger.error('Error', error.message);
        }
        logger.error(error.config);
      });
  }

  addHeader(name, value) {
    this.options = {
      ...this.options,
      headers: {
        ...this.options.headers,
        [name]: value,
      },
    };
  }

  addParam(name, value) {
    this.options = {
      ...this.options,
      params: {
        ...this.options.params,
        [name]: value,
      },
    };
  }

  addBody(body) {
    this.options = {
      ...this.options,
      data: body,
    };
  }
}

module.exports = new ApiClient();
