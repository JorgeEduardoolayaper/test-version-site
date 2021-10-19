import { Module } from "vuex";
import { RootState } from "../types";
import { DeepReadonly } from "../../../general/types/types";
import { EventOdd, EventOddCollection } from "../../types/eventodd";
import { computeOddDictKey } from "../../utils/game/bet";

export interface OddState {
    isLoading: boolean;
    isLoaded: boolean;
    isFailed: boolean;
    oddsMap: Map<string, Map<string, DeepReadonly<EventOdd>>>;
    oddsCountMap: Map<string, number>;
}

const module: Module<OddState, RootState> = {
    namespaced: true,

    state: {
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        oddsMap: new Map(),
        oddsCountMap: new Map(),
    },

    getters: {
        oddDictionary(state): ReadonlyMap<string, Map<string, EventOdd>> {
            return state.oddsMap;
        },
        oddCountDictionary(state): ReadonlyMap<string, number> {
            return state.oddsCountMap;
        },
    },

    mutations: {
        markAsLoading(state) {
            state.isLoading = true;
        },

        markAsLoaded(state, oddCollection: EventOddCollection[]) {
            state.isLoading = false;
            state.isFailed = false;
            state.isLoaded = true;
            state.oddsMap = new Map(
                oddCollection.map(function(odds) {
                    return [odds.external_id, 
                        new Map(odds.odds?.map(odd => [computeOddDictKey(odd.betType, odd.period), odd] ))];
                }),
            );

            state.oddsCountMap = new Map(
                oddCollection.map(function(odds) {
                return [odds.external_id, odds.count];
                }),
            );
        },

        oddsUpdate(state, odds: EventOddCollection) {
            state.oddsMap.set(odds.external_id, new Map(odds.odds?.map(odd => [computeOddDictKey(odd.betType, odd.period), odd] )));
            state.oddsCountMap.set(odds.external_id, odds.count);
        },

        markAsFailed(state) {
            state.isLoading = false;
            state.isFailed = true;
        },
    },

    actions: {
        async load({ state, dispatch }) {
            if (!state.oddsMap.size) {
                await dispatch("reload");
            }
        },

        async reload({ commit, rootState }) {
            commit("markAsLoading");

            try {
                const oddsCollection = await rootState.api.getOdds();
                commit("markAsLoaded", oddsCollection);
            } catch (e) {
                commit("markAsFailed");
            }
        },
    },
};

export default module;
