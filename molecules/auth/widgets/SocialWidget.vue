<template>
    <div class="layout_col social-border">
        <div class="social_row">
            <h6 style="color:#1b73f9; font-size: 20px"><b>Social</b></h6>
            <button class="btn btn-primary btn-rounder save_btn">
                Save
            </button>
        </div>
        <div class="social_row border-top">
            <span
                ><img src="/assets/i/site_icons/fb.png" alt="" /><span
                    v-show="!facebookEditing"
                    style="padding-left: 10px;"
                    >/{{ facebookName }}</span
                ></span
            >
            <span v-show="!facebookEditing">
                <label class="mb-0 switch__">
                    <input type="checkbox" checked />
                    <span class="smsliderbutton round"></span>
                </label>
                <i class="fa fa-edit" aria-hidden="true" @click="editFacebook(facebookName)"></i>
            </span>
            <span v-show="facebookEditing">
                <div style="display: flex; margin-left: 10px;">
                    <input
                        @keypress.enter="facebookEditing = false"
                        v-model="facebookName"
                        type="text"
                        :errors="errors.facebookName"
                        required
                        class="form-control"
                    />
                    <button class="btn btn-ligtht btn-rounder" @click="cancelFacebook()">
                        Cancel
                    </button>
                </div>
            </span>
        </div>
        <div class="social_row border-top">
            <span
                ><img src="/assets/i/site_icons/tw.png" alt="" /><span
                    v-show="!twitterEditing"
                    style="padding-left: 10px;"
                >
                    /{{ twitterName }}</span
                ></span
            >
            <span v-show="!twitterEditing">
                <label class="mb-0 switch__">
                    <input type="checkbox" unchecked />
                    <span class="smsliderbutton round"></span>
                </label>
                <i class="fa fa-edit" aria-hidden="true" @click="twitterEditing = true"></i>
            </span>
            <span v-show="twitterEditing">
                <div style="display: flex; margin-left: 10px;">
                    <input
                        @keypress.enter="twitterEditing = false"
                        v-model="twitterName"
                        type="text"
                        :errors="errors.twitterName"
                        required
                        class="form-control"
                    />
                    <button class="btn btn-ligtht btn-rounder" @click="twitterEditing = false">
                        Cancel
                    </button>
                </div>
            </span>
        </div>
        <div class="social_row border-top">
            <span
                ><img src="/assets/i/site_icons/in.png" alt="" /><span
                    v-show="!linkedinEditing"
                    style="padding-left: 10px;"
                    >/{{ linkedinName }}</span
                ></span
            >
            <span v-show="!linkedinEditing">
                <label class="mb-0 switch__">
                    <input type="checkbox" checked />
                    <span class="smsliderbutton round"></span>
                </label>
                <i class="fa fa-edit" aria-hidden="true" @click="linkedinEditing = true"></i>
            </span>
            <span v-show="linkedinEditing">
                <div style="display: flex; margin-left: 10px;">
                    <input
                        @keypress.enter="linkedinEditing = false"
                        v-model="linkedinName"
                        type="text"
                        :errors="errors.linkedinName"
                        required
                        class="form-control"
                    />
                    <button class="btn btn-ligtht btn-rounder" @click="linkedinEditing = false">
                        Cancel
                    </button>
                </div>
            </span>
        </div>
        <div class="social_row border-top">
            <span
                ><img src="/assets/i/site_icons/ig.png" alt="" /><span
                    v-show="!lgEditing"
                    style="padding-left: 10px;"
                    >/{{ lgName }}</span
                ></span
            >
            <span v-show="!lgEditing">
                <label class="mb-0 switch__">
                    <input type="checkbox" checked />
                    <span class="smsliderbutton round"></span>
                </label>
                <i class="fa fa-edit" aria-hidden="true" @click="lgEditing = true"></i>
            </span>
            <span v-show="lgEditing">
                <div style="display: flex; margin-left: 10px;">
                    <input
                        @keypress.enter="lgEditing = false"
                        v-model="lgName"
                        type="text"
                        :errors="errors.lgName"
                        required
                        class="form-control"
                    />
                    <button class="btn btn-ligtht btn-rounder" @click="lgEditing = false">
                        Cancel
                    </button>
                </div>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "SocialWidget",

    data() {
        return {
            errors: {},

            facebookEditing: false,
            twitterEditing: false,
            linkedinEditing: false,
            lgEditing: false,

            facebookName: this.$stock.state.user.user?.facebookName ?? "Scott",
            twitterName: this.$stock.state.user.user?.twitterName ?? "Scott Morales",
            linkedinName: this.$stock.state.user.user?.linkedinName ?? "Scott Morales",
            lgName: this.$stock.state.user.user?.lgName ?? "Scott Morales",
            oldFacebook: "",
            oldTwitter: "",
            oldLinkedIn: "",
            oldLg: "",
        };
    },
    methods: {
        editFacebook(e: string) {
            this.oldFacebook = e;
            this.facebookEditing = true;
        },
        cancelFacebook() {
            this.facebookName = this.oldFacebook;
            this.facebookEditing = false;
        },
        editTwitter(e: string) {
            this.oldTwitter = e;
            this.twitterEditing = true;
        },
        cancelTwitter() {
            this.twitterName = this.oldTwitter;
            this.twitterEditing = false;
        },
        editLinkedIn(e: string) {
            this.oldLinkedIn = e;
            this.linkedinEditing = true;
        },
        cancelLinkedIn() {
            this.linkedinName = this.oldLinkedIn;
            this.linkedinEditing = false;
        },
        editLg(e: string) {
            this.oldLg = e;
            this.lgEditing = true;
        },
        cancelLg() {
            this.lgName = this.oldLg;
            this.lgEditing = false;
        },
    },
});
</script>

<style lang="scss" scoped>
.social_row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 65px;
}
.layout_col {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}
.social-border {
    border-radius: 0px 0px 10px 10px;
}
.fa-edit {
    color: #909090;
    font-weight: 500;
    font-size: 16px;
}
.smsliderbutton.round {
    border-radius: 3px;
}
.save_btn {
    padding: 1px 10px;
    border-radius: 5px;
}
</style>
