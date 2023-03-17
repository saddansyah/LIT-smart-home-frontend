import { useRoute } from "vue-router"

const state = () => ({
    devices: []
}) // fungsi yang mengembalikan suatu object

const mutations = {
    _assign_data_devices(state, payload) {
        state.devices = payload
    }
}

const actions = {
    _fetchDataDevices,
    _fetchDataDevice
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}

const backendUrl = 'http://localhost:3000/devices/';

function _fetchDataDevices({ commit }) {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await fetch(backendUrl);
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

function _fetchDataDevice({ commit }, deviceId) {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await fetch(backendUrl + deviceId);
            const json = await data.json();
            commit('_assign_data_devices', json);
            console.log(backendUrl + deviceId);
            resolve(json);
        }
        catch(error){   
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

