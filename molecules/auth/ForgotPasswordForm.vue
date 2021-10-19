<template>
<div class="layout">
        
        <div class="layout__center bg-mystic">
            <div class="layout__center__wrapper">
                <h2 class="pagetitle  text--center">PASSWORD RESET</h2>
                <form class="form" @submit.prevent="forgotPassword">
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
                    <button type="submit" class="button button--large m--b--6">Submit</button>
                </form>
                <div class="seperator"></div>
                <div class="paragraph paragraph--small">
                    <router-link class="link link--back" to="/login">Back</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosError } from "axios";
import FormInput from "../../components/FormInput.vue";

export default Vue.extend({
    name: "ForgotPasswordForm",
    components: { FormInput },

    data() {
        return {
            errors: {},
            email: "",
        };
    },

    methods: {
        
        goToHome(): void {
            this.$router.push("/");
        },

        async forgotPassword() {
            try {
                await this.$stock.state.api.forgotPassword({
                    email: this.email,
                });
                this.$stock.dispatch("user/reload");
                this.$router.push("/");
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
        },
    },
});
</script>
