<template>
    <div class="myrow layout_col">
        <div style="padding-bottom: 25px;">
            <span class="title"><b>Highlights</b></span>
        </div>
        <div class="lvlprogress">
            <div class="first_title">
                {{ this.statistics.firstBestTournament
                }}<span class="badge">{{ this.statistics.firstBestTournament ? "1st" : "" }}</span>
            </div>
        </div>
        <div class="lvlprogress">
            <div class="second_title">
                {{ this.statistics.secondBestTournament
                }}<span class="badge">{{ this.statistics.secondBestTournament ? "2nd" : "" }}</span>
            </div>
        </div>
        <div class="lvlprogress">
            <div class="third__title">
                {{ this.statistics.thirdBestTournament
                }}<span class="badge">{{ this.statistics.thirdBestTournament ? "3rd" : "" }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Highlight",

    props: {
        statistics: Object,
    },
    mounted() {},

    data() {
        return {};
    },

    computed: {},

    methods: {},
});
</script>

<style lang="scss" scoped>
.myrow {
    background: white;
    padding: 20px 20px 40px 20px;
    border-radius: 7px;
    box-shadow: 0 0 2px rgba(black, 0.4);
    @media (min-width: 1400px) {
        display: flex;
    }
}
.layout_col {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
span.title {
    padding-right: 50px;
    padding-bottom: 15px;
    color: rgb(27, 115, 249);
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(60, 60, 60, 0.4);
}
.lvlprogress {
    height: 60px;
    padding-bottom: 10px;
}
.lvlprogress__title {
    color: #7c858b;
}
.first_title {
    color: gold;
    font-size: 20px;
    font-weight: 900;
    text-align: left;
    font-style: italic;
    span {
        color: gold;
        float: right;
    }
}
.second_title {
    color: green;
    font-size: 20px;
    font-weight: 900;
    text-align: left;
    font-style: italic;
    span {
        color: green;
        float: right;
    }
}
.third__title {
    color: red;
    font-size: 20px;
    font-weight: 900;
    text-align: left;
    font-style: italic;
    span {
        color: red;
        float: right;
    }
}
</style>
