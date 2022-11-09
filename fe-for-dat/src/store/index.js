// import axios from 'axios'
import { createStore } from "vuex";
import auth from "./modules/auth";
import product from "./modules/product";
import category from "./modules/category";
import brand from "./modules/brand";
import search from "./modules/search";

// import product from "./modules/product";
export default createStore({
  modules: {
    auth,
    product,
    category,
    brand,
    search,
  },
});
