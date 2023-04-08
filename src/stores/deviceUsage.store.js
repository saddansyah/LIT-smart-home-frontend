const state = () => ({
    allDeviceUsages: [],
    totalUsages: [],
    deviceUsages: []
})

const mutations = {
    _assign_data_allDeviceUsages(state, payload) {
        state.allDeviceUsages = payload
    },
    _assign_data_totalUsages(state, payload) {
        state.totalUsages = payload;
    },
    _assign_data_deviceUsages(state, payload) {
        state.deviceUsages = payload
    },
}

const actions = {
    _fetchDataDeviceUsages,
    _fetchDataTotalUsages,
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function _fetchDataDeviceUsages({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(`${BASE_URL}/device_usages`, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const json = await data.json();

            if (response.ok) {
                commit('_assign_data_allDeviceUsages', json.data);
                resolve(json);
            }

            if (!response.ok) {
                const error = new Error(json.message || response.statusText);
                error.code = response.status;
                throw error;
            }

        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

function _fetchDataTotalUsages({ commit }, timeRange) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(`${BASE_URL}/total_usages/${timeRange}`, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const json = await data.json();

            if (response.ok) {
                commit('_assign_data_totalUsages', json.data.total_usages);
                commit('_assign_data_deviceUsages', json.data.device_usages);
                resolve(json.data);
            }

            if (!response.ok) {
                const error = new Error(json.message || response.statusText);
                error.code = response.status;
                throw error;
            }
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    }
    )
}

