export const namespaced = true

export const state = {
  loading: false,
  snackbars: []
}

export const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar)
  },
  TOGGLE_LOADING(state) {
    state.loading = !state.loading
  }
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true
    snackbar.color = snackbar.color || 'success'
    commit('SET_SNACKBAR', snackbar)
  }
}

export const getters = {
  loading: (state) => state.loading
}
