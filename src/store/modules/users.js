export default {
  namespaced: true,

  state() {
    return {
      users: []
    }
  },

  mutations: {
    setName(state, { currentName, newName }) {
      const user = state.users.find(u => u.name === currentName)
      if (user) user.name = newName
    },

    setPassword(state, { name, password }) {
      const user = state.users.find(u => u.name === name)
      if (user) user.password = password
    },

    addUser(state, user) {
      state.users.push(user)
    }
  },

  actions: {
    addUser({ commit }, user) {
      commit('addUser', user)
    },

    updateName({ commit }, payload) {
      commit('setName', payload)
    },

    updatePassword({ commit }, payload) {
      commit('setPassword', payload)
    }
  },

  getters: {
    getUsers: (state) => state.users,

    getUserByName: (state) => (name) => {
      return state.users.find(user => user.name === name)
    },

    getUsersByName: (state) => (partialName) => {
      return state.users.filter(user => user.name.includes(partialName))
    }
  }
}