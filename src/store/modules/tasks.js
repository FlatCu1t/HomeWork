import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    items: [],
    filter: 'all'
  }),
  getters: {
    totalCount(state) {
      return state.items.length
    },
    completedCount(state) {
      return state.items.filter(t => t.completed).length
    },
    filteredTasks(state) {
      if (state.filter === 'completed') {
        return state.items.filter(t => t.completed)
      }
      if (state.filter === 'uncompleted') {
        return state.items.filter(t => !t.completed)
      }
      return state.items
    }
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items
    },
    TOGGLE_COMPLETE(state, id) {
      const task = state.items.find(t => t.id === id)
      if (task) task.completed = !task.completed
    },
    DELETE_TASK(state, id) {
      state.items = state.items.filter(t => t.id !== id)
    },
    SET_FILTER(state, filter) {
      state.filter = filter
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      const resp = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
      commit('SET_ITEMS', resp.data)
    },
    toggleComplete({ commit }, id) {
      commit('TOGGLE_COMPLETE', id)
    },
    deleteTask({ commit }, id) {
      commit('DELETE_TASK', id)
    },
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter)
    }
  }
}