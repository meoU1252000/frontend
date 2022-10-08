// import axios from "axios"

// import { IAuthentication } from "@/interface/auth/authentication.state";
// import { IProduct } from "@/interface/product/product.state";
import productServices from "@/services/product.services";
// import { set } from "core-js/core/dict";
// import { ActionTree, GetterTree, MutationTree } from "vuex";

const initDefaultState  = () => {
  return {
    listProduct: null,
    productId: null,
    productName: "",
    productRating: null,
    error: null,
  };
};

const state = initDefaultState();
const getters = {
  getListProduct: (state) => state.listProduct,
  getProductId: (state) => state.productId,
  getProductName: (state) => state.productName,
  getMainImageSrc: (state) => state.getMainImageSrc,
  getError: (state) => state.error,
};

const mutations= {
  setError(state, payload) {
    state.error = payload.error;
  },
  setProducts(state, products) {
   state.listProduct = products;
  },
};
const actions = {
  async getListProducts({commit}) {
    try {
      const product = await productServices.getListProducts();
      // console.log(product);
      commit("setProducts", product);
    //   console.log(s);
      return product;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
};

const product = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default product;
