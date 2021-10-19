<template>
    <div class="mystyle">
        <div id="personalinfo" class="profile-section">
            <div class="row my-4 ">
                <div class="col-md-6">
                    <div class="col-md-12 mb-4 container__content">
                        <h5>
                            Personal Information
                            <button
                                v-on:click="handleUserInfoChanges"
                                class="btn btn-primary btn-rounder float-right"
                            >
                                Save
                            </button>
                        </h5>

                        <div v-if="user" class="text-center mt-5">
                            <img class="profile__avatar" :src="backgroundUrl" />
                            <h4>{{ user.firstname }} {{ user.lastname }}</h4>
                            <em>{{ user.country }}</em>
                        </div>
                        <div v-if="user" class="profile__table-responsive mt-5">
                            <table class="profile__table border-bottom">
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>First Name: </b>
                                            <span class="float-right" v-show="!firstNameEditing">
                                                {{ firstname }}
                                                <button
                                                    class="btn btn-warning btn-rounder"
                                                    @click="firstNameEditing = true"
                                                >
                                                    Edit
                                                </button>
                                            </span>
                                            <span class="float-right" v-show="firstNameEditing">
                                                <div style="display: flex;">
                                                    <input
                                                        @keypress.enter="firstNameEditing = false"
                                                        v-model="firstname"
                                                        type="text"
                                                        :errors="errors.firstname"
                                                        required
                                                        class="form-control"
                                                    />
                                                    <button
                                                        class="btn btn-ligtht btn-rounder"
                                                        @click="firstNameEditing = false"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                <div class="error" v-if="errors.firstname">
                                                    <span
                                                        v-for="(error, index) in errors.firstname"
                                                        :key="'err-' + index"
                                                        style="color:red;"
                                                    >
                                                        {{ error }}
                                                    </span>
                                                </div>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Last Name: </b>
                                            <span class="float-right" v-show="!lastNameEditing">
                                                {{ lastname }}
                                                <button
                                                    class="btn btn-warning btn-rounder"
                                                    @click="lastNameEditing = true"
                                                >
                                                    Edit
                                                </button>
                                            </span>
                                            <span class="float-right" v-show="lastNameEditing">
                                                <div style="display: flex;">
                                                    <input
                                                        @keypress.enter="lastNameEditing = false"
                                                        v-model="lastname"
                                                        type="text"
                                                        :errors="errors.lastname"
                                                        required
                                                        class="form-control"
                                                    />
                                                    <button
                                                        class="btn btn-light bg-transparent btn-rounder"
                                                        @click="lastNameEditing = false"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                <div class="error" v-if="errors.lastname">
                                                    <span
                                                        v-for="(error, index) in errors.lastname"
                                                        :key="'err-' + index"
                                                        style="color:red;"
                                                    >
                                                        {{ error }}
                                                    </span>
                                                </div>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Country:</b>
                                            <span class="float-right">
                                                {{ user.country }}
                                                <button
                                                    disabled
                                                    class="btn btn-warning btn-rounder"
                                                >
                                                    Edit
                                                </button>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Username:</b>
                                            <span class="float-right">
                                                {{ user.name }}
                                                <button
                                                    disabled
                                                    class="btn btn-warning btn-rounder"
                                                >
                                                    Edit
                                                </button>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Email:</b>
                                            <span class="float-right">
                                                {{ user.email }}
                                                <button
                                                    disabled
                                                    class="btn btn-warning btn-rounder"
                                                >
                                                    Edit
                                                </button>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Phone: </b>
                                            <span class="float-right" v-show="!phoneNumberEditing">
                                                {{ phone }}
                                                <button
                                                    class="btn btn-warning btn-rounder"
                                                    @click="phoneNumberEditing = true"
                                                >
                                                    Edit
                                                </button>
                                            </span>
                                            <span class="float-right" v-show="phoneNumberEditing">
                                                <div style="display: flex;">
                                                    <input
                                                        @keypress.enter="phoneNumberEditing = false"
                                                        v-model="phone"
                                                        :errors="errors.phone"
                                                        :pattern="pattern"
                                                        placeHolder="123-451-2345"
                                                        class="form-control"
                                                    />
                                                    <button
                                                        class="btn btn-light bg-transparent btn-rounder"
                                                        @click="phoneNumberEditing = false"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                <div class="error" v-if="errors.phone">
                                                    <span
                                                        v-for="(error, index) in errors.phone"
                                                        :key="'err-' + index"
                                                        style="color:red;"
                                                    >
                                                        {{ error }}
                                                    </span>
                                                </div>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-12 container__content">
                        <h5>
                            Social<button class="btn btn-primary btn-rounder float-right">
                                Save
                            </button>
                        </h5>
                        <div class="profile__table-responsive mt-5">
                            <table class="profile__table border-bottom">
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>Facebook: </b
                                            ><span class="float-right d-flex"
                                                >/Scott
                                                <label class="mb-0 mx-3 switch__">
                                                    <input type="checkbox" checked />
                                                    <span class="sliderbutton round"></span> </label
                                                ><button class="btn btn-warning btn-rounder">
                                                    Edit
                                                </button></span
                                            >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Twitter: </b
                                            ><span class="float-right d-flex"
                                                >/scottMorales<label class="mb-0 mx-3 switch__">
                                                    <input type="checkbox" checked />
                                                    <span class="sliderbutton round"></span>
                                                </label>
                                                <button class="btn btn-warning btn-rounder">
                                                    Edit
                                                </button></span
                                            >
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <b>Linkedin:</b>
                                            <span class="float-right d-flex"
                                                >/scottMorales
                                                <label class="mb-0 mx-3 switch__">
                                                    <input type="checkbox" />
                                                    <span class="sliderbutton round"></span> </label
                                                ><button class="btn btn-warning btn-rounder">
                                                    Edit
                                                </button></span
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosError } from "axios";
import UserPersonalInfoEdit from "../../components/UserPersonalInfoEdit.vue";
import { User } from "../../../general/types/user";
import { userAvatar } from "../../utils/game/statistics";

