<template>
    <div v-if="isCreditsDataLoaded">
        <Bar :data="data" :options="options" type="bar" :isHorizontal="false" :title="title" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Bar from "../../chart/Bar.vue";
import { UserCredits } from "../../../../general/types/user";
import moment from "moment";

export default Vue.extend({
    components: { Bar },
    name: "CreditsWidget",

    data() {
        return {
            userCredits: [] as UserCredits[],
            creditsChartData: {},
            isCreditsDataLoaded: false,
            titleColor: "#E6005C",
            subtitleColor: "#E6005C",
        };
    },

    mounted() {
        this.loadCredits();
    },

    computed: {
        labelsXaxis(): String[] {
            return moment.monthsShort();
        },

        data(): number[] {
            const data: number[] = [];
            const creditsData = this.creditsDataGroupByMonth;
            const months = moment.monthsShort();
            months.forEach(month => {
                const credits = creditsData[month] ?? 0;
                data.push(credits);
            });
            return data;
        },

        options(): any {
            let options = {
                name: "Credits",
                labels: this.labelsXaxis,
                title: this.title,
                subtitle: { text: "Credits", color: this.subtitleColor },
            };
            return options;
        },

        title(): any {
            return {
                text: [this.data.reduce((a, b) => a + b, 0)],
                color: this.titleColor,
            };
        },

        creditsDataGroupByMonth(): Record<string, number> {
            const datePastYear = moment().subtract(1, "year");
            const results = this.userCredits.reduce<Record<string, number>>(
                (objectsByKeyValue, creditsRecord) => {
                    const date = moment(creditsRecord.paidDate);
                    if (date.isAfter(datePastYear)) {
                        const value = date.format("MMM");
                        objectsByKeyValue[value] =
                            (objectsByKeyValue[value] ?? 0) + creditsRecord.credits;
                    }
                    return objectsByKeyValue;
                },
                {},
            );
            return results;
        },
    },
    methods: {
        async loadCredits() {
            try {
                this.userCredits = await this.$stock.state.api.getMeCredits();
                this.isCreditsDataLoaded = true;
            } catch (e) {
                console.error(e);
            }
        },
    },
});
</script>
