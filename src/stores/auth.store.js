const state = () => ({
    user: {}
})

const mutations = {
    _assign_data_user(state, payload) {
        state.user = payload
    }
}

const actions = {
    _login,
    _register,
    _logout
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}

// async method

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

function _login({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const login = await response.json()

            if(response.ok){
                localStorage.setItem('access_token', login.access_token);
                commit('SET_TOKEN', login.access_token, { root: true }); // akses commit yg di root (index.js)
                commit('_assign_data_user', login.data);
                window.location.replace(window.location.href); // refresh page
                resolve(login);
            }

            if(!response.ok){
                const error = new Error(response.statusText);
                error.code = response.status;
                throw error;
            }

        }
        catch (error) {
            reject(error);
        }
    })
}

function _register({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const register = await response.json()

            if(register.success){
                localStorage.setItem('SET_TOKEN', response.access_token);
                commit('_assign_data_user', response.access_token, { root: true })
                resolve(response);
            }

            if(!register.sucess){
                reject(error);
            }
        }
        catch (error) {
            reject(error);
        }
    })
}

function _logout({ commit }, payload) {

}