export default Vue.extend({
    name: "UserPersonalInfo",
    components: { UserPersonalInfoEdit },
    data() {
        return {
            errors: {},

            firstNameEditing: false,
            lastNameEditing: false,
            phoneNumberEditing: false,

            firstname: this.$stock.state.user.user?.firstname ?? "",
            lastname: this.$stock.state.user.user?.lastname ?? "",
            phone: this.$stock.state.user.user?.phone ?? "",
            pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        };
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },

        backgroundUrl(): string {
            //@TODOD: Add unique avatar for each user
            return userAvatar(this.user?.id ?? -1);
        },
    },

    methods: {
        handleCancel(): void {
            this.$router.push("/profile");
        },

        async handleUserInfoChanges() {
            try {
                await this.$stock.state.api.handleUserInfoChanges({
                    firstname: this.firstname,
                    lastname: this.lastname,
                    phone: this.extractPhoneNumber(),
                });
                this.$stock.dispatch("user/reload");
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
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
.mystyle {
    .container__content {
        padding: 2em;
        box-shadow: 0 0 5px rgba(black, 0.4);
        table {
            tr {
                border: 1px solid transparent;
                border-radius: 10px;
                :hover {
                    border-color: #80bdff;
                    background: #f1f3f5;
                    color: black;
                }
                &:nth-child(even) {
                    background: #f3f7fc;
                }
            }
            td {
                border-radius: 10px;
                border: none;
            }
            b {
                line-height: 33px;
                font-size: 0.9em;
            }
            input {
                font-size: 0.8em !important;
                background: #f3f7fc !important;
                outline: none;
                &:focus {
                    border-width: 1px;
                    box-shadow: none;
                }
            }
        }
        .switch__ {
            height: 24px;
            .sliderbutton {
                &:before {
                    width: 16px;
                    height: 16px;
                    left: 9px;
                }
            }
        }
    }
}
</style>
