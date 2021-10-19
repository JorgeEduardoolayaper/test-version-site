<template>
    <div class="layout mystyle">
        <div class="layout__full">
            <div style="margin:auto">
                <div class="paging">
                    <div class="paging__item profile_title">
                        <i
                            v-if="this.$router.currentRoute.meta.sectionDisplay"
                            class="icon icon--left icon--large icon--color--light-1 m--r--4"
                            @click="goToHome"
                        ></i>
                        <div class="paging__item__title">Profile</div>
                    </div>
                </div>
                <div class="full_div">
                    <div
                        v-if="this.$router.currentRoute.meta.sectionDisplay"
                        class="col-xs-12 col-sm-12 col-md-4"
                    >
                        <div class="profile--card">
                            <div class="profile--card__holder">
                                <div
                                    class="profile--card__holder__image"
                                    :style="{ backgroundImage: `url(${backgroundUrl})` }"
                                >
                                    <div class="profile--card__holder__image__tag">
                                        {{ userLevel.name }}
                                    </div>
                                </div>
                            </div>
                            <div class="profile--card__username">
                                {{ user && user.name }}
                            </div>
                            <div class="profile--card__edit">
                                <button
                                    class="profile--card__edit__button"
                                    @click="handleEditProfile"
                                >
                                    EDIT PROFILE
                                </button>
                            </div>
                            <div class="seperator seperator--large seperator--marginless"></div>
                            <div class="profile--card__footer"></div>
                        </div>
                    </div>
                    <div v-if="statistics" class="right" style="width: 360px;flex-shrink: 0;">
                        <AvatarWidget />
                        <HighlightWidget :statistics="statistics" />
                        <UserReferralBottomWidget v-if="!islgMobile" />
                    </div>
                    <div v-if="statistics" class="left">
                        <div class="myrow" style="margin-bottom: 30px;">
                            <PersonalDataWidget />
                        </div>
                        <div class="myrow tournament_widget" style="margin-bottom: 30px;">
                            <TournamentWidget :statistics="statistics" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
//import { Nullable } from "../../../general/types/types";
import FormInput from "../../components/FormInput.vue";
import AvatarWidget from "./widgets/AvatarWidget.vue";
import TournamentWidget from "./widgets/TournamentWidget.vue";
import HighlightWidget from "./widgets/HighlightsWidget.vue";
import PersonalDataWidget from "./widgets/PersonalDataWidget.vue";
import UserReferralBottomWidget from "./widgets/UserReferralBottomWidget.vue";
import { User, UserStatistics, UserLevel } from "../../../general/types/user";
import { userAvatar, findUserLevel } from "../../utils/game/statistics";

export default Vue.extend({
    name: "ProfileView",
    components: {
        FormInput,
        AvatarWidget,
        TournamentWidget,
        HighlightWidget,
        PersonalDataWidget,
        UserReferralBottomWidget,
    },
    data() {
        return {
            errors: {},
        };
    },
    mounted() {
        this.loadStatistics();
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },

        statistics(): UserStatistics | null {
            let statistics = this.$stock.state.user.statistics;
            return statistics;
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

        islgMobile() {
            return window.innerWidth < 1351;
        },
    },

    methods: {
        goToHome(): void {
            this.$router.push("/lobby");
        },

        handleEditProfile(): void {
            this.$router.push("/profile-edit");
        },

        async loadStatistics() {
            this.$stock.dispatch("user/loadStatistics");
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
    },
});
</script>
<style lang="scss" scoped>
.mystyle {
    .layout__full {
        @media (max-width: 768px) {
            margin: 0 auto;
        }
        .profile_title {
            @media (max-width: 1150px) {
                margin: auto;
            }
            @media (max-width: 768px) {
                text-align: center;
            }
        }
        .full_div {
            display: flex;
            // flex-wrap: nowrap;
            @media (max-width: 1540px) {
                flex-direction: row;
            }

            @media (max-width: 1150px) {
                flex-direction: column;
            }
        }
        background: #f3f7fc;
        .container {
            padding: 8px 0px;
        }
        .paging {
            margin-bottom: 0;
            padding-left: 10px;
        }
        .paging__item__title {
            font-size: 36px;
            font-weight: bold;
            color: #1d232a;
        }
        .right {
            margin-right: 30px;
            @media (max-width: 1150px) {
                align-self: center;
                margin-right: 0px;
            }
            .layout_col {
                display: flex;
                flex-direction: column;
                margin-bottom: 30px;
            }
        }
        .left {
            @media (max-width: 1150px) {
                width: 360px;
            }
            margin-right: 20px;
            @media (max-width: 1150px) {
                margin: 0px 10px 0px 10px;
            }
            @media (min-width: 1150px) {
                width: 100%;
            }
            @media (max-width: 450px) {
                width: 360px;
            }
            div.layout_row {
                display: flex;
                @media (max-width: 1400px) {
                    flex-direction: column;
                }
            }
        }
        .right-sided {
            width: 360px;
            height: auto;
        }
        .myrow {
            background: white;
            padding: 20px 20px 40px 20px;
            border-radius: 7px;
            box-shadow: 0 0 2px rgba(black, 0.4);
            @media (min-width: 1400px) {
                display: flex;
            }

            .card {
                background: #fdfdcc;
                border: none;
                .lvlprogress__title,
                .lvlprogress__subtitle,
                .card__row__label {
                    color: #7c858b;
                }
                .card__row__value {
                    text-shadow: 1px 1px rgb(0 0 0 / 30%);
                    i {
                        background: gold;
                    }
                }
            }
        }
        .tournament_widget {
            padding: 30px 10px 0px 30px;
        }
        @media (max-width: 992px) {
            .tournament_widget {
                padding: 10px;
            }
        }
        span.comment {
            color: #909090;
            font-size: 12px;
        }
        .pos-right {
            position: absolute;
            right: 8px;
            top: 44px;
        }
        .fa {
            color: #909090;
            font-weight: 500;
        }
    }
}
</style>
