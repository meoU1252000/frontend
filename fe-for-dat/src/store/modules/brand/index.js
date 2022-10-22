// import axios from "axios"

// import { IAuthentication } from "@/interface/auth/authentication.state";
// import { IProduct } from "@/interface/product/product.state";
import brandServices from "@/services/brand.services";
// import productServices from "@/services/product.services";
// import { set } from "core-js/core/dict";
// import { ActionTree, GetterTree, MutationTree } from "vuex";

const initDefaultState  = () => {
  return {
    getListBrands: null,
    error: null,
  };
};

const state = initDefaultState();
const getters = {
  getListBrand: (state) => state.getListBrands,
  getError: (state) => state.error,
};

const mutations= {
  setError(state, payload) {
    state.error = payload.error;
  },
  setBrands(state, brands) {
   state.getListBrands = brands;
  },
};
const actions = {
  async getListBrands({commit}) {
    try {
      const brand = await brandServices.getListBrands();
    //   console.log(category);
      commit("setBrands", brand);
    //   console.log(s);
      return brand;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
};

const brand = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default brand;
