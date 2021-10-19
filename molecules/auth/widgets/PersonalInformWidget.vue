<template>
    <div>
        <div class="inform_row border-bottom">
            <h6 style="color:#1b73f9; font-size: 20px;"><b>Personal Information</b></h6>
            <button v-on:click="handleUserInfoChanges" class="btn btn-primary btn-rounder save_btn">
                Save
            </button>
        </div>
        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td class="info-cell">First Name</td>
                    <td>
                        <span v-show="!firstNameEditing">
                            :<span class="text_styling" id="first_name">{{ firstname }}</span>
                            <i
                                class="fa fa-edit"
                                aria-hidden="true"
                                @click="editFirstName(firstname)"
                            ></i>
                        </span>
                        <span v-show="firstNameEditing">
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
                                    @click="cancelFirstName()"
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
                    <td>Last Name</td>
                    <td>
                        <span v-show="!lastNameEditing">
                            :<span class="text_styling">{{ lastname }}</span>
                            <i
                                class="fa fa-edit"
                                aria-hidden="true"
                                @click="editlastName(lastname)"
                            ></i>
                        </span>
                        <span v-show="lastNameEditing">
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
                                    class="btn btn-ligtht btn-rounder"
                                    @click="cancellastName()"
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
                    <td>Country</td>
                    <td>
                        <span>
                            :<span class="text_styling">{{ user.country }}</span>
                            <i class="fa fa-edit" aria-hidden="true"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>
                        <span>
                            :<span class="text_styling">{{ user.name }}</span>
                            <i class="fa fa-edit" aria-hidden="true"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        <span>
                            :<span class="text_styling">{{ user.email }}</span>
                            <i class="fa fa-edit" aria-hidden="true"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>
                        <span v-show="!phoneNumberEditing">
                            :<span class="text_styling">{{ phone }}</span>
                            <i
                                class="fa fa-edit"
                                aria-hidden="true"
                                @click="editPhoneNumber(phone)"
                            ></i>
                        </span>
                        <span v-show="phoneNumberEditing">
                            <div style="display: flex;">
                                <input
                                    @keypress.enter="phoneNumberEditing = false"
                                    v-model="phone"
                                    type="text"
                                    :errors="errors.phone"
                                    :pattern="pattern"
                                    placeHolder="123-451-2345"
                                    class="form-control"
                                />
                                <button
                                    class="btn btn-ligtht btn-rounder"
                                    @click="cancelPhoneNumber()"
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
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosError } from "axios";
import { User } from "../../../../general/types/user";

export default Vue.extend({
    name: "PersonalInformWidget",

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
            email: "",
            oldFirstName: "",
            oldlastName: "",
            oldPhoneNumber: "",
        };
    },

    computed: {
        user(): User | null {
            return this.$stock.state.user.user;
        },
    },
    methods: {
        async handleUserInfoChanges() {
            if (this.firstNameEditing || this.lastNameEditing || this.phoneNumberEditing) {
                console.log("user_info Changed => ", this.firstname);
            } else {
                console.log("Now is changing state => ", this.firstname);
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
            }
        },
        extractPhoneNumber(): number | null {
            if (this.phone != null && this.phone.length != 0) {
                return parseInt(this.phone.split("-").join(""));
            }
            return null;
        },
        editFirstName(e: string) {
            this.oldFirstName = e;
            this.firstNameEditing = true;
        },
        cancelFirstName() {
            this.firstname = this.oldFirstName;
            this.firstNameEditing = false;
        },
        editlastName(e: string) {
            this.oldlastName = e;
            this.lastNameEditing = true;
        },
        cancellastName() {
            this.lastname = this.oldlastName;
            this.lastNameEditing = false;
        },
        editPhoneNumber(e: string) {
            this.oldPhoneNumber = e;
            this.phoneNumberEditing = true;
        },
        cancelPhoneNumber() {
            this.phone = this.oldPhoneNumber;
            this.phoneNumberEditing = false;
        },
    },
});
</script>

<style lang="scss" scoped>
.inform_row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 65px;
}
.fa-edit {
    color: #909090;
    font-weight: 500;
    font-size: 22px;
}
tr {
    height: 60px;
    border-bottom: 1px solid rgb(60, 60, 60, 0.4);
}
tr:hover {
    background: inherit;
    td {
        color: inherit;
    }
}
tr:nth-child(even) {
    background: inherit;
}
tr:last-child {
    border-bottom: 0px solid #fff;
}
td.info-cell {
    @media (max-width: 1650px) {
        width: 35%;
    }
}
.save_btn {
    padding: 1px 10px;
    border-radius: 5px;
}
.text_styling {
    padding-left: 10px;
}
</style>
