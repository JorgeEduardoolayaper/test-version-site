<template>
    <div style="background: white;" v-if="isDataLoaded">
        <pie type="donut" :series="series" :options="options" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "../../../../general/types/user";
import Pie from "../../chart/Pie.vue";
import VueApexCharts from "vue-apexcharts";

export default Vue.extend({
    name: "WinLossWidget",
    components: { Pie, apexchart: VueApexCharts },

    props: {
        isDataLoaded: Boolean,
        series: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            height: 100,
            options: {
                name: "Win/Loss percentage",
                labels: ["Win", "Loss", "Push"],
                labelColors: ["#1ab7ea", "#006622", "#ff00ff"],
            },
        };
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },
    },
});
</script>
