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
        <h2 class="signin-title">JOIN OUR COMMUNITY</h2>
        <div class="signin-content">
            <div class="sign-tabs d-flex justify-space-around m--b--10">
                <router-link class="signin-link active" to="/signup">Registration</router-link>
                <router-link class="signin-link" to="/login">Sign In</router-link>
            </div>
            <div class="signin-form">
                <form class="form" @submit.prevent="signUp">
                    <div class="row">
                        <div class="form__control m--b--4 col-sm-6">
                            <label class="label label--large label--ex">FIRST NAME</label>
                            <FormInput
                                id="form-first-name"
                                inputClass="input input--large input--ex"
                                placeHolder="First name"
                                type="text"
                                autocomplete="firstname"
                                :errors="errors.firstname"
                                v-model="firstname"
                                required
                            />
                            <div class="error" v-if="errors.firstname">
                                <span
                                    v-for="(error, index) in errors.firstname"
                                    :key="'err9-' + index"
                                >
                                    {{ error }}
                                </span>
                            </div>
                        </div>
                        <div class="form__control m--b--4 col-sm-6">
                            <label class="label label--large label--ex">LAST NAME</label>
                            <FormInput
                                id="form-last-name"
                                inputClass="input input--large input--ex"
                                placeHolder="Last name"
                                type="text"
                                autocomplete="lastname"
                                :errors="errors.lastname"
                                v-model="lastname"
                                required
                            />
                            <div class="error" v-if="errors.lastname">
                                <span
                                    v-for="(error, index) in errors.lastname"
                                    :key="'err8-' + index"
                                >
                                    {{ error }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form__control m--b--4 col-md-4 col-sm-6">
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
                            <div class="error" v-if="errors.email">
                                <span v-for="(error, index) in errors.email" :key="'err7-' + index">
                                    {{ error }}
                                </span>
                            </div>
                        </div>
                        <div class="form__control m--b--4 col-md-4 col-sm-6">
                            <label class="label label--large label--ex">USERNAME</label>
                            <FormInput
                                id="form-name"
                                inputClass="input input--large input--ex"
                                placeHolder="Pick a username"
                                type="text"
                                maxlength="18"
                                autocomplete="username"
                                :errors="errors.name"
                                v-model="name"
                                required
                            />
                            <div class="error" v-if="errors.name">
                                <span v-for="(error, index) in errors.name" :key="'err6-' + index">
                                    {{ error }}
                                </span>
                            </div>
                        </div>
                        <div class="form__control m--b--4 col-md-4 col-sm-12">
                            <label class="label label--large label--ex">DATE OF BIRTH</label>
                            <div style="display: flex; justify-content: space-between;">
                                <div class="dropdown" style="width: 30%;">
                                    <div class="form__control">
                                        <input
                                            class="input input--large input--ex"
                                            type="text"
                                            v-model="day"
                                            readonly="readonly"
                                        />
                                        <div class="form__control__icon--right">
                                            <i class="icon icon--micro icon--down"></i>
                                        </div>
                                    </div>
                                    <div
                                        class="dropdown__content"
                                        style="z-index: 1000; width: 150px; max-height: 300px; overflow-y: auto; background:#F3F7FC;"
                                    >
                                        <div
                                            class="dropdown__content__item"
                                            v-for="index in getDaysOfMonth()"
                                            :key="index"
                                            :value="index"
                                            @click="handleSelectDay(`${index}`)"
                                        >
                                            {{ index }}
                                            <i
                                                class="icon icon--smaller icon--check icon--color--yellow-1"
                                                v-if="isSelectedDay(`${index}`)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="dropdown" style="width: 30%;">
                                    <div class="form__control">
                                        <input
                                            class="input input--large input--ex"
                                            type="text"
                                            v-model="month"
                                            readonly="readonly"
                                        />
                                        <div class="form__control__icon--right">
                                            <i class="icon icon--micro icon--down"></i>
                                        </div>
                                    </div>
                                    <div
                                        class="dropdown__content"
                                        style="z-index: 1000; width: 150px; max-height: 300px; overflow-y: auto; background:#F3F7FC;"
                                    >
                                        <div
                                            class="dropdown__content__item"
                                            v-for="index in monthArray"
                                            :key="index"
                                            :value="index"
                                            @click="handleSelectMonth(index)"
                                        >
                                            {{ index }}
                                            <i
                                                class="icon icon--smaller icon--check icon--color--yellow-1"
                                                v-if="isSelectedMonth(index)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="dropdown" style="width: 30%;">
                                    <div class="form__control">
                                        <input
                                            class="input input--large input--ex"
                                            type="text"
                                            v-model="year"
                                            readonly="readonly"
                                        />
                                        <div class="form__control__icon--right">
                                            <i class="icon icon--micro icon--down"></i>
                                        </div>
                                    </div>
                                    <div
                                        class="dropdown__content"
                                        style="z-index: 1000; width: 150px; max-height: 300px; overflow-y: auto; background:#F3F7FC;"
                                    >
                                        <div
                                            class="dropdown__content__item"
                                            v-for="index in numberOfYears"
                                            :key="index"
                                            :value="startingYear + (index - 1)"
                                            @click="
                                                handleSelectYear(`${startingYear + (index - 1)}`)
                                            "
                                        >
                                            {{ startingYear + (index - 1) }}
                                            <i
                                                class="icon icon--smaller icon--check icon--color--yellow-1"
                                                v-if="
                                                    isSelectedYear(`${startingYear + (index - 1)}`)
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="error" v-if="errors.dob">
                                <span v-for="(error, index) in errors.dob" :key="'err5-' + index">
                                    {{ error }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row"></div>
                    <div class="row">
                        <div class="form__control m--b--4 col-sm-6">
                            <label class="label label--large label--ex">PASSWORD</label>
                            <FormInput
                                id="form-password"
                                inputClass="input input--large input--ex"
                                placeHolder="Minimum 8 characters"
                                type="password"
                                autocomplete="current-password"
                                :errors="errors.password"
                                v-model="password"
                                minlength="8"
                                required
                            />
                            <div class="error" v-if="errors.password">
                                <span
                                    v-for="(error, index) in errors.password"
                                    :key="'err4-' + index"
                                >
                                    {{ error }}
                                </span>
                            </div>
                        </div>
                        <div class="form__control m--b--4 col-sm-6">
                            <label class="label label--large label--ex">CONFIRM PASSWORD</label>
                            <FormInput
                                id="form-password-confirmation"
                                inputClass="input input--large input--ex"
                                placeHolder="Minimum 8 characters"
                                type="password"
                                autocomplete="current-password"
                                :errors="errors.password_confirmation"
                                v-model="passwordConfirmation"
                                minlength="8"
                                required
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form__control m--b--4 col-sm-6">
                            <label class="label label--large label--ex">COUNTRY</label>
                            <select class="input input--large input--ex" v-model="country">
                                <option value="Select">Select Country</option>
                                <option
                                    v-for="options in countries"
                                    :value="options.code"
                                    :key="options.code"
                                    >{{ options.name }}</option
                                >
                            </select>
                            <div class="error" v-if="errors.country">
                                <span
                                    v-for="(error, index) in errors.country"
                                    :key="'err3-' + index"
                                >
                                    {{ error }}
                                </span>
                            </div>
                        </div>
                        <div class="form__control m--b--4 col-sm-6">
                            <label class="label label--large label--ex">PHONE</label>
                            <FormInput
                                id="form-password-confirmation"
                                inputClass="input input--large input--ex"
                                placeHolder="111-111-1111"
                                :errors="errors.phone"
                                v-model="phone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                @input = "autocompletePhone"
                            />
                            <div class="error" v-if="errors.phone">
                                <span v-for="(error, index) in errors.phone" :key="'err2-' + index">
                                    {{ error }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-center">
                        <button type="submit" class="form-button btn btn-primary">
                            Registration
                        </button>
                    </div>
                </form>
                <!-- <div class="paragraph paragraph--small" style="color:#53595D">
                    Already have an account?
                    <router-link class="link" to="/login" style="color:#1976d2 !important">Log in</router-link>
                    <router-link class="link link--back" to="/" style="color:#1976d2 !important">Back</router-link>
                </div> -->
                <!-- <div class="seperator"></div> -->
            </div>
        </div>
        <div
            class="paragraph paragraph--tiny"
            style="padding: 20px 40px; color:#53595D; text-align:center"
        >
            By creating an account you are agreeing to Pick Wins’s
            <a
                href="/terms-of-service"
                target="_blank"
                class="link"
                style="color:#1976d2 !important"
                >Terms of Use</a
            >
            and
            <a href="/privacy-policy" target="_blank" class="link" style="color:#1976d2 !important"
                >Privacy Policy</a
            >
            and to be updated about Pick Wins products, news, and promotions.
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosError } from "axios";
import moment from "moment";
import FormInput from "../../components/FormInput.vue";
import { Country } from "../../../general/types/country";

export default Vue.extend({
    name: "SignUpForm",
    components: { FormInput },

    data() {
        return {
            errors: {},
            name: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            day: "1",
            month: "01",
            year: "1940",
            monthArray: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            startingYear: 1940,
            numberOfYears: 81,
            referrer_name: "",
            country: "Select",
            phone: "",
        };
    },

    computed: {
        countries(): Country[] {
            return this.loadCountries();
        },
    },

    methods: {
        getDaysOfMonth(): number {
            const date = this.year + "-" + this.month;
            return moment(date, "YYYY-MM").daysInMonth();
        },

        autocompletePhone(){
            console.log('ttt')
            if (this.phone.length === 3 || this.phone.length === 7) this.phone = this.phone+'-'
        },

        goToHome(): void {
            this.$router.push("/");
        },

        loadCountries() {
            //TODO: if more countries are supported, make api call to get all countries from backend
            const countries: Country[] = [];
            countries.push({ code: "USA", name: "UNITED STATES", phoneCode: 1 });
            countries.push({ code: "CAN", name: "CANADA", phoneCode: 1 });
            return countries;
        },

        async signUp() {
            try {
                await this.$stock.state.api.signUp({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    dob: this.year + "-" + this.month + "-" + this.day,
                    referrer_name: this.$route.query.ref as string,
                    country: this.country === "Select" ? null : this.country,
                    phone: this.extractPhoneNumber(),
                });
                this.$stock.dispatch("user/reload");
                this.$router.push("/lobby");
            } catch (e) {
                this.$toast.error("Please insert valide inputs");
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
        },

        handleSelectDay(day: string): void {
            this.day = day;
        },

        isSelectedDay(day: string): boolean {
            return this.day === day;
        },

        handleSelectMonth(month: string): void {
            this.month = month;
        },

        isSelectedMonth(month: string): boolean {
            return this.month === month;
        },

        handleSelectYear(year: string): void {
            this.year = year;
        },

        isSelectedYear(year: string): boolean {
            return this.year === year;
        },
        extractPhoneNumber(): number | null {
            if (this.phone != null && this.phone.length != 0) {
                return parseInt(this.phone.split("-").join(""));
            }
            return null;
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
    max-width: 1200px;
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
h2.signin-title {
    color: #1a73e8;
    font-weight: 700;
    font-size: 29px;
    padding: 30px 30px 0;
    margin: 0;
    text-align: center;
}
.button-social {
    border-radius: 7px;
    border: 2px solid #1a73e8;
    color: #1a73e8;
    padding: 5px 57px;
    i {
        font-weight: 700;
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
        color: black !important;
        font-size: 14px !important;
        border: 1px solid rgba(0, 0, 0, 0.3);
        &::placeholder {
            font-style: normal;
            color: #7c858b;
            font-size: 14px;
        }
    }
    .dropdown__content__item {
        color: black;
        &:hover {
            background: #999;
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
.v-application .error {
    background: transparent !important;
    border-color: transparent !important;
}
// .layout.layout__background.layout__background--ht{
//     padding: 0 30px;
//     background: #F3F7FC;
// }
// .myCenter{
//     background: white;
//     padding: 30px 40px;
//     box-shadow: 0 2px 20px 8px rgba(0, 0, 0, 0.2);
//     input, select {
//         background: #F3F7FC;
//         // line-height: 40px;
//         font-size: 14px !important;
//         height: 40px;
//         color: black;
//         &::placeholder{
//             font-style: italic;
//             color: #7C858B;
//             font-size: 14px;
//         }
//     }
//     option{
//         font-size: 1.2em;
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
//     background: #008000;
//     color: white;
//     font-weight: 900;
//     letter-spacing: 10px;
//     padding: 10px 40px;
//     border-radius: 30px;
//     margin: 0 auto;
//     display: flex;
//     text-shadow: black 1px 0px 1px;
//     margin-bottom: 20px;
//     box-shadow:  0 2px 3px 1px rgba(0, 0, 0, 0.2);
// }
</style>
