import { createStore } from 'vuex'
import tasks from './modules/tasks'
import favorites from './modules/favorites'

export default createStore({
  modules: {
    tasks,
    favorites
  }
})