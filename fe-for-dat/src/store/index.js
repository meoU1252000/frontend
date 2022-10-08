// import axios from 'axios'
import { createStore } from "vuex";
import auth from "./modules/auth";
import product from "./modules/product";
import category from "./modules/category";
// import product from "./modules/product";
export default createStore({
  modules: {
    auth,
    product,
    category
  },
});
