<template>
    <div class="text-center py-3 mb-5">
        <a href="#">
            <!-- <i class="fal fa-ellipsis-h float-right f-size"/> -->
        </a>
        <br />
        <div class="d-flex justify-center w-100">
            <img class="profile__avatar" :src="backgroundUrl" />
        </div>
        <h4 class="pt-3 white--text">
            <b>{{ fullname }}</b>
        </h4>
        <h6 class="white--text">{{ userLevel.name }}</h6>
        <v-layout row d-flex justify-center m-0 style="background:transparent">
            <v-flex xs8>
                <v-progress-linear
                    color="amber"
                    rounded
                    :value="userLevel.percent"
                    height="7"
                ></v-progress-linear>
            </v-flex>
        </v-layout>
        <div class="lvlprogress__subtitle text-white">
            {{ userCredits }} / {{ this.userLevel.threshhold }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User, UserLevel } from "../../../general/types/user";
import { userAvatar, findUserLevel } from "../../utils/game/statistics";

export default Vue.extend({
    name: "Profile",

    computed: {
        fullname(): String {
            return this.user?.firstname == "" && this.user.lastname == ""
                ? this.user.name
                : this.user?.firstname + " " + this.user?.lastname;
        },
        user(): User | null {
            return this.$stock.state.user.user;
        },
        isAuthenticated(): Boolean {
            return !!this.user;
        },
        backgroundUrl(): string {
            //@TODOD: Add unique avatar for each user
            return userAvatar(this.user?.id ?? -1);
        },
        userLevel(): UserLevel {
            return findUserLevel(this.userCredits);
        },
        userCredits(): number {
            return this.user?.balance ?? 0;
        },
    },

    methods: {},
});
</script>
