<template>
<div class="layout">
        
        <div class="layout__center bg-mystic">
            <div class="layout__center__wrapper">
                <h2 class="subtitle text--center">PASSWORD RESET</h2>
                <form class="form" @submit.prevent="resetPassword">
                   
                    <div class="form__control m--b--4">
                        <label class="label label--large">E-MAIL</label>
                        <div class="odd__header__time" > {{$route.query.email}} </div>
                    </div>
                    <div class="form__control m--b--4">
                        <label class="label label--large">PASSWORD</label>
                        <FormInput
                            id="form-password"
                            inputClass="input input--large"
                            placeHolder="Minimum 8 characters"
                            type="password"
                            autocomplete="current-password"
                            :errors="errors.password"
                            v-model="password"
                            minlength="8"
                            required
                        />
                        <div class="error" v-if="errors.password">
                            <span v-for="error in errors.password"> {{ error }} </span>
                        </div>
                    </div>
                    <div class="form__control m--b--10">
                        <label class="label label--large">CONFIRM PASSWORD</label>
                        <FormInput
                            id="form-password-confirmation"
                            inputClass="input input--large"
                            placeHolder="Minimum 8 characters"
                            type="password"
                            autocomplete="current-password"
                            :errors="errors.password_confirmation"
                            v-model="passwordConfirmation"
                            minlength="8"
                            required
                        />
                    </div>
                    <button type="submit" class="button button--large m--b--6">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosError } from "axios";
import FormInput from "../../components/FormInput.vue";

export default Vue.extend({
    name: "ResetPasswordForm",
    components: { FormInput },

    data() {
        return {
            errors: {},
            email : "",
            password: "",
            passwordConfirmation: "",
            token : "",
        };
    },

    methods: {
        
        goToHome(): void {
            this.$router.push("/");
        },

        async resetPassword() {
            
            try {
                await this.$stock.state.api.resetPassword({
                    email: this.$route.query.email as string,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                    token : this.$route.query.token as string,
                });
                this.$stock.dispatch("user/reload");
                this.$router.push("/login");
                
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
            
        },
    },
});
</script>
