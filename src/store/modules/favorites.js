export default {
  namespaced: true,
  state: () => ({
    ids: []
  }),
  getters: {
    favoriteTasks(state, getters, rootState) {
      return rootState.tasks.items.filter(t => state.ids.includes(t.id))
    }
  },
  mutations: {
    ADD(state, id) {
      if (!state.ids.includes(id)) state.ids.push(id)
    },
    REMOVE(state, id) {
      state.ids = state.ids.filter(x => x !== id)
    }
  },
  actions: {
    toggleFavorite({ state, commit }, id) {
      if (state.ids.includes(id)) {
        commit('REMOVE', id)
      } else {
        commit('ADD', id)
      }
    }
  }
}