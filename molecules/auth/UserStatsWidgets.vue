<template>
    <div>
        <div
            class="tournament--desktop__ex tournament--desktop"
            style="display:block"
            v-if="!isMobile"
        >
            <!--legendary, win/loss, win/loss/push-->
            <div class="row h-100 my-4 tournament--desktop__item d--only--desktop">
                <div class="col-lg-4 col-md-4 col-sm-6">
                    <div
                        class="card_stats tournament--desktop__ex tournament--desktop shadow h-100"
                    >
                        <WinLossWidget :series="series" :isDataLoaded="isDataLoaded" />
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6">
                    <div
                        class="card_stats tournament--desktop__ex tournament--desktop shadow h-100"
                    >
                        <LeagueWinLossWidget
                            :sports="sports"
                            :sportNames="sportNames"
                            :isDataLoaded="isDataLoaded"
                        />
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6">
                    <div
                        class="card_stats tournament--desktop__ex tournament--desktop shadow h-100"
                    >
                        <legendary-wins />
                    </div>
                </div>
            </div>
            <!-- credit, prize -->
            <div class="row my-4 tournament--desktop__item d--only--desktop">
                <div class="credits-widget">
                    <div
                        class="card_stats tournament--desktop__ex tournament--desktop shadow w-100"
                    >
                        <credits-widget />
                    </div>
                </div>
                <div class="prizes-widget">
                    <div class="card_stats tournament--desktop__ex tournament--desktop shadow ">
                        <PrizesWidget />
                    </div>
                </div>
            </div>

            <!--banner-->
            <div class="row my-3 tournament--desktop__item">
                <div class="col-md-12">
                    <img
                        class="img-fluid"
                        src="/assets/i/temp/stats-banner-img.jpg"
                        style="width:100%"
                    />
                </div>
            </div>
        </div>
        <div class="tournament--mobile" style="background:none;" v-if="isMobile">
            <div class="row h-100 my-4 ">
                <div class="col-md-12">
                    <div class=" card_stats shadow">
                        <credits-widget />
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card_stats shadow">
                        <legendary-wins />
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card_stats shadow">
                        <LeagueWinLossWidget
                            :sports="sports"
                            :sportNames="sportNames"
                            :isDataLoaded="isDataLoaded"
                        />
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card_stats shadow">
                        <WinLossWidget :series="series" :isDataLoaded="isDataLoaded" />
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="card_stats shadow">
                        <PrizesWidget />
                    </div>
                </div>
            </div>
            <!--banner-->
            <div class="row my-3">
                <div class="col-md-12">
                    <img
                        class="img-fluid"
                        src="/assets/i/temp/stats-banner-img.jpg"
                        style="width:100%"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.tournament--desktop:hover {
    border: 1px solid transparent !important;
}
.credits-widget {
    display: flex;
    width: 69.5%;
    padding: 12px;
    @media (max-width: 1264px) {
        width: 66.5%;
    }
    @media (min-width: 1264px) {
        width: 70%;
    }
    @media (min-width: 1351px) {
        width: 68.5%;
    }

    @media (min-width: 1700px) {
        width: 67%;
    }
}
.prizes-widget {
    display: flex;
    width: 30.5%;
    padding: 12px;
    @media (max-width: 1264px) {
        width: 33.5%;
    }
    @media (min-width: 1264px) {
        width: 30%;
    }
    @media (min-width: 1351px) {
        width: 31.5%;
    }
    @media (min-width: 1700px) {
        width: 33%;
    }
}
</style>
<script lang="ts">
import Vue from "vue";
import { User, TournamentPlayer } from "../../../general/types/user";
import { Bet, BetEvent } from "../../types/bet";
import CreditsWidget from "./widgets/CreditsWidget.vue";
import LegendaryWins from "./widgets/LegendaryWins.vue";
import WinLossWidget from "./widgets/WinLossWidget.vue";
import LeagueWinLossWidget from "./widgets/LeagueWinLossWidget.vue";
import PrizesWidget from "./widgets/PrizesWidget.vue";
export default Vue.extend({
    name: "UserStatsWidgets",

    components: { CreditsWidget, LegendaryWins, WinLossWidget, LeagueWinLossWidget, PrizesWidget },

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
            totalBets: 0,
            totalWins: 0,
            totallosses: 0,
            totalPushes: 0,
        };
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },
        isMobile() {
            return window.innerWidth < 993;
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

        async getMeBets() {
            try {
                this.tournamentPlayers = await this.$stock.state.api.getMeBets();
                if (!this.tournamentPlayers || this.tournamentPlayers.length == 0) {
                    this.tournamentPlayersEmpty = true;
                } else {
                    let i;
                    let total: number = 0;
                    let wins: number = 0;
                    let losses: number = 0;
                    let pushes: number = 0;
                    let leagueMap = new Map();
                    let sportsArray: string[] = [];
                    let sportMap = new Map();
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

                                let events: BetEvent[] = bet.events;
                                if (!events || events.length > 0) {
                                    let eventIndex;
                                    let currentCnt: number = 0;
                                    let currentSportCnt: number = 0;

                                    for (eventIndex = 0; eventIndex < events.length; eventIndex++) {
                                        let betEvent: BetEvent = events[eventIndex];
                                        let leagueId: number = betEvent.leagueId;
                                        let sportIdTmp: number = betEvent.sportId;
                                        let sportId: string = this.getSportName(sportIdTmp);
                                        let currentWins: number = 0;
                                        let currentlosses: number = 0;
                                        let currentPushes: number = 0;
                                        let currentSportWins: number = 0;
                                        let currentSportlosses: number = 0;
                                        let currentSportPushes: number = 0;
                                        let eventStatus: string = betEvent.status;
                                        if (!sportsArray.includes(sportId)) {
                                            sportsArray.push(sportId);
                                        }
                                        if (eventStatus === "win") {
                                            currentWins = 1;
                                            currentSportWins = 1;
                                            if (leagueMap.has(leagueId)) {
                                                currentWins =
                                                    leagueMap.get(leagueId).get("totalWins") + 1;
                                                currentlosses = leagueMap
                                                    .get(leagueId)
                                                    .get("totallosses");
                                                currentPushes = leagueMap
                                                    .get(leagueId)
                                                    .get("totalPushes");
                                            }
                                            if (sportMap.has(sportId)) {
                                                currentSportWins =
                                                    sportMap.get(sportId).get("totalWins") + 1;
                                                currentSportlosses = sportMap
                                                    .get(sportId)
                                                    .get("totallosses");
                                                currentSportPushes = sportMap
                                                    .get(sportId)
                                                    .get("totalPushes");
                                            }
                                        } else if (eventStatus === "loss") {
                                            currentlosses = 1;
                                            currentSportlosses = 1;
                                            if (leagueMap.has(leagueId)) {
                                                currentWins = leagueMap
                                                    .get(leagueId)
                                                    .get("totalWins");
                                                currentlosses =
                                                    leagueMap.get(leagueId).get("totallosses") + 1;
                                                currentPushes = leagueMap
                                                    .get(leagueId)
                                                    .get("totalPushes");
                                            }
                                            if (sportMap.has(sportId)) {
                                                currentSportWins = sportMap
                                                    .get(sportId)
                                                    .get("totalWins");
                                                currentSportlosses =
                                                    sportMap.get(sportId).get("totallosses") + 1;
                                                currentSportPushes = sportMap
                                                    .get(sportId)
                                                    .get("totalPushes");
                                            }
                                        } else if (eventStatus === "push") {
                                            currentPushes = 1;
                                            currentSportPushes = 1;
                                            if (leagueMap.has(leagueId)) {
                                                currentWins = leagueMap
                                                    .get(leagueId)
                                                    .get("totalWins");
                                                currentlosses = leagueMap
                                                    .get(leagueId)
                                                    .get("totallosses");
                                                currentPushes =
                                                    leagueMap.get(leagueId).get("totalPushes") + 1;
                                            }
                                            if (sportMap.has(sportId)) {
                                                currentSportWins = sportMap
                                                    .get(sportId)
                                                    .get("totalWins");
                                                currentSportlosses = sportMap
                                                    .get(sportId)
                                                    .get("totallosses");
                                                currentSportPushes =
                                                    sportMap.get(sportId).get("totalPushes") + 1;
                                            }
                                        }

                                        if (leagueMap.has(leagueId)) {
                                            currentCnt = leagueMap.get(leagueId).get("total") + 1;
                                            leagueMap.delete(leagueId);
                                        } else {
                                            currentCnt = 1;
                                        }
                                        if (sportMap.has(sportId)) {
                                            currentSportCnt =
                                                sportMap.get(sportId).get("total") + 1;
                                            sportMap.delete(sportId);
                                        } else {
                                            currentSportCnt = 1;
                                        }

                                        let leagueValMap = new Map();
                                        leagueValMap.set("total", currentCnt);
                                        leagueValMap.set("totalWins", currentWins);
                                        leagueValMap.set("totallosses", currentlosses);
                                        leagueValMap.set("totalPushes", currentPushes);
                                        leagueMap.set(leagueId, leagueValMap);

                                        let sportValMap = new Map();
                                        sportValMap.set("total", currentSportCnt);
                                        sportValMap.set("totalWins", currentSportWins);
                                        sportValMap.set("totallosses", currentSportlosses);
                                        sportValMap.set("totalPushes", currentSportPushes);
                                        sportMap.set(sportId, sportValMap);
                                    }
                                }
                            }
                        }
                    }

                    this.totalBets = total;
                    this.totalWins = wins;
                    this.totallosses = losses;
                    this.totalPushes = pushes;
                    this.series[0] = this.roundToTwo((wins / total) * 100);
                    this.series[1] = this.roundToTwo((losses / total) * 100);
                    this.series[2] = this.roundToTwo((pushes / total) * 100);
                    this.leagues = leagueMap;
                    this.sports = sportMap;
                    this.sportNames = sportsArray;
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
