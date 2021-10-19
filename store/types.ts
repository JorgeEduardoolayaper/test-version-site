import { WindowState } from "./modules/window";
import { TournamentListState } from "./modules/tournamentList";
import { GameListState } from "./modules/gameList";
import { Api } from "../api/Api";
import { SportState } from "./modules/sport";
import { OddState } from "./modules/odd";
import { UserState } from "./modules/user";
import { LoaderState } from "./modules/loader";
import { PlaceBetState } from "./modules/placeBet";
import { ChatState } from "./modules/chat";
import { AuthModalState } from "./modules/authModal";
import {TournamentHistoryListState} from "./modules/tournamentHistoryList";
import {PrizesState} from "./modules/prizes";

export interface RootState {
    api: Api;
    authModal: AuthModalState;
    chat: ChatState;
    loader: LoaderState;
    odd: OddState;
    placeBet: PlaceBetState;
    sport: SportState;
    tournamentList: TournamentListState;
    gameList : GameListState;
    tournamentHistoryList: TournamentHistoryListState;
    user: UserState;
    prizes: PrizesState;
    window: WindowState;
}

export interface UpdateFieldPayload<T> {
    field: keyof T;
    value: T[keyof T];
}
