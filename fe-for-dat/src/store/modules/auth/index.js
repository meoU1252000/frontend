// import axios from "axios"

import authServices from "@/services/auth.services";

const initDefaultState = () => {
  return {
    userId: null,
    userName: "",
    role: null,
    error: null,
  };
};

const state = initDefaultState();
const getters = {
  getUserId: (state) => state.userId,
  getUserName: (state) => state.userName,
  getError: (state) => state.error,
};

const mutations = {
  setError(state, payload) {
    state.error = payload.error;
  },
  setUser(state, payload) {
    Object.assign(state, {
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      role: payload.role,
    });
  },
};

const actions = {
  async login({ commit }, user) {
    try {
      const u = await authServices.login(user);
      commit("setUser", { userId: 1, userName: user.userName, role: "admin" });
      commit("setError", { error: null });
      console.log(u);
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
  async register({ commit }, user) {
    try {
      commit("setUser", { userId: 1, userName: user.userName, role: "admin" });
      const u = await authServices.login(user);
      commit("setError", { error: null });
      console.log(u);
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
