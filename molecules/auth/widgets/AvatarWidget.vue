<template>
    <div>
        <div style="width: 360px; margin-bottom: 30px;">
            <div class="avatar">
                <div class="upload_photo_btn">
                    <img class="profile__avatar" :src="backgroundUrl" />
                    <span class="camera-btn">
                        <i class="fa fa-camera" aria-hidden="true"></i>
                    </span>
                </div>
                <span style="font-size:18px"
                    >{{ fullname
                    }}<i
                        class="fa fa-pencil"
                        aria-hidden="true"
                        style="font-size:18px;color:#1b73f9"
                    ></i
                ></span>
                <span style="font-size:12px">{{ user.country }}</span>
            </div>
            <div class="myrow" style="padding: 30px;margin-top:20px">
                <UserLevelWidget :statistics="statistics" :userLevel="userLevel" :user="user" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserLevelWidget from "./UserLevelWidget.vue";
import { User, UserLevel } from "../../../../general/types/user";
import { userAvatar, findUserLevel } from "../../../utils/game/statistics";

export default Vue.extend({
    name: "AvatarWidget",

    components: { UserLevelWidget },

    data() {
        return {
            errors: {},
        };
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },

        fullname(): String {
            return this.user?.firstname == "" && this.user.lastname == ""
                ? this.user.name
                : this.user?.firstname + " " + this.user?.lastname;
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

<style lang="scss" scoped>
.avatar {
    width: 360px;
    height: 220px;
    border-radius: 10px 10px 0px 0px;
    background-size: 120% auto;
    background-image: url("/assets/i/users/profile.jpg");
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    color: #fff;
    .upload_photo_btn {
        position: relative;
        margin-bottom: 15px;
    }
    .profile__avatar {
        width: 100px;
        height: 100px;
    }
    .camera-btn {
        display: block;
        position: absolute;
        right: -8px;
        bottom: 0px;
        width: 37px;
        height: 37px;
        border-radius: 100%;
        background: #1b73f9;
        .fa {
            color: #fff;
            position: absolute;
            top: 22%;
            left: 25%;
        }
    }
}
.myrow {
    background: white;
    padding: 20px 20px 40px 20px;
    border-radius: 7px;
    box-shadow: 0 0 2px rgba(black, 0.4);
    @media (min-width: 1400px) {
        display: flex;
    }
}
</style>
