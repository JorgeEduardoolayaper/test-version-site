import { Tournament, TournamentChat } from "./tournament";

export interface Window extends Required<StorableWindow> {
    tournament: Tournament;
}

export interface ChatWindow extends Required<StorableChatWindow> {
    tournamentChat: TournamentChat;
}

export interface StorableWindow {
    id: number;
    pendingOdds: PendingOdd[];
    selectedBetTypeTab: BetTypeTab;
    selectedTournamentInfoTab: TournamentInfoTab;
    selectedSportIds: string[];
    parlayWager: number;
    selectedGamePeriodTab: GamePeriodTab;
}

export interface StorableChatWindow {
    id: number;
}

export enum BetTypeTab {
    Straight = "Straight",
    Parlay = "Parlay",
    Pending = "Pending",
    History = "History",
}

export enum TournamentInfoTab {
    Games = "GAMES",
    Ranks = "RANKS",
    Prizes = "PRIZES",
}

export interface PendingOdd {
    tournamentEventId: number;
    externalId: string;
    oddId: number,
    period: GamePeriod;
    type: PendingOddType;
    odd: number;
    handicap?: string;
    wager?: number;
}

export enum PendingOddType {
    MoneyLineHome = "moneyline_home",
    MoneyLineAway = "moneyline_away",
    SpreadHome = "spread_home",
    SpreadAway = "spread_away",
    TotalUnder = "total_under",
    TotalOver = "total_over",
}

export enum GamePeriodTab {
    FullTime = "GAME LINE",
    FirstHalf = "FIRST HALF",
    SecondHalf = "SECOND HALF",
}
export enum GamePeriod {
    FullTime = "100",
    FirstHalf = "1",
    SecondHalf = "2",
}
