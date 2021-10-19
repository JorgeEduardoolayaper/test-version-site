import { Module } from "vuex";
import { RootState } from "../types";
import { League } from "../../../general/types/league";

export interface LeagueState {
    isLoading: boolean;
    isLoaded: boolean;
    isFailed: boolean;
    leagues: League[];
}

const module: Module<LeagueState, RootState> = {
    namespaced: true,

    state: {
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        leagues: [],
    },

    getters: {
        leagueNameDictionary(state): ReadonlyMap<string, string> {
            return new Map(state.leagues.map(league => [league.id, league.name]));
        },
        leagueDictionary(state): ReadonlyMap<string, League> {
            return new Map(state.leagues.map(league => [league.id, league]));
        },
    },

    mutations: {
        markAsLoading(state) {
            state.isLoading = true;
        },

        markAsLoaded(state, leagues: League[]) {
            state.isLoading = false;
            state.isFailed = false;
            state.isLoaded = true;
            state.leagues = leagues;
        },

        markAsFailed(state) {
            state.isLoading = false;
            state.isFailed = true;
        },
    },

    actions: {
        async load({ state, dispatch }) {
            if (!state.leagues.length) {
                await dispatch("reload");
            }
        },

        async reload({ commit, rootState }) {
            commit("markAsLoading");

            try {
                const leagues = await rootState.api.getLeagues();
                commit("markAsLoaded", leagues);
            } catch (e) {
                commit("markAsFailed");
            }
        },
    },
};

export default module;
