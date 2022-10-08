// import axios from "axios"

// import { IAuthentication } from "@/interface/auth/authentication.state";
// import { IProduct } from "@/interface/product/product.state";
import categoryServices from "@/services/category.services";
// import productServices from "@/services/product.services";
// import { set } from "core-js/core/dict";
// import { ActionTree, GetterTree, MutationTree } from "vuex";

const initDefaultState  = () => {
  return {
    listCategories: null,
    error: null,
  };
};

const state = initDefaultState();
const getters = {
  getListCategory: (state) => state.listCategories,
  getError: (state) => state.error,
};

const mutations= {
  setError(state, payload) {
    state.error = payload.error;
  },
  setCategories(state, categories) {
   state.listCategories = categories;
  },
};
const actions = {
  async getListCategories({commit}) {
    try {
      const category = await categoryServices.getListCategories();
      console.log(category);
      commit("setCategories", category);
    //   console.log(s);
      return category;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
};

const category = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default category;
