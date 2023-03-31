const state = () => ({
    user: {}
})

const mutations = {
    _assign_data_user(state, payload) {
        state.user = payload
    },
    _remove_data_user(state, payload) {
        state.user = null
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

            if (response.ok) {
                localStorage.setItem('access_token', login.access_token);
                localStorage.setItem('user', JSON.stringify({ "name": login.data.name, "email": login.data.email }));
                commit('SET_TOKEN', login.access_token, { root: true }); // akses commit yg di root (index.js)
                // commit('_assign_data_user', login.data);
                resolve(login);
            }

            if (!response.ok) {
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

            if (response.ok) {
                localStorage.setItem('access_token', register.access_token);
                localStorage.setItem('user', JSON.stringify({ "name": register.data.name, "email": register.data.email }));
                commit('SET_TOKEN', register.access_token, { root: true }); // akses commit yg di root (index.js)
                // commit('_assign_data_user', register.access_token)
                resolve(response);
            }

            if (!response.ok) {
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

function _logout({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const logout = response.json();

            if (response.ok) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                commit('REMOVE_TOKEN', null, { root: true });
                // commit('_remove_data_user', null);
                window.location.replace(window.location.href); // refresh page
            }

            if (!response.ok) {
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