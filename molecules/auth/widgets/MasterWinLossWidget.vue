<template>
    <div class="row h-100 my-4">
        <div class="col-md-6">
            <div class="card_stats shadow">
                <LeagueWinLossWidget
                    :sports="sports"
                    :sportNames="sportNames"
                    :isDataLoaded="isDataLoaded"
                />
            </div>
        </div>
        <div class="col-md-6">
            <div class="card_stats shadow">
                <WinLossWidget :series="series" :isDataLoaded="isDataLoaded" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User, TournamentPlayer } from "../../../../general/types/user";
import { Bet, BetEvent } from "../../../types/bet";
import WinLossWidget from "./WinLossWidget.vue";
import LeagueWinLossWidget from "./LeagueWinLossWidget.vue";
export default Vue.extend({
    name: "MasterWinLossWidget",
    components: { WinLossWidget, LeagueWinLossWidget },

    data() {
        return {
            series: <number[]>[],
            isDataLoaded: false,
            tournamentPlayersEmpty: false,
            tournamentPlayers: <TournamentPlayer[]>[],
            processedBets: {},
            leagues: new Map(),
            sportNames: <string[]>[],
            sports: new Map(),
        };
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },
    },

    mounted() {
        this.getMeBets();
    },

    methods: {
        getSportName(sportId: number): string {
            const dict: ReadonlyMap<string, string> = this.$stock.getters["sport/sportDictionary"];
            return dict.get(String(sportId)) ?? String(sportId);
        },

        handleBetsByLeagues(): void {
            let i;
            let total: number = 0;
            let leagueMap = new Map();
            for (i = 0; i < this.tournamentPlayers.length; i++) {
                let bets: Bet[] = this.tournamentPlayers[i].bets;
                let betIndex;
                if (!bets || bets.length > 0) {
                    total = total + bets.length;
                    for (betIndex = 0; betIndex < bets.length; betIndex++) {
                        let bet: Bet = bets[betIndex];
                        let events: BetEvent[] = bet.events;
                        if (!events || events.length > 0) {
                            let eventIndex;
                            for (eventIndex = 0; eventIndex < events.length; eventIndex++) {
                                let betEvent: BetEvent = events[eventIndex];
                                let leagueId: number = betEvent.leagueId;
                                let eventStatus: string = betEvent.status;
                                this.getUpdatedCurrentBetCounts(eventStatus, leagueId, leagueMap);
                            }
                        }
                    }
                }
            }

            this.leagues = leagueMap;
        },

        getUpdatedCurrentBetCounts(eventStatus: string, keyId: any, itemMap: Map<any, any>): void {
            let currentCnt: number = 0;
            let currentWins: number = 0;
            let currentlosses: number = 0;
            let currentPushes: number = 0;

            if (itemMap.has(keyId)) {
                currentCnt = itemMap.get(keyId).get("total");
                currentWins = itemMap.get(keyId).get("totalWins");
                currentlosses = itemMap.get(keyId).get("totallosses");
                currentPushes = itemMap.get(keyId).get("totalPushes");
                itemMap.delete(keyId);
            }

            currentCnt = currentCnt + 1;
            if (eventStatus === "win") {
                currentWins = currentWins + 1;
            } else if (eventStatus === "loss") {
                currentlosses = currentlosses + 1;
            } else if (eventStatus === "push") {
                currentPushes = currentPushes + 1;
            }

            let sportValMap = new Map();
            sportValMap.set("total", currentCnt);
            sportValMap.set("totalWins", currentWins);
            sportValMap.set("totallosses", currentlosses);
            sportValMap.set("totalPushes", currentPushes);
            itemMap.set(keyId, sportValMap);
        },

        handleBetsBySports(): void {
            let i;
            let sportsArray: string[] = [];
            let sportMap = new Map();
            for (i = 0; i < this.tournamentPlayers.length; i++) {
                let bets: Bet[] = this.tournamentPlayers[i].bets;
                let betIndex;
                if (!bets || bets.length > 0) {
                    for (betIndex = 0; betIndex < bets.length; betIndex++) {
                        let bet: Bet = bets[betIndex];
                        let events: BetEvent[] = bet.events;
                        if (!events || events.length > 0) {
                            let eventIndex;
                            for (eventIndex = 0; eventIndex < events.length; eventIndex++) {
                                let betEvent: BetEvent = events[eventIndex];
                                let sportIdTmp: number = betEvent.sportId;
                                let sportId: string = this.getSportName(sportIdTmp);
                                let eventStatus: string = betEvent.status;
                                if (!sportsArray.includes(sportId)) {
                                    sportsArray.push(sportId);
                                }
                                this.getUpdatedCurrentBetCounts(eventStatus, sportId, sportMap);
                            }
                        }
                    }
                }
            }

            this.sports = sportMap;
            this.sportNames = sportsArray;
        },

        handleWinLoss(): void {
            let i;
            let total: number = 0;
            let wins: number = 0;
            let losses: number = 0;
            let pushes: number = 0;
            for (i = 0; i < this.tournamentPlayers.length; i++) {
                let bets: Bet[] = this.tournamentPlayers[i].bets;
                let betIndex;
                if (!bets || bets.length > 0) {
                    total = total + bets.length;
                    for (betIndex = 0; betIndex < bets.length; betIndex++) {
                        let bet: Bet = bets[betIndex];
                        let betStatus: string = bet.status;
                        if (betStatus === "win") {
                            wins = wins + 1;
                        } else if (betStatus === "loss") {
                            losses = losses + 1;
                        } else if (betStatus === "push") {
                            pushes = pushes + 1;
                        }
                    }
                }
            }

            this.series[0] = this.roundToTwo((wins / total) * 100);
            this.series[1] = this.roundToTwo((losses / total) * 100);
            this.series[2] = this.roundToTwo((pushes / total) * 100);
        },

        async getMeBets() {
            try {
                this.tournamentPlayers = await this.$stock.state.api.getMeBets();
                if (!this.tournamentPlayers || this.tournamentPlayers.length == 0) {
                    this.tournamentPlayersEmpty = true;
                } else {
                    this.handleWinLoss();
                    this.handleBetsBySports();
                }
                this.isDataLoaded = true;
            } catch (e) {
                console.error(e);
            }
        },

        roundToTwo(num: number): number {
            return Math.round((num + Number.EPSILON) * 100) / 100;
        },
    },
});
</script>
