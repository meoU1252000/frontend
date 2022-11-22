// import axios from "axios"

// import { IAuthentication } from "@/interface/auth/authentication.state";
// import { IProduct } from "@/interface/product/product.state";
import eventServices from "@/services/event.services";
// import productServices from "@/services/product.services";
// import { set } from "core-js/core/dict";
// import { ActionTree, GetterTree, MutationTree } from "vuex";

const initDefaultState  = () => {
  return {
    listEvents: null,
    error: null,
  };
};

const state = initDefaultState();
const getters = {
  getListEvent: (state) => state.listEvents,
  getError: (state) => state.error,
};

const mutations= {
  setError(state, payload) {
    state.error = payload.error;
  },
  setEvents(state, events) {
   state.listEvents = events;
  },
};
const actions = {
  async getListEvents({commit}) {
    try {
      const eventCode = await eventServices.getListEvents();
    //   console.log(category);
      commit("setEvents", eventCode);
    //   console.log(s);
      return eventCode;
      //call api
    } catch (error) {
      commit("setError", { error });
    }
  },
};

const eventCode = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default eventCode;
