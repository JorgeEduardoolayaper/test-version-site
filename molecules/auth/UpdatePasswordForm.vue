<template>
    <div id="password" class="profile-section p-2 mystyle">
        <div class="row my-4 container__content__center" style="padding:30px;">
            <div class="col-md-8 col-lg-6 col-xl-4 col-xm-12 col-xs-12 mb-4 container__content ">
                <h5 style="text-align:center">
                    Update Password
                </h5>
                <div v-if="user" class="profile__table-responsive mt-5">
                    <table class="profile__table border-bottom">
                        <tbody>
                            <tr>
                                <td>
                                    <b>Current Password:</b>
                                    <span class="float-right">
                                        <input
                                            v-model="current_password"
                                            type="password"
                                            :errors="errors.current_password"
                                            placeHolder="Minimum 8 characters"
                                            minlength="8"
                                            required
                                            class="form-control"
                                            style="color:black;"
                                        />
                                    </span>
                                    <div
                                        class="error"
                                        v-if="errors.current_password"
                                        style="margin-top:10px;padding:2px 10px;border-radius:5px"
                                    >
                                        <span
                                            v-for="(error, index) in errors.current_password"
                                            :key="'cur-pwd-' + index"
                                            style="color:white;"
                                        >
                                            {{ error }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>New Password:</b>
                                    <span class="float-right">
                                        <input
                                            v-model="password"
                                            type="password"
                                            :errors="errors.password"
                                            placeHolder="Minimum 8 characters"
                                            minlength="8"
                                            required
                                            class="form-control"
                                            style="color:black;"
                                        />
                                    </span>
                                    <div
                                        class="error"
                                        v-if="errors.password"
                                        style="margin-top:10px;padding:2px 10px;border-radius:5px"
                                    >
                                        <span
                                            v-for="(error, index) in errors.password"
                                            :key="'pwd-' + index"
                                            style="color:white;"
                                        >
                                            {{ error }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Confirm New Password:</b>
                                    <span class="float-right">
                                        <input
                                            v-model="password_confirmation"
                                            type="password"
                                            :errors="errors.password_confirmation"
                                            placeHolder="Minimum 8 characters"
                                            minlength="8"
                                            required
                                            class="form-control"
                                            style="color:black;"
                                        />
                                    </span>
                                    <div
                                        class="error"
                                        v-if="errors.password_confirmation"
                                        style="margin-top:10px;padding:2px 10px;border-radius:5px"
                                    >
                                        <span
                                            v-for="(error, index) in errors.password_confirmation"
                                            :key="'pwd-confirm-' + index"
                                            style="color:white;"
                                        >
                                            {{ error }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        v-on:click="handleUpdatePassword"
                        class="btn btn-primary float-right saveBtn"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { AxiosError } from "axios";
import { User } from "../../../general/types/user";

export default Vue.extend({
    name: "UpdatePasswordForm",

    data() {
        return {
            errors: {},

            current_password: "",
            password: "",
            password_confirmation: "",
        };
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },
    },

    methods: {
        async handleUpdatePassword() {
            try {
                await this.$stock.state.api.changePassword({
                    current_password: this.current_password,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                });
                this.$stock.dispatch("user/reload");
                this.$router.push("/lobby");
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
                this.errors = (e as AxiosError).response?.data.errors ?? {};
            }
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
                    color: white;
                    background-color: #007bff;
                }
                &:nth-child(even) {
                    background: transparent;
                }
                &:first-child {
                    border-bottom: 1px solid grey;
                }
            }
            td {
                border-radius: 10px;
                border: none;
                padding: 20px;
            }
            b {
                line-height: 33px;
                font-size: 1.1em;
                font-weight: initial;
            }
            input {
                font-size: 0.8em !important;
                background: #f3f7fc !important;
                outline: none;
                border: none;
                border-bottom: 1px solid;
                &:focus {
                    border-width: 1px;
                    box-shadow: none;
                }
            }
            .error {
                span {
                    &:hover {
                        background-color: unset;
                    }
                }
            }
        }
        .saveBtn {
            font-size: 18px;
            width: 120px;
        }
    }
}
</style>
