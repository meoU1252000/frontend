// import axios from "axios"

import authServices from "@/services/auth.services";
import { login } from "@/function/handleLogin";

const initDefaultState = () => {
  return {
    userId: null,
    userName: "",
    userInfo: null,
    userAddress: null,
    userOrder: null,
    cities: null,
    role: null,
    error: null,
  };
};

const state = initDefaultState();
const getters = {
  getUserId: (state) => state.userId,
  getUserName: (state) => state.userName,
  getUserOrder: (state) => state.userOrder,
  getUserAddress: (state) => state.userAddress,
  getUserInfo: (state) => state.userInfo,
  getCities: (state) => state.cities,
  getError: (state) => state.error,
};

const mutations = {
  setError(state, payload) {
    state.error = payload.error;
  },
  setUser(state, user) {
    state.userInfo = user;
  },
  setAddress(state, user) {
    state.userAddress = user;
  },
  setOrder(state, user) {
    state.userOrder = user;
  },
  setCities(state, cities) {
    state.cities = cities;
  },
};

const actions = {
  async login({ commit }, user) {
    try {
      const data = await authServices.login(user);
      login(data);
      commit("setUser", {
        userId: data.user.id,
        userName: data.user.customer_name,
        userPhone: data.user.customer_phone,
        userEmail: data.user.email,
        userAddress: data.user.address,
        userOrders: data.user.orders,
        token: data.access_token,
      });
      commit("setError", { error: null });
      return data;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
  async register({ commit }, newCustomer) {
    try {
      commit("setError", {});
      const res = await authServices.register(newCustomer);
      return res;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
  async setStateLogin({ commit }, data) {
    try {
      commit("setUser", {
        userName: data.user.customer_name,
        userPhone: data.user.customer_phone,
        userEmail: data.user.email,
        userAddress: data.user.address,
        userOrders: data.user.orders,
        token: data.access_token,
      });
      commit("setError", { error: null });
    } catch (error) {
      commit("setError", { error });
    }
  },
  async logout({ commit }, credential) {
    try {
      commit("setUser", null);
      const res = await authServices.logout(credential);
      return res;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
  async getListAddress({ commit }, credential) {
    try {
      const address = await authServices.getListAddress(credential);
      commit("setAddress", address);
      //   console.log(s);
      return address;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
  async getListOrder({ commit }, credential) {
    try {
      const order = await authServices.getListOrder(credential);
      commit("setOrder", order);
      //   console.log(s);
      return order;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
  async getListCity({ commit }) {
    try {
      const cities = await authServices.getListCity();
      //   console.log(category);
      commit("setCities", cities);
      //   console.log(s);
      return cities;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
  async createAddress({ commit }, newAddress) {
    try {
      commit("setError", {});
      const res = await authServices.createAddress(newAddress);
      return res;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },

  async createOrder({ commit }, newOrder) {
    try {
      commit("setError", {});
      const res = await authServices.createOrder(newOrder);
      return res;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },

  async updateAddress({ commit }, address) {
    try {
      commit("setError", {});
      const res = await authServices.updateAddress(address);
      return res;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },

  async deleteAddress({ commit }, address) {
    try {
      commit("setError", {});
      const res = await authServices.deleteAddress(address);
      return res;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },

  async cancelOrder({ commit }, order) {
    try {
      commit("setError", {});
      const res = await authServices.cancelOrder(order);
      return res;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
};

const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default auth;
