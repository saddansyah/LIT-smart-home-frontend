import fetchIntercept from 'fetch-intercept';
import stores from '@/stores';

const initFetchIntercept = () => {
    const unregister = fetchIntercept.register({
        request: function (url, config) {
            config.headers['Authorization'] = `Bearer ${stores.state.access_token}`;
            config.headers['ngrok-skip-browser-warning'] = 69420;
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
