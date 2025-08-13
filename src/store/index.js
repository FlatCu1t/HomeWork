import { createStore } from 'vuex'
import users from "./modules/users.js";

export default createStore({
  modules: {
    users
  }
})