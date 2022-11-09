import searchService from "@/services/search.service";

const initDefaultState = () => {
  return {
    listProduct: null,
  };
};

const state = initDefaultState();
const getters = {
  getListProduct: (state) => state.listProduct,
};

const mutations = {
  setProducts(state, products) {
    state.listProduct = products;
  },
};
const actions = {
  async getListProducts({ commit }, search) {
    try {
      //   console.log(search);
      const product = await searchService.getListProducts(search);
      commit("setProducts", product);
      return product;
    } catch (error) {
      commit("setError", { error });
    }
  },
};

const products = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default products;
