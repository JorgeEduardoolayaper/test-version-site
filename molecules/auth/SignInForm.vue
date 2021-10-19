<template>
    <div class="signin-page">
        <div class="text-center signin-logo">
            <img
                class="img-fluid"
                src="assets/i/pickwins-new-logo.png"
                style="height:125px"
                @click="goToHome"
            />
        </div>
        <div class="signin-content flex-column">
            <div class="sign-tabs d-flex justify-space-around">
                <router-link class="signin-link" to="/signup">Registration</router-link>
                <router-link class="signin-link active" to="/login">Sign In</router-link>
            </div>
            <!-- <p class="signin-text">Using profile in social networks</p> -->
            <div class="d-flex justify-space-around">
                <a href="/api/facebook/redirect">
                    <button class="button-social btn-facebook">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                </a>
                <a href="/api/google/redirect">
                    <button class="button-social btn-google"><i class="fab fa-google"></i></button>
                </a>
            </div>
            <!-- <p class="signin-text">Through entrance form</p> -->

            <div class="signin-form">
                <!--<h2 class="subtitle subtitle--light text--center">LOG IN TO YOUR ACCOUNT</h2> -->
                <form class="form" @submit.prevent="signIn">
                    <div class="d-flex flex-column">
                        <div class="form__control m--b--2">
                            <label class="label label--large label--ex">E-MAIL</label>
                            <FormInput
                                id="form-email"
                                inputClass="input input--large input--ex"
                                placeHolder="Ex. john@google.com"
                                type="email"
                                autocomplete="email"
                                :errors="errors.email"
                                v-model="email"
                                required
                            />
                        </div>
                        <div class="form__control">
                            <label class="label label--large label--ex">PASSWORD</label>
                            <FormInput
                                id="form-password"
                                inputClass="input input--large input--ex"
                                placeHolder="Minimum 8 characters"
                                type="password"
                                autocomplete="current-password"
                                :errors="errors.password"
                                v-model="password"
                                required
                            />
                        </div>
                    </div>
                    <div class="justify-center d-flex">
                        <router-link
                            class="signin-text"
                            to="/forgotpassword"
                            style="font-weight:400;"
                            >Forgot Password?</router-link
                        >
                    </div>
                    <div class="d-flex justify-center">
                        <button type="submit" class="form-button btn btn-primary">Sign In</button>
                    </div>
                </form>
                <!-- <div class="paragraph paragraph--small d-flex"  :class="isMobile?'flex-column': 'justify-space-around'">
                    <a href="/api/facebook/redirect">
                        <button class="button--social btn btn-facebook"><i class="fab fa-facebook-f"></i> | Login with Facebook</button>
                    </a>
                    <a href="/api/google/redirect">
                        <button class="button--social btn btn-google"><i class="fab fa-google"></i> | Login with Google</button>
                    </a>
                </div>
                <div class="paragraph paragraph--small m--b--0"  style="color:#53595D">
                    Don’t have an account?
                    <router-link class="link link--with--space" to="/signup" style="color:#1976d2 !important;">Join Us</router-link>
                    <router-link class="link link--back" to="/" style="color:#1976d2 !important;">Back</router-link>
                </div> -->
                <!--
                    <div class="paragraph paragraph--small">
                        <a href="/api/facebook/redirect">
                            <img class="p-2" style="margin-left:4%;margin-right:25%;background:white" src="assets/i/FB.png"/>
                        </a>
                        <img class="p-2" style="margin-right:22%; background:white" src="assets/i/Twitt.png" />
                        <img class="p-2" style="background:white;" src="assets/i/IN.png" />
                    </div>
                -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FormInput from "../../components/FormInput.vue";
import { AxiosError } from "axios";

export default Vue.extend({
    name: "SignInForm",
    components: { FormInput },

    data() {
        return {
            errors: {},
            email: "",
            password: "",
        };
    },

    computed: {
        isMobile(): boolean {
            return window.innerWidth < 993;
        },
    },

    methods: {
        goToHome(): void {
            this.$router.push("/");
        },

        async signIn() {
            try {
                await this.$stock.state.api.signIn({
                    email: this.email,
                    password: this.password,
                });
                this.$stock.dispatch("tournamentHistoryList/load");
                this.$stock.dispatch("user/reload");
                this.$router.push("/lobby");
            } catch (e) {
                // this.$toast.error((e as AxiosError).response?.data.message);
                this.$toast.error("Wrong username/password entered, please try again");
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
        },
    },
});
</script>
<style lang="scss" scoped>
.signin-page {
    background: white;
}
.signin-logo {
    background: #1a73e8;
}
.signin-content {
    max-width: 500px;
    margin: 0 auto;
    padding: 30px 50px;
}
.signin-link {
    color: #7c858b;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: 500;
    &.active {
        color: #1a73e8;
        text-decoration: underline;
        border-bottom: 2px solid #1a73e8;
    }
}
.signin-text {
    font-weight: 500;
    color: black;
    margin: 20px 0;
    text-align: center;
}
.button-social {
    border-radius: 7px;
    // border: 2px solid #1A73E8;
    color: white;
    font-weight: bold;
    margin: 20px;
    padding: 10px 57px;
    box-shadow: -1px -1px 4px white inset;
    text-shadow: 1px 1px 1px black;
    i {
        font-weight: 700;
    }
    &.btn-facebook {
        background: #3a589a;
    }
    &.btn-google {
        background: #e9544f;
    }
}
.signin-form {
    .form__control {
        width: 100%;
    }
    label.label {
        color: #1a73e8;
    }
    input,
    select {
        width: 100%;
        background: #f3f7fc;
        // line-height: 40px;
        height: 40px;
        color: black;
        border: 1px solid rgba(0, 0, 0, 0.3);
        &::placeholder {
            font-style: normal;
            color: #7c858b;
            font-size: 14px;
        }
    }
    option {
        font-size: 1.2em;
    }
    .form-button {
        border-radius: 999px;
        color: white;
        padding: 12px 80px;
    }
}
// .layout.layout__background.layout__background--ht{
//     background: #F3F7FC;
// }
// .myCenter{
//     width: 70%;
//     background: white;
//     padding: 40px;
//     box-shadow: 0 2px 20px 8px rgba(0, 0, 0, 0.2);
//     .form__control{
//         width: 100%;
//     }
//     input, select {
//         width: 100%;
//         background: #F3F7FC;
//         // line-height: 40px;
//         height: 40px;
//         color: black;
//         border: 1px solid rgba(0,0,0,0.3);
//         &::placeholder{
//             font-style: italic;
//             color: #7C858B;
//             font-size: 14px;
//         }
//     }
//     option{
//         font-size: 1.2em;
//     }
//     .button--social{
//         color: #008000;
//         text-shadow: 0 0 15px white;
//         line-height: 1.5;
//         border-radius: 20px;
//         height:auto;
//         padding: 10px 20px;
//         &:hover{
//             color: orange;
//         }
//     }
// }
// .dropdown__content{
//     background: white;
//     .dropdown__content__item{
//         color: black;
//         &:hover{
//             background: rgba(black,0.3);
//         }
//     }
// }

// .label.label--large.label--ex{
//     color: #53595D;
// }
// .mybtn{
//     background: #73be84;
//     color: white;
//     font-weight: 600;
//     letter-spacing: 7px;
//     padding: 10px 40px;
//     border-radius: 15px;
//     margin: 0 auto;
//     display: flex;
//     text-shadow: black 1px 0px 1px;
//     margin-bottom: 20px;
//     box-shadow:  0 2px 3px 1px rgba(0, 0, 0, 0.2);;
// }
</style>
