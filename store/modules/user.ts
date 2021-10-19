import { Module } from "vuex";
import { RootState } from "../types";
import { User, UserPlayer, UserStatistics } from "../../../general/types/user";
import { UNAUTHORIZED } from "http-status-codes";
import { AxiosError } from "axios";

export interface UserState {
    isLoading: boolean;
    isFailed: boolean;
    user: User | null;
    statistics: UserStatistics | null;
}

const module: Module<UserState, RootState> = {
    namespaced: true,

    state: {
        isLoading: false,
        isFailed: false,
        user: null,
        statistics: null,
    },

    getters: {
        playersDictByTournament(state): ReadonlyMap<number, UserPlayer> {
            return new Map(state.user?.players.map(player => [player.tournamentId, player]) ?? []);
        },
    },

    mutations: {
        markAsLoading(state) {
            state.isLoading = true;
        },

        markAsLoaded(state, user: User) {
            state.isLoading = false;
            state.isFailed = false;
            state.user = user;
            state.statistics = null;
        },

        markAsFailed(state, e: AxiosError) {
            if (e.response?.status === UNAUTHORIZED) {
                state.user = null;
                state.statistics = null;
            }

            state.isLoading = false;
            state.isFailed = true;
        },

        unsetUser(state) {
            state.isLoading = false;
            state.isFailed = false;
            state.user = null;
            state.statistics = null;
        },
        setStatistics(state, statistics: UserStatistics) {
            state.statistics = statistics;
        },
    },

    actions: {
        async load({ state, dispatch }) {
            if (!state.user) {
                await dispatch("reload");
            }
        },

        async reload({ commit, rootState }) {
            commit("markAsLoading");
            try {
                const user = await rootState.api.getMe();
                commit("markAsLoaded", user);
            } catch (e) {
                commit("markAsFailed", e);
            }
        },

        async logout({ commit, rootState }) {
            try {
                await rootState.api.logout();
                commit("unsetUser");
            } catch (e) {
                console.error(e);
            }
        },

        async loadStatistics({ commit, rootState }) {
            try {
                const statistics = await rootState.api.getMeStatistics();
                commit("setStatistics", statistics);
            } catch (e) {
                console.error(e);
            }
        },
    },
};

export default module;
