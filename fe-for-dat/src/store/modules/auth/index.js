// import axios from "axios"

import authServices from "@/services/auth.services";
import { login, setStateLogin } from "@/function/handleLogin";
import { useStore } from "vuex";

const initDefaultState = () => {
  return {
    userId: null,
    userName: "",
    userInfo: null,
    role: null,
    error: null,
  };
};

const state = initDefaultState();
const getters = {
  getUserId: (state) => state.userId,
  getUserName: (state) => state.userName,
  getUserInfo: (state) => state.userInfo,
  getError: (state) => state.error,
};

const mutations = {
  setError(state, payload) {
    state.error = payload.error;
  },
  setUser(state, user) {
    state.userInfo = user;
  },
};

const actions = {
  async login({ commit }, user) {
    try {
      const store = useStore();
      const data = await authServices.login(user);
      login(data.access_token);
      setStateLogin(store);
      console.log(data);
      commit("setUser", {
        userId: data.id,
        userName: data.customer_name,
        userPhone: data.customer_phone,
        userEmail: data.email,
        token: data.access_token,
      });
      commit("setError", { error: null });

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
};

const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default auth;
