import { Module } from "vuex";
import { RootState } from "../types";
import { DeepReadonly } from "../../../general/types/types";
import { EventOdd } from "../../types/eventodd";

export interface EventOddState {
    isLoading: boolean;
    isLoaded: boolean;
    isFailed: boolean;
    eventOddsMap: Map<number, DeepReadonly<EventOdd>>;
    eventId: number,
}

const module: Module<EventOddState, RootState> = {
    namespaced: true,

    state: {
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        eventOddsMap: new Map(),
        eventId: 0,
    },

    getters: {
        eventOddDictionary(state): Map<number, DeepReadonly<EventOdd>> {
            return state.eventOddsMap;
        },
    },

    mutations: {
        markAsLoading(state, eventId) {
            state.isLoading = true;
            state.eventId = eventId;
        },

        markAsLoaded(state, eventOddCollection: EventOdd[]) {
            state.isLoading = false;
            state.isFailed = false;
            state.isLoaded = true;
            state.eventOddsMap = new Map(
                eventOddCollection.map(function(eventOdd) {
                    return [eventOdd.oddId, eventOdd];
                }),
                
            );
        },

        oddsUpdate(state, eventOdd: EventOdd) {
            state.eventOddsMap.set(eventOdd.oddId, eventOdd);
        },

        markAsFailed(state) {
            state.isLoading = false;
            state.isFailed = true;
        },
    },
};

export default module;
