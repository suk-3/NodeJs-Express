const axios = require('axios');
const { udfunctions } = require('./udfunctions')

const request = {
    config: {
        maxRetries: 3,
        retryDelay: 1000,
        method: 'GET',
        retry: true,
        byPassRetry: (error) => {
            try {
                conditions = [
                    ![403, 401].includes(error.response.status),
                    error.config.retry,
                    udfunctions.isJson(error.config)
                ]

                return conditions.indexOf(false) > -1 ? true : false;
            } catch (err) {
                return false
            }
        }
    },
    fetchData: async (url, conf = {}) => {
        if (!udfunctions.isURL(url)) {
            throw { "error": "Invlide URL : " + url };
        }

        let Number = Intl.NumberFormat('en-US', {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 0
        })

        axios.interceptors.response.use(undefined, async (error) => {

            const config = error?.config || {};

            if (request.config.byPassRetry(error)) throw {
                "error": "Data could not be fetched.",
                "url": config.url,
                "byPassRetry": true,
                "status": error.response.status
            }

            const retryDelay = conf?.retryDelay || request.config.retryDelay;
            const maxRetries = config?.maxRetries || request.config.maxRetries;
            config.retries = config?.retries || 0;

            if (config.retries < maxRetries) {
                console.log([error.response.status], "Retrying with attempt", Number.format(config.retries + 1), "for", config.url)
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                config.retries++;
                return await axios(config);
            } else {
                console.log("Data could not be fetched. " + maxRetries + " unsuccessful retries", [config.url])
                throw {
                    "error": "Data could not be fetched. " + maxRetries + " unsuccessful retries",
                    "url": config.url,
                    "byPassRetry": false,
                    "status": error.response.status
                }
            }
        });

        try {
            let paramsKey = []

            try {
                paramsKey = Object.keys(conf)
            } catch (error) {
                console.log("The configuration is invalid. Please check the parameter.")
                return { "error": "The configuration is invalid. Please check the parameter." }
            }

            let params = {
                method: conf?.method || request.config.method,
                url: url,
                retry: paramsKey.includes('retry') ? conf.retry : request.config.retry
            }

            paramsKey.includes('method') ? delete conf.method : ""
            paramsKey.includes('url') ? delete conf.url : ""
            paramsKey.includes('retry') ? delete conf.retry : ""
            params = Object.keys(conf).length > 0 ? { ...params, ...conf } : params

            const response = await axios(params);
            return response.data;
        } catch (error) {
            throw error
        }
    }
};

module.exports.request = request;