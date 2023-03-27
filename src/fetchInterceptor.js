import fetchIntercept from 'fetch-intercept';

const initFetchIntercept = () => {

    const unregister = fetchIntercept.register({
        request: function (url, config) {
            // config.headers['header-test'] = 62940
            return [url, config];
        },

        requestError: function (error) {
            // Called when an error occured during another 'request' interceptor call
            return Promise.reject(error);
        },

        response: function (response) {
            // Modify the reponse object
            return response;
        },

        responseError: function (error) {
            // Handle an fetch error
            return Promise.reject(error);
        }
    });

    return unregister
}

export {
    initFetchIntercept
}
