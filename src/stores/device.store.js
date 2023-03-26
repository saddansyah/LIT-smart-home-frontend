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
    _assign_new_data_device(state, payload) {
        state.devices = [payload, ...state.devices]
    },
    _assign_updated_device(state, payload) {
        state.devices = state.devices.map(item => item.id !== payload.id ? item : payload).sort((a, b) => { return Number(b.is_favorite) - Number(a.is_favorite) });
    },
    _assign_deleted_device(state, payload) {
        state.devices = state.devices.filter(item => item.id !== payload.id)
    }
}

const actions = {
    _fetchDataDevices,
    _fetchDataDevice,
    _storeDataDevice,
    _updateDataDevice,
    _deleteDataDevice
}

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
}


// async method 

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
// const backendUrl = 'https://fd30-182-253-183-6.ap.ngrok.io/api/devices/';

function _fetchDataDevices({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/devices`, {
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 69420
                }
            });
            const json = await response.json();

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
            const response = await fetch(`${BASE_URL}/devices/${deviceId}`, {
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 69420
                }
            });
            const json = await response.json();
            commit('_assign_data_device', json.data);
            resolve(json);
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    })
}

function _storeDataDevice({ commit }, newDevice) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 69420
                },
                body: JSON.stringify(newDevice)
            });
            const json = await response.json();
            commit('_assign_new_data_device', json.data);
            resolve(json);
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

function _updateDataDevice({ commit }, newDevice) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/devices/${newDevice.deviceId.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 69420
                },
                body: JSON.stringify(newDevice.data)
            });
            const json = await response.json();
            console.log(json);
            commit('_assign_updated_device', json.data);
            resolve(json);
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

function _deleteDataDevice({ commit }, deviceId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/devices/${deviceId}`, {
                method: 'DELETE',
                'ngrok-skip-browser-warning': 69420
            });
            const json = await response.json();
            commit('_assign_deleted_device', json.data);
            resolve(json);
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    })
}


