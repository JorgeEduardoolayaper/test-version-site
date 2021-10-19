<template>
    <div>
        <div class="tournament_row" style="margin-bottom: 35px;">
            <span class="level_description">{{ this.userLevel.name }}</span>
            <img src="/assets/i/temp/icon-penta-cup.png" />
        </div>
        <div class="tournament_row" style="margin-bottom: 35px;">
            <div class="lvlprogress">
                <div class="lvlprogress__title">
                    Status
                </div>
                <div class="lvlprogress__bar">
                    <div
                        class="lvlprogress__bar__value"
                        :style="{
                            width: `${
                                this.userLevel.percent > 100 ? 100 : this.userLevel.percent
                            }%`,
                            background: '#1973f6',
                        }"
                    />
                </div>
                <div class="lvlprogress__subtitle">
                    {{ credits }} / {{ this.userLevel.threshhold }}
                </div>
            </div>
        </div>
        <div class="text_row"></div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "UserLevelWidget",

    props: {
        user: Object,
        userLevel: Object,
        credits: Number,
    },
});
</script>

<style lang="scss" scoped>
.tournament_row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 65px;
}
.level_description {
    color: #1973f6;
    font-family: Georgia, serif;
    font-size: 35px;
    font-weight: bold;
}
.lvlprogress {
    height: 60px;
    padding-bottom: 25px;
}
.lvlprogress__title {
    color: #7c858b;
}
.lvlprogress__subtitle {
    color: #7c858b;
}
.text_row {
    margin-top: 25px;
    p {
        font-size: 14px;
        color: #101010;
    }
}
</style>
