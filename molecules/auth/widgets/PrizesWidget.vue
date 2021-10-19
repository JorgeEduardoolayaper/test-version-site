<template>
    <div v-if="userRewardsEmpty">
        <div class="card_stats shadow">
            <div class="threedots-disabled">
                <i disabled class="fa fa-ellipsis-h" aria-hidden="true"></i>
            </div>
            <div class="prize-image-ex1">
                <v-card
                    elevation="2"
                    class="pa-2 pb-12 my-2 rounded-lg mx-xl-13 mx-lg-2 mx-md-6 mx-sm-2 mx-auto"
                    style="padding:unset !important;"
                >
                    <div class="px-4 pb-2" style="width:80%;margin:auto">
                        <img class="img-fluid" :src="topRewardImageUrl" />
                    </div>
                    <v-card-subtitle class="py-0" style="color: black; font-size:1rem">
                        {{ this.topReward.productCode }}
                    </v-card-subtitle>
                    <v-card-subtitle class="d-flex justify-space-between py-2">
                        <span>$ {{ this.topReward.price }}</span>
                        <span>
                            <v-icon color="amber">mdi-star-circle</v-icon>
                            {{ this.topReward.credits }}
                        </span>
                    </v-card-subtitle>
                </v-card>
            </div>
            <div class="prize-image-ex1">
                <v-card
                    elevation="2"
                    class="pa-2 pb-12 my-2 rounded-lg mx-xl-13 mx-lg-2 mx-md-6 mx-sm-2 mx-auto"
                    style="padding:unset !important;"
                >
                    <div class="px-4 pb-2" style="width:80%;margin:auto">
                        <img class="img-fluid" :src="secondTopRewardImageUrl" />
                    </div>
                    <v-card-subtitle class="py-0" style="color: black; font-size:1rem">
                        {{ this.secondTopReward.productCode }}
                    </v-card-subtitle>
                    <v-card-subtitle class="d-flex justify-space-between py-2">
                        <span>$ {{ this.secondTopReward.price }}</span>
                        <span>
                            <v-icon color="amber">mdi-star-circle</v-icon>
                            {{ this.secondTopReward.credits }}
                        </span>
                    </v-card-subtitle>
                </v-card>
            </div>
        </div>
    </div>
    <div v-else>
        <div v-if="showUserRewardsSelected">
            <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
                style="display:contents !important;"
            >
                <div class="popups__background">
                    <v-btn icon color="black" @click="hideAllUserRewards" style="z-index:10">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <div
                        class="popups__content"
                        v-for="(userReward, index) in userRewards"
                        :key="'userReward-' + index"
                    >
                        <v-card
                            elevation="2"
                            class="pa-2 pb-12 my-2 rounded-lg mx-xl-13 mx-lg-2 mx-md-6 mx-sm-2 mx-auto"
                            style="padding:unset !important;"
                        >
                            <v-card-title
                                class="headline justify-end d-flex"
                                style="margin-bottom:-10px;"
                            >
                                <v-icon class="heart-icon">mdi-heart-outline</v-icon>
                            </v-card-title>
                            <div class="px-4 pb-2" style="margin:auto">
                                <img class="img-fluid" :src="imageUrl(userReward)" />
                            </div>
                            <v-card-subtitle class="py-0" style="color: black; font-size:1rem">
                                {{ userReward.productCode }}
                            </v-card-subtitle>

                            <v-card-subtitle class="d-flex justify-space-between py-2">
                                <span>$ {{ userReward.price }}</span>
                                <span>
                                    <v-icon color="amber">mdi-star-circle</v-icon>
                                    {{ userReward.credits }}
                                </span>
                            </v-card-subtitle>
                        </v-card>
                    </div>
                </div>
            </v-dialog>
        </div>
        <div class="card_stats shadow">
            <div class="threedots" @click="showAllUserRewards()">
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
            </div>
            <div class="prize-image-ex1">
                <v-card
                    elevation="2"
                    class="pa-2 pb-12 my-2 rounded-lg mx-xl-13 mx-lg-2 mx-md-6 mx-sm-2 mx-auto"
                    style="padding:unset !important;"
                >
                    <div class="px-4 pb-2" style="width:80%;margin:auto">
                        <img class="img-fluid" :src="topUserRewardImageUrl" />
                    </div>
                    <v-card-subtitle class="py-0" style="color: black; font-size:1rem">
                        {{ this.topUserReward.productCode }}
                    </v-card-subtitle>
                    <v-card-subtitle class="d-flex justify-space-between py-2">
                        <span>$ {{ this.topUserReward.price }}</span>
                        <span>
                            <v-icon color="amber">mdi-star-circle</v-icon>
                            {{ this.topUserReward.credits }}
                        </span>
                    </v-card-subtitle>
                </v-card>
            </div>
            <div class="prize-image-ex1">
                <v-card
                    elevation="2"
                    class="pa-2 pb-12 my-2 rounded-lg mx-xl-13 mx-lg-2 mx-md-6 mx-sm-2 mx-auto"
                    style="padding:unset !important;"
                >
                    <div class="px-4 pb-2" style="height:80%;margin:auto">
                        <img class="img-fluid" :src="secondTopUserRewardImageUrl" />
                    </div>
                    <v-card-subtitle class="py-0" style="color: black; font-size:1rem">
                        {{ this.secondTopUserReward.productCode }}
                    </v-card-subtitle>
                    <v-card-subtitle class="d-flex justify-space-between py-2">
                        <span>$ {{ this.secondTopUserReward.price }}</span>
                        <span>
                            <v-icon color="amber">mdi-star-circle</v-icon>
                            {{ this.secondTopUserReward.credits }}
                        </span>
                    </v-card-subtitle>
                </v-card>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { User } from "../../../../general/types/user";
