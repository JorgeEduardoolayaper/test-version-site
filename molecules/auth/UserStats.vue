<template>
    <div>
        <div class="stats-dashboard-section p-4">
            <!-- Charts -->
            <UserStatsWidgets />

            <!--table-->
            <div
                class="layout__content__container__content__container layout__content__container__content__container__ex"
                style="overflow:scroll;"
            >
                <div class="table d--only--desktop">
                    <div class="table__header table__header__ex">
                        <div class="table__header__label table__header__label__ex">BUY-IN</div>
                        <div class="table__header__label table__header__label__ex">START</div>
                        <div class="table__header__label_long table__header__label_long__ex">
                            TOURNAMENT NAME
                        </div>
                        <div class="table__header__label table__header__label__ex">STATUS</div>
                        <div class="table__header__label table__header__label__ex">PLAYERS</div>
                    </div>
                </div>
                <div class="tournament">
                    <div
                        class="tournament--desktop__ex tournament--desktop"
                        @dblclick="openTournament(tournament)"
                        v-for="(tournament, index) in filteredTournaments"
                        :key="`${tournament.name}-desktop-${index}`"
                    >
                        <div class="tournament--desktop__item tournament--desktop__item__ex">
                            {{ tournament.buyIn | formatDollars }}
                        </div>
                        <div class="tournament--desktop__item tournament--desktop__item__ex">
                            {{ tournament.starts | toDateTime12Format }}
                        </div>
                        <div class="tournament--desktop__name tournament--desktop__name__ex">
                            {{ tournament.name }}
                        </div>
                        <div
                            :state-val="`${tournament.state}`"
                            class="tournament--desktop__item tournament--desktop__item__ex tournament__state__content tournament--desktop__item__ex__custom"
                        >
                            {{ tournament.state }}
                        </div>
                        <div class="tournament--desktop__item tournament--desktop__item__ex">
                            {{ tournament.players.length }}
                        </div>
                    </div>

                    <div
                        class="tournament--mobile"
                        style="margin-bottom: 10px;"
                        v-for="(tournament, index) in filteredTournaments"
                        :key="`${tournament.name}-mobile-${index}`"
                    >
                        <div
                            class="tournament--mobile__container"
                            style="background:white;"
                            @click="openTournament(tournament)"
                        >
                            <div class="tournament--mobile__container__sidebar">
                                <div class="tournament--mobile__container__sidebar__date">
                                    <div
                                        class="tournament--mobile__container__sidebar__date__weekday"
                                        style="color:black;"
                                    >
                                        {{ getWeekday(tournament.starts) }}
                                    </div>
                                    <div class="tournament--mobile__container__sidebar__date__day">
                                        {{ getDate(tournament.starts) }}
                                    </div>
                                    <div
                                        class="tournament--mobile__container__sidebar__date__month"
                                        style="color:black;"
                                    >
                                        {{ getMonth(tournament.starts) }}
                                    </div>
                                </div>
                                <div class="tournament--mobile__container__sidebar__time">
                                    <div
                                        class="tournament--mobile__container__sidebar__time__hour"
                                        style="color:black;"
                                    >
                                        {{ getTime(tournament.starts) }}
                                    </div>
                                    <div
                                        class="tournament--mobile__container__sidebar__time__timezone"
                                        style="color:black;"
                                    >
                                        ET
                                    </div>
                                </div>
                            </div>
                            <div class="tournament--mobile__container__content">
                                <div class="tournament--mobile__container__content__status">
                                    {{ tournament.state }}
                                </div>
                                <div
                                    class="tournament--mobile__container__content__title"
                                    style="color:black;"
                                >
                                    <strong>{{ tournament.name }} </strong>
                                </div>
                                <div class="tournament--mobile__container__content__icons">
                                    <i
                                        class="icon icon--color--light-2 icon--nano m--r--1"
                                        v-for="(gameItem, index1) in getGames(tournament)"
                                        :key="`${gameItem}-mobile-${index1}`"
                                        :class="`${gameItem}`"
                                    />
                                </div>
                                <div class="tournament--mobile__container__content__details">
                                    <div
                                        class="tournament--mobile__container__content__details__item"
                                        style="color: black;"
                                    >
                                        <i class="icon icon--people icon--micro"></i>
                                        {{ tournament.players.length }}
                                    </div>
                                    <div
                                        class="tournament--mobile__container__content__details__item"
                                        style="color: black;"
                                    >
                                        <i class="icon icon--calendar icon--micro"></i>
                                        {{ tournament.timeFrame }}
                                    </div>
                                </div>
                                <div class="tournament--mobile__container__content__prices">
                                    <div
                                        class="tournament--mobile__container__content__prices__item"
                                    >
                                        <div
                                            class="tournament--mobile__container__content__prices__item__label"
                                        >
                                            BUY-IN
                                        </div>
                                        <div
                                            class="tournament--mobile__container__content__prices__item__price"
                                            style="color:black;"
                                        >
                                            {{ tournament.buyIn | formatDollars }}
                                        </div>
                                    </div>
                                    <div
                                        class="tournament--mobile__container__content__prices__item"
                                    >
                                        <div
                                            class="tournament--mobile__container__content__prices__item__label"
                                        >
                                            PRIZE POOL
                                        </div>
                                        <div
                                            class="tournament--mobile__container__content__prices__item__price"
                                            style="color:black;"
                                        >
                                            {{ tournament.prizePoolMoney | formatDollars }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="tournament--mobile__buttons"
                            @click="openMobileTournament(tournament)"
                        >
                            <div
                                class="tournament--mobile__buttons__button"
                                style="background:white;color:black;"
                            >
                                <i class="icon icon--micro icon--games m--r--2"></i>
                                GAMES
                            </div>
                            <div
                                class="tournament--mobile__buttons__button"
                                style="background:white;color:black;"
                            >
                                <i class="icon icon--micro icon--rank m--r--2"></i>
                                RANKS
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.tournament--desktop:hover {
    border: none !important;
}
</style>
<script lang="ts">
import Vue from "vue";
import { Game } from "../../types/game";
import { Tournament } from "../../types/tournament";
import UserStatsWidgets from "./UserStatsWidgets.vue";
import { User, UserPlayer } from "../../../general/types/user";

export default Vue.extend({
    name: "UserStats",
    components: { UserStatsWidgets },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },

        filteredTournaments(): Tournament[] {
            let tournaments: Tournament[] = this.$stock.getters[
                "tournamentList/filteredTournaments"
            ];
            let filtered = [];
            filtered = tournaments.filter(tournament => {
                const playersDict: ReadonlyMap<number, UserPlayer> = this.$stock.getters[
                    "user/playersDictByTournament"
                ];
                if (playersDict.has(tournament.id)) {
                    return tournament;
                }
                return null;
            });
            return filtered;
        },

        isLoading(): boolean {
            return this.$stock.state.tournamentList.isLoading;
        },

        isFailed(): boolean {
            return this.$stock.state.tournamentList.isFailed;
        },
    },

    methods: {
        goToHome(): void {
            this.$router.push("/lobby");
        },

        handleEditProfile(): void {
            this.$router.push("/profile-edit");
        },

        pieStyles(percent: number) {
            if (!percent) {
                return "";
            }
            let style = "background: conic-gradient(#00beff 0%, #00beff ";
            style = style + percent;
            style = style.concat("%, transparent ");
            style = style + percent;
            style = style.concat("%, transparent 100%) 50% 50% / 100% 100% no-repeat;");
            return style;
        },
        appendSuffix(rank: number) {
            if (!rank || rank === 0) {
                return "";
            }
            let suffix = "";
            switch (rank) {
                case 1:
                    suffix = "st";
                    break;
                case 2:
                    suffix = "nd";
                    break;
                case 3:
                    suffix = "rd";
                    break;
                default:
                    suffix = "th";
                    break;
            }
            return rank + suffix;
        },

        openTournament(tournament: Tournament): void {
            this.$stock.commit("window/openWindow", tournament.id);
            this.$router.push(`/tournaments/${tournament.id}`);
        },

        getGames(tournament: Tournament): String[] {
            let games: any[] = [];
            const sportsNames = ["Baseball", "American Football", "Basketball", "Ice Hockey"];
            const iconNames = [
                "icon--sport-baseball",
                "icon--sport-nfl",
                "icon--sport-nba",
                "icon--sport-hockey",
            ];
            tournament.games.forEach(game => {
                const index = sportsNames.indexOf(this.getSportName(game));
                games.push(iconNames[index]);
            });
            let uniqueArray: any[] = [...new Set(games)];
            return uniqueArray;
        },

        getWeekday(day: Date): string {
            const newDate = new Date(day);
            const wd = newDate.getDay();
            let str_wd = "";
            switch (wd) {
                case 0:
                    str_wd = "SUN";
                    break;
                case 1:
                    str_wd = "MON";
                    break;
                case 2:
                    str_wd = "TUE";
                    break;
                case 3:
                    str_wd = "WED";
                    break;
                case 4:
                    str_wd = "THU";
                    break;
                case 5:
                    str_wd = "FRI";
                    break;
                case 6:
                    str_wd = "SAT";
                    break;
                default:
                    break;
            }
            return str_wd;
        },

        getDate(day: Date): number {
            const newDate = new Date(day);
            return newDate.getDate();
        },

        getMonth(day: Date): string {
            const newDate = new Date(day);
            const wd = newDate.getMonth();
            let str_month = "";
            switch (wd) {
                case 0:
                    str_month = "JAN";
                    break;
                case 1:
                    str_month = "FEB";
                    break;
                case 2:
                    str_month = "MAR";
                    break;
                case 3:
                    str_month = "APR";
                    break;
                case 4:
                    str_month = "MAY";
                    break;
                case 5:
                    str_month = "JUN";
                    break;
                case 6:
                    str_month = "JUL";
                    break;
                case 7:
                    str_month = "AUG";
                    break;
                case 8:
                    str_month = "SEP";
                    break;
                case 9:
                    str_month = "OCT";
                    break;
                case 10:
                    str_month = "NOV";
                    break;
                case 11:
                    str_month = "DEC";
                    break;
                default:
                    break;
            }
            return str_month;
        },

        getTime(day: Date): string {
            const newDate = new Date(day);
            return newDate.getHours() + "." + newDate.getMinutes();
        },

        getSportName(game: Game): string {
            const dict: ReadonlyMap<string, string> = this.$stock.getters["sport/sportDictionary"];
            return dict.get(game.sportId) ?? String(game.sportId);
        },

        openMobileTournament(tournament: Tournament): void {
            this.$stock.commit("window/openWindow", tournament.id);
            this.$router.push(`/tour_info/${tournament.id}`);
        },
    },
});
</script>
