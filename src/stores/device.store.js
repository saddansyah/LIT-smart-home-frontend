const state = () => ({
    devices: [],
    device: {}
}) // fungsi yang mengembalikan suatu object

const getters = {
    devices(state) {
        return state.devices;
    }
}

const mutations = {
    _assign_data_devices(state, payload) {
        state.devices = payload
    },
    _assign_data_device(state, payload) {
        state.device = payload
    },
    _assign_updated_devices(state, payload) {
        state.devices = state.devices.map(item => item.id !== payload.id ? item : payload);
    }
}

const actions = {
    _fetchDataDevices,
    _fetchDataDevice
}

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
}

const backendUrl = 'http://127.0.0.1:8000/api/devices/';
// const backendUrl = 'https://fd30-182-253-183-6.ap.ngrok.io/api/devices/';

function _fetchDataDevices({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(backendUrl, {
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 69420
                }
            });
            const json = await data.json();
            commit('_assign_data_devices', json.data);
            resolve(json);
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    })
}

function _fetchDataDevice({ commit }, deviceId) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(backendUrl + deviceId, {
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 69420
                }
            });
            const json = await data.json();
            commit('_assign_data_device', json);
            resolve(json);
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    })
}




// async function _fetchDataDevice({ commit }) {
//     try {
//         const data = await fetch(backendUrl);
//         const json = await data.json();
//         commit('_assign_data_device', json);
//     }
//     catch (error) {
//         console.error(error);

//     }

// }

