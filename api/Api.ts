import { AxiosInstance } from "axios";
import {
    mapMe,
    mapMeStatistics,
    mapEventOddCollection,
    mapEventOdd,
    mapTournament,
    mapTournamentPlayer,
    mapUserCredits,
    mapUserBet,
} from "./mappings";
import { Tournament } from "../types/tournament";
import { Reward } from "../types/prize";
import { Address } from "../types/address";
import { Sport } from "../../general/types/sport";
import { User, UserStatistics, UserCredits, TournamentPlayer } from "../../general/types/user";
import { UserBet } from "../types/bet";
import { GamePeriod, PendingOddType } from "../types/window";
import { EventOdd, EventOddCollection } from "../types/eventodd";

export interface PlaceStraightBetBody {
    pending_odds: Array<{
        event_id: number;
        type: PendingOddType;
        wager: number;
        period: GamePeriod;
    }>;
}

export interface PlaceParlayBetBody {
    pending_odds: Array<{
        event_id: number;
        type: PendingOddType;
        period: GamePeriod;
    }>;
    wager: number;
}

export interface UserEditBody {
    firstname: string;
    lastname: string;
    phone: number | null;
}

export interface SignInBody {
    email: string;
    password: string;
}

export interface SignUpBody {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    firstname: string;
    lastname: string;
    dob: string;
    referrer_name: string;
    country: string | null;
    phone: number | null;
}

export interface ForgotPasswordBody {
    email: string;
}

export interface UserReferralBody {
    email: string;
}

export interface ResetPasswordBody {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}

export interface ChangePasswordBody {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export interface ChangeEmailBody {
    current_password: string;
    email: string;
}

export interface ChangeProfileBody {
    name: string;
    firstname: string;
    lastname: string;
}

export interface WithdrawBody {
    amount: number | null;
    btcAddress: string;
}

export interface ClaimPrizeBody {
    userid: number;
    prizeid: number;
    prizecost: number;
    fullname: string;
    address: Address;
}

export class Api {
    public constructor(private readonly axios: AxiosInstance) {
        //
    }

    public async getTournamentHistory(): Promise<Tournament[]> {
        const response = await this.axios.get("/api/history");
        return response.data.map(mapTournament);
        //return response.map(mapTournament);
    }

    public async getTournaments(): Promise<Tournament[]> {
        const response = await this.axios.get("/api/tournaments");
        return response.data.map(mapTournament);
    }

    public async getSports(): Promise<Sport[]> {
        const response = await this.axios.get("/api/sports");
        return response.data;
    }

    public async getLeagues(): Promise<Sport[]> {
        const response = await this.axios.get("/api/leagues");
        return response.data;
    }

    public async getOdds(): Promise<EventOddCollection[]> {
        const response = await this.axios.get("/api/odds");
        return response.data.map(mapEventOddCollection);
    }

    public async getEventOdds(gameExternalId: string): Promise<EventOdd[]> {
        const response = await this.axios.get(`/api/odds/event/${gameExternalId}`);
        return response.data.map(mapEventOdd);
    }

    public async getMe(): Promise<User> {
        const response = await this.axios.get("/api/me");
        return mapMe(response.data);
    }

    public async getMeStatistics(): Promise<UserStatistics> {
        const response = await this.axios.get("/api/me/statistics");
        return mapMeStatistics(response.data);
    }

    public async getTournamentPlayer(
        tournamentId: number,
        playerId: number,
    ): Promise<TournamentPlayer> {
        const response = await this.axios.get(`/api/tournament/${tournamentId}/player/${playerId}`);
        return mapTournamentPlayer(response.data);
    }

    public async getReferralLink(): Promise<any> {
        const response = await this.axios.get("/api/me/referralLink");
        return response.data;
    }

    public async getEmailList(): Promise<any> {
        const response = await this.axios.get("/api/getEmailList");
        return response.data;
    }

    public async getRankingList(): Promise<any> {
        const response = await this.axios.get("/api/getRankingList");
        return response.data;
    }

    public async signIn(body: SignInBody): Promise<void> {
        await this.axios.post("/api/signin", body);
    }

    public async handleUserInfoChanges(body: UserEditBody): Promise<void> {
        await this.axios.post("/api/me/handleUserInfoChanges", body);
    }

    public async referUser(body: UserReferralBody): Promise<void> {
        const response = await this.axios.post("/api/me/refer-user", body);
        return response.data;
    }

    public async forgotPassword(body: ForgotPasswordBody): Promise<void> {
        await this.axios.post("/api/me/forgot-password", body);
    }

    public async resetPassword(body: ResetPasswordBody): Promise<void> {
        await this.axios.post("/api/me/reset-password", body);
    }

    public async signUp(body: SignUpBody): Promise<void> {
        await this.axios.post("/api/signup", body);
    }

    public async changePassword(body: ChangePasswordBody): Promise<void> {
        await this.axios.post("/api/me/change-password", body);
    }

    public async changeEmail(body: ChangeEmailBody): Promise<void> {
        await this.axios.post("/api/me/change-email", body);
    }

    public async changeProfile(body: ChangeProfileBody): Promise<void> {
        await this.axios.post("/api/me/change-profile", body);
    }

    public async logout(): Promise<void> {
        await this.axios.post("/api/logout");
    }

    public async placeStraightBet(tournamentId: number, body: PlaceStraightBetBody): Promise<void> {
        await this.axios.post(`/api/tournaments/${tournamentId}/bets/straight`, body);
    }

    public async placeParlayBet(tournamentId: number, body: PlaceParlayBetBody): Promise<void> {
        await this.axios.post(`/api/tournaments/${tournamentId}/bets/parlay`, body);
    }

    public async registerForTournament(tournamentId: number): Promise<void> {
        await this.axios.post(`/api/tournaments/${tournamentId}/register`);
    }

    public async withdraw(body: WithdrawBody): Promise<void> {
        await this.axios.post("/api/withdraw/btc", body);
    }

    public async claimReward(body: ClaimPrizeBody): Promise<Boolean> {
        return await this.axios.post("/api/claim-reward", body);
    }
    public async rewards(): Promise<Reward[]> {
        const response = await this.axios.get("/api/rewards");
        return response.data;
    }

    public async userRewards(): Promise<Reward[]> {
        const response = await this.axios.get("/api/me/rewards");
        return response.data;
    }

    public async getMeCredits(): Promise<UserCredits[]> {
        const response = await this.axios.get("/api/me/credits-history");
        return response.data.map(mapUserCredits);
    }

    public async getLegendaryWins(): Promise<UserBet[]> {
        const response = await this.axios.get("/api/legendary-wins");
        return response.data.map((item: any) => mapUserBet(item));
    }

    public async getMeBets(): Promise<TournamentPlayer[]> {
        const response = await this.axios.get("/api/me/bets");
        return response.data;
    }
}
