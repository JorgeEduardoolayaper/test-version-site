import Vuex, { Store } from "vuex";
import axios from "axios";
import authModal from "./modules/authModal";
import chat from "./modules/chat";
import odd from "./modules/odd";
import eventodd from "./modules/eventodd";
import sport from "./modules/sport";
import league from "./modules/league";
import loader from "./modules/loader";
import placeBet from "./modules/placeBet";
import user from "./modules/user";
import tournamentList from "./modules/tournamentList";
import tournamentHistoryList from "./modules/tournamentHistoryList";
import windowModule from "./modules/window";
import playerBetInfo from "./modules/playerBetInfo";
import gameList from "./modules/gameList";
import prizes from "./modules/prizes";
import { Api } from "../api/Api";
import { RootState } from "./types";

export const createStore = (): Store<RootState> => {
    const axiosInstance = axios.create({
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
    });

    return new Vuex.Store({
        state: {
            api: new Api(axiosInstance),
        } as any,
        modules: {
            authModal,
            chat,
            loader,
            odd,
            eventodd,
            placeBet,
            sport,
            league,
            tournamentList,
            tournamentHistoryList,
            playerBetInfo,
            gameList,
            user,
            prizes,
            window: windowModule,
        },
        strict: process.env.NODE_ENV !== "production",
    });
};
