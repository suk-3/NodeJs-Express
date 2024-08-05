const axios = require('axios');
const { udfunctions } = require('./udfunctions');
const { logger } = require('../logger');

const request = {
  config: {
    maxRetries: 3,
    retryDelay: 1000,
    method: 'GET',
    retry: true,
    byPassRetry: (error) => {
      try {
        const conditions = [
          ![403, 401, 404].includes(error.response.status),
          error.config.retry,
          udfunctions.isJson(error.config),
        ];

        return conditions.indexOf(false) > -1;
      } catch (err) {
        return false;
      }
    },
  },
  fetchData: async (url, conf = {}) => {
    if (!udfunctions.isURL(url)) {
      throw new Error(`Invalid URL: ${url}`, { cause: { error: 'Invalid URL', url } });
    }

    const Number = Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
      minimumFractionDigits: 0,
    });

    axios.interceptors.response.use(undefined, async (error) => {
      const config = error?.config || {};

      if (!('response' in error)) {
        error.response = {};
        error.response.status = 404;
      }

      if (request.config.byPassRetry(error)) {
        throw new Error('Data could not be fetched.', {
          cause: {
            error: 'Data could not be fetched.',
            url: config.url,
            byPassRetry: true,
            status: error.response.status,
          },
        });
      }

      const retryDelay = conf?.retryDelay || request.config.retryDelay;
      const maxRetries = config?.maxRetries || request.config.maxRetries;
      config.retries = config?.retries || 0;

      if (config.retries < maxRetries) {
        logger.error(
          `[${error.response.status}] Retrying with attempt ${Number.format(
            config.retries + 1,
          )} for ${config.url}`,
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        config.retries += 1;
        return axios(config);
      }
      logger.error(
        `Data could not be fetched. ${maxRetries} unsuccessful retries [${config.url}]`,
      );
      throw new Error('Data could not be fetched.', {
        cause: {
          error: `Data could not be fetched. ${maxRetries} unsuccessful retries`,
          url: config.url,
          byPassRetry: false,
          status: error.response.status,
        },
      });
    });

    let paramsKey = [];

    try {
      paramsKey = Object.keys(conf);
    } catch (error) {
      logger.error('The configuration is invalid. Please check the parameter.');
      return {
        error: 'The configuration is invalid. Please check the parameter.',
      };
    }

    let params = {
      method: conf?.method || request.config.method,
      url,
      retry: paramsKey.includes('retry') ? conf.retry : request.config.retry,
    };

    if (paramsKey.includes('method')) {
      delete conf.method;
    }
    if (paramsKey.includes('url')) {
      delete conf.url;
    }
    if (paramsKey.includes('retry')) {
      delete conf.retry;
    }

    params = Object.keys(conf).length > 0 ? { ...params, ...conf } : params;

    const response = await axios(params);
    return response.data;
  },
};

module.exports.request = request;
