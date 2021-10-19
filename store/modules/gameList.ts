import { Module } from "vuex";
import { RootState } from "../types";
import {
    Game
} from "../../types/game";
import { updateField } from "../utils";
import { filterGame } from "../../utils/game/filter";

export interface GameListState {
    games: Game[];
    isLoading: boolean;
    isLoaded: boolean;
    isFailed: boolean;    
    search: string,
}

const module: Module<GameListState, RootState> = {
    namespaced: true,    
    state: {
        games: [],
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        search: "",
    },

    getters: {
        filteredGames(state): Game[] {
            const search = state.search.toLowerCase();
            return state.games.filter(game =>
                filterGame(
                    game,
                    search,
                ),
            );
        },
    },

    mutations: {
        updateField,        
        markAsLoading(state) {
            state.isLoading = true;
        },        
        
        markAsLoaded(state, games: Game[]) {
            state.isLoading = false;
            state.isLoaded = true;
            state.isFailed = false;
            state.games = games;
        },        
        
        markAsFailed(state) {
            state.isLoading = false;
            state.isFailed = true;
        },

        clearSearch(state) {
            state.search = "";
        },
    },    
    
    actions: {    
       
    },
};

export default module;