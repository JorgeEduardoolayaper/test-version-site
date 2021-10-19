<template>
    <div v-if="isDataLoaded">
        <RadialBar
            type="radialBar"
            :series="series"
            :options="options"
            :dataValues="wins"
            :titleMeta="legendRankTitles"
            :height="height"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserBet, BetStatus } from "../../../types/bet";
import { User } from "../../../../general/types/user";
import RadialBar from "../../chart/RadialBar.vue";
import Bar from "../../chart/RadialBar.vue";
import VueApexCharts from "vue-apexcharts";

export default Vue.extend({
    name: "LegendaryWins",
    components: { RadialBar, Bar, apexchart: VueApexCharts },

    data() {
        return {
            userNames: [] as string[],
            wins: [] as number[],
            isDataLoaded: false,
            legendaryWins: {} as ReadonlyMap<number, UserBet>,
            titleColor: "#E6005C",
            meLabel: "You",
            maxWinRecords: 4,
            meColor: "#1ab7ea",
            chartColors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
            height: 230,
        };
    },

    mounted() {
        this.loadLegendaryWins();
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },

        series(): number[] {
            const maxWin = Math.max(...this.wins);
            return this.wins.map(win => Math.ceil((win * 100) / maxWin));
        },

        labels(): string[] {
            return this.userNames;
        },

        labelColors(): string[] {
            let colors = [] as string[];
            this.labels.forEach((label, index) => {
                if (label == this.meLabel) {
                    colors.push(this.meColor);
                } else {
                    colors.push(this.chartColors[index]);
                }
            });
            return colors;
        },
        options(): Object {
            return {
                labels: this.labels,
                labelColors: this.labelColors,
                title: this.title,
                plotOptions: {
                    radialBar: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 270,
                        hollow: {
                            margin: 5,
                            size: "30%",
                            background: "transparent",
                            image: undefined,
                        },
                        dataLabels: {
                            name: {
                                show: false,
                            },
                            value: {
                                show: false,
                            },
                        },
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        type: "horizontal",
                        shadeIntensity: 0.5,
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100],
                    },
                },
            };
        },
        title(): any {
            return {
                text: "Legendary Wins",
                color: this.titleColor,
            };
        },
        legendRankTitles(): string[] {
            return this.labels.map((each, index) => {
                if (index == this.maxWinRecords) {
                    return '<span style="color:orange;"> <strong>' + each + "</strong></span>";
                }
                const rank = index + 1;
                return (
                    '<span style="color:orange;"> <strong>' + "RANK #" + rank + "</strong></span>"
                );
            });
        },
    },
    methods: {
        async loadLegendaryWins() {
            try {
                const response = await this.$stock.state.api.getLegendaryWins();
                this.legendaryWins = new Map(response.map(bet => [bet.id, bet]));
                const me = this.user?.name ?? "";
                this.legendaryWins.forEach(each => {
                    if (each.status != BetStatus.Loss) {
                        let userName = each.userName;
                        if (userName == me) {
                            userName = this.meLabel;
                        }
                        this.userNames.push(userName);
                        let chipsWin = each.chipsWin;
                        this.wins.push(chipsWin);
                    }
                });
                this.isDataLoaded = true;
            } catch (e) {
                console.error(e);
            }
        },
    },
});
</script>
