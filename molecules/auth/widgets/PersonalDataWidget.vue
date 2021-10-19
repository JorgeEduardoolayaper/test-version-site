<template>
    <div class="layout_full">
        <div class="quater3-w">
            <PersonalInformWidget />
        </div>
        <div class="quater1-w" v-if="!islgMobile">
            <UserReferralWidget />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import PersonalInformWidget from "./PersonalInformWidget.vue";
import UserReferralWidget from "./UserReferralWidget.vue";

export default Vue.extend({
    name: "PersonalDataWidget",

    components: { PersonalInformWidget, UserReferralWidget },

    computed: {
        islgMobile() {
            return window.innerWidth < 1351;
        },
    },
});
</script>

<style lang="scss" scoped>
.layout_full {
    display: flex;
    @media (max-width: 1150px) {
        flex-direction: column;
    }
}
.quater3-w {
    padding: 0px 30px 0px 40px;
    width: 100%;

    // @media (min-width: 1150px) {
    //     width: 60%;
    // }
    @media (max-width: 1350px) {
        width: 100%;
    }
}
.quater1-w {
    padding: 0 20px;
    width: 40%;

    @media (max-width: 1350px) {
        width: 40%;
        // display: none;
    }
}
</style>
