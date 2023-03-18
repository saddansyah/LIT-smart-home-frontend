import { useRoute } from "vue-router"

const state = () => ({
    deviceUsages: []
}) // fungsi yang mengembalikan suatu object

const mutations = {
    _assign_data_deviceUsages(state, payload) {
        state.deviceUsages = payload
    }
}

const actions = {
    _fetchDataDevicesUsages,
    _fetchDataDeviceUsage
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}

const backendUrl = 'http://127.0.0.1:8000/api/device_usages/';

function _fetchDataDevicesUsages({ commit }) {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await fetch(backendUrl);
            const json = await data.json();
            commit('_assign_data_devices', json.data);
            console.log(json.data)
            resolve(json);
        }
        catch(error){   
            console.error(error);
            reject(error);
        }
    })
}

function _fetchDataDeviceUsage({ commit }, deviceUsageId) {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await fetch(backendUrl + deviceUsageId);
            const json = await data.json();
            commit('_assign_data_devices', json);
            resolve(json);
        }
        catch(error){   
            console.error(error);
            reject(error);
        }
    })
}

