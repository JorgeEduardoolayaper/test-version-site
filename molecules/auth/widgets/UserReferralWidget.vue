<template>
    <div class="right_widget">
        <div class="refer_row border-bottom">
            <h2 class="myreferral_title text--center" style="color:black">
                USER REFERRAL
            </h2>
        </div>
        <div>
            <span style="display: block" class="comment">
                Sign up your friends to complete
            </span>
        </div>
        <div class="form__control m--b--5">
            <span
                class="label label--large"
                style="color:black;display:inline;padding-right:4px;font-size:16px;"
                >Referral Link</span
            >
            <div style="display:flex;align-items:center;margin-top:10px">
                <div
                    class="profile__referral__link"
                    style="overflow-x:hidden;text-overflow:ellipsis; background-color:#f3f7fc;padding:6px;border-radius:3px "
                >
                    <span
                        class="profile__referral__link__text"
                        style="background:transparent;color:black;white-space:nowrap;font-size:14px"
                        >{{ this.referralLink }}</span
                    >
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
        <div v-if="email_sent" class="alert alert-success email-sent" style="margin-bottom:20px;">
            The email has been sent
        </div>
        <form class="form" @submit.prevent="referUser">
            <div class="form__control m--b--4">
                <label class="label label--large" style="color:black;">E-MAIL</label>
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
        <!-- <div>
            <label for="ref_link"><b>Referral Link</b></label>
            <div class="link_info">
                <div class="info_part">
                    <a id="ref_link">{{ this.referralLink }}</a>
                </div>
                <div class="dec_part">
                    <i
                        v-clipboard:copy="referralLink"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                        class="fa fa-clone"
                        aria-hidden="true"
                    ></i>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FormInput from "../../../components/FormInput.vue";
import { AxiosError } from "axios";

export default Vue.extend({
    name: "UserReferralWidget",

    components: { FormInput },

    mounted() {
        this.getReferralLink();
    },

    data() {
        return {
            referralLink: "",
            errors: {},
            email: "",
            email_sent: false,
        };
    },

    computed: {},

    methods: {
        onError(): void {
            Vue.$toast.error("<span class='toast__error'>error while copying referral link</span>");
        },
        onCopy(): void {
            Vue.$toast.info("<span class='toast__info'>Referral link copied successfully</span>");
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
@media (max-width: 1350px) {
    .right_widget {
        display: none !important;
    }
}
form.form {
    margin: 30px 0;
}
.myreferral_title {
    font-family: "Robot";
    font-size: 24px;
    margin: auto;
}
.refer_row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 65px;
}
span.comment {
    padding: 20px 0px;
    color: #909090;
    font-size: 15px;
}
.submit_btn {
    background: #ff6600;
    width: 50%;
    color: #fff;
}
.link_info {
    display: flex;
    justify-content: center;
    align-items: stretch;
}
.info_part {
    font-size: 15px;
    padding: 30px 30px 30px 40px;
    border-radius: 5px 0px 0px 5px;
    background-color: rgb(243, 246, 251);
    color: rgb(28, 125, 255);
    width: 100%;
}
.dec_part {
    width: 46px;
    display: flex;
    align-items: center;
    background: rgb(28, 125, 255);
    padding: 10px;
    border-radius: 0 5px 5px 0;
    flex-shrink: 0;
    .fa {
        text-align: center;
        color: #fff;
    }
}
.input {
    background: #fff;
    border: 1px solid #ccc;
}
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
</style>
