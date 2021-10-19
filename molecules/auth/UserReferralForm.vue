<template>
    <div class="layout">
        <div class="layout__center mystyle">
            <div class="layout__center__wrapper container__content">
                <h2 class="pagetitle pagetitle__border text--center" style="color:black">
                    USER REFERRAL
                </h2>
                <div
                    style="margin-top:-30px; margin-bottom:30px; font-size:0.75rem; text-align:center"
                >
                    <span>Sign up your friends to compete against them!</span>
                </div>
                <div class="form__control m--b--4">
                    <span
                        class="label label--large"
                        style="color:black;display:inline;padding-right:4px;font-size:16px;"
                        >Referral Link</span
                    >
                    <div style="display:flex;align-items:center">
                        <!-- <i v-clipboard:copy="referralLink" class="fas fa-copy"></i> -->
                        <div
                            class="profile__referral__link"
                            style="overflow-x:hidden;text-overflow:ellipsis; background-color:#f3f7fc;padding:6px;border-radius:3px "
                        >
                            <span
                                class="profile__referral__link__text"
                                style="background:transparent;color:black;white-space:nowrap;font-size:14px"
                                >{{ this.referralLink }}</span
                            >
                            <!-- <i
                            v-clipboard:copy="referralLink"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            class="profile__referral__icon fas fa-copy"
                        >
                        </i> -->
                        </div>
                        <button
                            v-clipboard:copy="referralLink"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            class="submit_button"
                            type="button"
                        >
                            Copy
                        </button>
                    </div>
                </div>
                <div class="seperator"></div>
                <div
                    v-if="email_sent"
                    class="alert alert-success email-sent"
                    style="margin-bottom:20px;"
                >
                    The email has been sent
                </div>
                <form class="form" @submit.prevent="referUser">
                    <div class="form__control m--b--4">
                        <label class="label label--large">E-MAIL</label>
                        <FormInput
                            id="form-email"
                            inputClass="input input--large"
                            placeHolder="Ex. john@google.com"
                            type="email"
                            autocomplete="email"
                            :errors="errors.email"
                            v-model="email"
                            required
                        />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block text-white">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import VueToast from "vue-toast-notification";
import { AxiosError } from "axios";
import FormInput from "../../components/FormInput.vue";

import "vue-toast-notification/dist/theme-sugar.css";

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(VueToast);
export default Vue.extend({
    name: "UserReferralForm",
    components: { FormInput },

    data() {
        return {
            errors: {},
            email: "",
            referralLink: "",
            message: "",
            email_sent: false,
        };
    },

    mounted() {
        this.getReferralLink();
    },

    methods: {
        goToHome(): void {
            this.$router.push("/lobby");
        },

        onCopy(): void {
            Vue.$toast.info("<span class='toast__info'>Referral link copied successfully</span>");
        },

        onError(): void {
            Vue.$toast.error("<span class='toast__error'>error while copying referral link</span>");
        },

        async getReferralLink() {
            try {
                this.referralLink = await this.$stock.state.api.getReferralLink();
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
        },

        async referUser() {
            try {
                await this.$stock.state.api.referUser({
                    email: this.email,
                });
                this.email_sent = true;
                // this.$stock.dispatch("user/reload");
                // this.$router.push("/lobby");
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
        },
    },
    watch: {
        email_sent(val) {
            if (val) {
                setTimeout(() => (this.email_sent = false), 3000);
            }
        },
    },
});
</script>
<style lang="scss" scoped>
.mystyle {
    &.layout__center {
        margin: -8px -13px;
        padding: 8px 13px;
        background: #f3f7fc;
        .submit_button {
            background: #007bff;
            border-color: #007bff;
            color: white;
            border-radius: 5px;
            padding: 5px 10px;
        }
        .submit_button:focus {
            border-color: #007bff;
            outline-color: #007bff;
        }
        .container__content {
            padding: 30px 20px;
            box-shadow: 0 0 2px rgba(black, 0.4);
            .pagetitle {
                color: #53595d;
            }
            input {
                background: #f3f7fc;
                border: none;
                color: black;
            }
        }
        .profile__referral__link {
            i {
                color: #999;
                &:hover {
                    color: #53595d;
                }
            }
        }
        .seperator {
            background: #bbb;
        }
    }
}
</style>
