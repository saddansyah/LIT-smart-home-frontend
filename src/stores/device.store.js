const state = () => ({
    devices: [],
    productDevices: []
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
        state.devices = state.devices.map(item => item.id !== payload.id ? item : payload);
    },
    _assign_deleted_device(state, payload) {
        state.devices = state.devices.filter(item => item.id !== payload.id)
    },
    _assign_product_devices(state, payload) {
        state.productDevices = payload
    }
}

const actions = {
    _fetchDataDevices,
    _fetchDataDevice,
    _storeDataDevice,
    _updateDataDevice,
    _updateDeviceState,
    _updateDeviceFavorite,
    _deleteDataDevice,
    _getProductDevice
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
            const response = await fetch(`${BASE_URL}/user_devices`, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const json = await response.json();

            if (response.ok) {
                commit('_assign_data_devices', json.data);
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
    })
}

function _fetchDataDevice({ commit }, deviceId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/user_devices/${deviceId}`, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const json = await response.json();

            if (response.ok) {
                commit('_assign_data_device', json.data);
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
    })
}

function _storeDataDevice({ commit }, newDevice) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/user_devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDevice)
            });
            const json = await response.json();

            if (response.ok) {
                commit('_assign_new_data_device', json.data);
                resolve(json);
            }

            if (!response.ok) {
                const error = new Error(json.message || response.statusText);
                error.code = response.status;
                throw error;
            }

        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

function _updateDataDevice({ commit }, {body, deviceId}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/user_devices/${deviceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            const json = await response.json();

            if (response.ok) {
                commit('_assign_updated_device', json.data);
                resolve(json);
            }

            if (!response.ok) {
                const error = new Error(json.message || response.statusText);
                error.code = response.status;
                throw error;
            }

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
            const response = await fetch(`${BASE_URL}/user_devices/${deviceId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();

            if (response.ok) {
                commit('_assign_deleted_device', json.data);
                resolve(json);
            }

            if (!response.ok) {
                const error = new Error(json.message || response.statusText);
                error.code = response.status;
                throw error;
            }

        }
        catch (error) {
            reject(error);
        }
    })
}

function _updateDeviceState({ commit }, {body, deviceId}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/user_devices/update_state/${deviceId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            console.log(json)

            if (response.ok) {
                commit('_assign_updated_device', json);
                resolve(json);
            }

            if (!response.ok) {
                const error = new Error(json.message || response.statusText);
                error.code = response.status;
                throw error;
            }
        }
        catch (error) {
            reject(error);
        }
    });
}

function _updateDeviceFavorite({ commit }, {body, deviceId}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/user_devices/update_favorite/${deviceId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            const json = await response.json();

            if (response.ok) {
                commit('_assign_updated_device', json);
                resolve(json);
            }

            if (!response.ok) {
                const error = new Error(json.message || response.statusText);
                error.code = response.status;
                throw error;
            }
        }
        catch (error) {
            reject(error);
        }
    });
}

function _getProductDevice({ commit }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/devices`, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const json = await response.json();

            if (response.ok) {
                commit('_assign_product_devices', json.data);
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
    })
}


