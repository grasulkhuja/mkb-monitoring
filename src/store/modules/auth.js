import AuthService from '@/services/api/auth.service'

export const namespaced = true

export const state = {
  token: null,
  user: null,
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  login: ({ commit }, { login, password }) => {
    const token = AuthService.login({ login, password })
    commit('SET_TOKEN', token)
  },
  fetchUserData: async ({ commit }) => {
    const user = await AuthService.getUserData()
    commit('SET_USER', user)
  },
}

export const getters = {
  token: (state) => state.token,
  user: (state) => state.user,
}
