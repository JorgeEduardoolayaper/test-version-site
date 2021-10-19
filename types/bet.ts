import { GamePeriod, PendingOddType } from "./window";

export interface Bet {
    chipsWager: number;
    chipsWin: number;
    events: BetEvent[];
    id: number;
    status: BetStatus;
    tournamentId: number;
}

export interface BetEvent {
    id: number;
    externalId: string;
    odd: number;
    scoreAway: number | null;
    scoreHome: number | null;
    selectedTeam: string | null;
    startsAt: string;
    status: BetStatus;
    teamAway: string;
    teamHome: string;
    type: PendingOddType;
    period: GamePeriod;
    handicap: string;
    leagueId: number;
    sportId: number;
}

export enum BetStatus {
    Win = "win",
    Loss = "loss",
    Push = "push",
    Pending = "pending",
}

export interface UserBet extends Bet {
    userName: string;
}