import { Reward } from "../../../types/prize";
import { AxiosError } from "axios";

export default Vue.extend({
    name: "PrizesWidget",

    data() {
        return {
            errors: {},
            rewards: <Reward[]>[],
            userRewards: <Reward[]>[],
            userRewardsEmpty: false,
            topReward: <Reward>{},
            secondTopReward: <Reward>{},
            topUserReward: <Reward>{},
            secondTopUserReward: <Reward>{},
            showUserRewardsSelected: false,
            dialog: false,
            testStr: "",
        };
    },

    mounted() {
        this.getUserRewards();
        this.getRewards();
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },

        topRewardImageUrl(): string {
            return this.topReward.image_path;
        },

        secondTopRewardImageUrl(): string {
            return this.secondTopReward.image_path;
        },

        topUserRewardImageUrl(): string {
            return this.topUserReward.image_path;
        },

        secondTopUserRewardImageUrl(): string {
            return this.secondTopUserReward.image_path;
        },
    },

    methods: {
        goToHome(): void {
            this.$router.push("/lobby");
        },

        showAllUserRewards(): void {
            this.showUserRewardsSelected = true;
            this.dialog = true;
        },

        hideAllUserRewards(): void {
            this.showUserRewardsSelected = false;
            this.dialog = false;
        },

        imageUrl(reward: Reward): string {
            return reward.image_path;
        },

        async getRewards() {
            try {
                this.rewards = await this.$stock.state.api.rewards();
                if (this.userRewardsEmpty) {
                    if (!this.rewards || this.rewards.length == 0) {
                    } else {
                        let i;
                        let highestCredit = -2454635434;
                        let secondHighestCredit = -2454635434;
                        for (i = 0; i < this.rewards.length; i++) {
                            if (this.rewards[i].credits >= highestCredit) {
                                secondHighestCredit = highestCredit;
                                this.secondTopReward = this.topReward;
                                highestCredit = this.rewards[i].credits;
                                this.topReward = this.rewards[i];
                            } else if (
                                this.rewards[i].credits != highestCredit &&
                                this.rewards[i].credits > secondHighestCredit
                            ) {
                                secondHighestCredit = this.rewards[i].credits;
                                this.secondTopReward = this.rewards[i];
                            }
                        }
                    }
                }
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
        },

        async getUserRewards() {
            try {
                this.userRewards = await this.$stock.state.api.userRewards();
                if (!this.userRewards || this.userRewards.length == 0) {
                    this.userRewardsEmpty = true;
                } else {
                    let i;
                    let highestCredit = -2454635434;
                    let secondHighestCredit = -2454635434;
                    for (i = 0; i < this.userRewards.length; i++) {
                        if (this.userRewards[i].credits >= highestCredit) {
                            secondHighestCredit = highestCredit;
                            this.secondTopUserReward = this.topUserReward;
                            highestCredit = this.userRewards[i].credits;
                            this.topUserReward = this.userRewards[i];
                        } else if (
                            this.userRewards[i].credits != highestCredit &&
                            this.userRewards[i].credits > secondHighestCredit
                        ) {
                            secondHighestCredit = this.userRewards[i].credits;
                            this.secondTopUserReward = this.userRewards[i];
                        }
                    }
                }
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
        },
    },
});
</script>
