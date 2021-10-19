import { Module } from "vuex";
import { RootState } from "../types";

export interface PrizesState {
    shippingView: boolean;
}

const module: Module<PrizesState, RootState> = {
    namespaced: true,

    state: {
        shippingView: false,
    },

    getters: {
        
    },

    mutations: {
        resetShippingView(state) {
            state.shippingView = false;
        },
        setShippingView(state){
            state.shippingView = true;
        },
    },
    actions: {
        async resetView({ commit}) { {
                await commit("resetShippingView");
            }
        },
    },
};

export default module;
