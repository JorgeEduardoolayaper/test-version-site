<template>
    <div class="layout_full">
        <div class="half-w social_widget">
            <SocialWidget />
        </div>
        <div class="half-w" style="padding-bottom: 10px;">
            <div class="card">
                <table>
                    <tbody>
                        <tr>
                            <td>Total chips won</td>
                            <td class="mytag radius-top">
                                {{ statistics.totalChipsWon | formatChip }}
                            </td>
                        </tr>
                        <tr>
                            <td>Largest Tournament Takedown</td>
                            <td class="mytag">{{ largestTournamentTakeDown }}</td>
                        </tr>
                        <tr>
                            <td>Best tournament finish</td>
                            <td class="mytag">{{ bestTournamentFinish }}</td>
                        </tr>
                        <tr>
                            <td>Legendary Bet</td>
                            <td class="mytag">{{ statistics.largestBetWon | formatChip }}</td>
                        </tr>
                        <tr>
                            <td>In the money rate</td>
                            <td class="mytag radius-bottom">{{ statistics.inMoneyRate }}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import SocialWidget from "./SocialWidget.vue";
import { User, UserStatistics, UserLevel } from "../../../../general/types/user";
import { findUserLevel } from "../../../utils/game/statistics";

export default Vue.extend({
    name: "TournamentWidget",

    components: { SocialWidget },

    props: {
        statistics: Object as PropType<UserStatistics>,
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },
        userLevel(): UserLevel {
            return findUserLevel(this.userCredits);
        },

        userCredits(): number {
            return this.user?.balance ?? 0;
        },
        bestTournamentFinish(): string {
            let bestTournament = this.statistics?.bestTournamentFinish ?? 0;
            if (bestTournament == 0) {
                return "-";
            }
            return this.appendSuffix(bestTournament);
        },
        largestTournamentTakeDown(): string {
            if (this.statistics?.largestTournamentTakeDown == 0) {
                return "NO WINS";
            } else if (this.statistics?.largestTournamentTakeDown == 1) {
                return this.statistics?.largestTournamentTakeDown + " PLAYER";
            } else {
                return this.statistics?.largestTournamentTakeDown + " PLAYERS";
            }
        },
    },

    methods: {
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
    },
});
</script>

<style lang="scss" scoped>
.my_style {
    width: 100%;
}
.layout_full {
    display: flex;
    width: 100%;
    flex-direction: row;
    @media (max-width: 1350px) {
        flex-direction: column;
    }
}
.social_widget {
    padding: 20px 70px 20px 20px;
    @media (max-width: 768px) {
        padding: 20px;
    }
}
.half-w {
    width: 100%;
    padding: 0 20px;

    @media (min-width: 1400px) {
        width: 100%;
    }
    @media (max-width: 768px) {
        padding: 10px;
    }
}
.card {
    background: #fdfdcc;
    border: none;
    td.mytag {
        width: 15%;
        color: #fff;
        background: #ff6600;
        text-align: center;
    }
    tr {
        height: 60px;
        border-bottom: 1px solid rgb(60, 60, 60, 0.4);
    }
    tr:hover {
        background: inherit;
        td:nth-child(odd) {
            color: inherit;
        }
    }
    tr:nth-child(even) {
        background: inherit;
    }
    tr:last-child {
        border-bottom: 0px solid #fff;
    }
}
@media (max-width: 1150px) {
    .card table tbody td {
        white-space: normal;
    }
    .card table tbody td:nth-child(2) {
        padding: 0.5rem;
    }
}
.radius-top {
    border-radius: 5px 5px 0px 0px;
}
.radius-bottom {
    border-radius: 0px 0px 5px 5px;
}
</style>
