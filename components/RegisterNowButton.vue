<template>
    <button v-if="canRegister" class="btn btn-primay round register" :class="className" style="border-radius:10px; color: white !important" @click.stop="register">
        Register now {{ price }}
    </button>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { AxiosError } from "axios";
import { Tournament } from "../types/tournament";
import { AuthModalTab } from "../store/modules/authModal";
import { formatDollars } from "../../general/utils/filters";
import { TournamentState } from "../../general/types/tournament";

export default Vue.extend({
    name: "RegisterNowButton",

    props: {
        tournament: Object as PropType<Tournament>,
        className: String,
    },

    computed: {
        isAuthorized(): boolean {
            return !!this.$stock.state.user.user;
        },

        price(): string {
            return `${formatDollars(this.tournament.buyIn)}+${formatDollars(
                this.tournament.commission,
            )}`;
        },

        canRegister(): boolean {
            if (!this.tournament) return false;
            return [TournamentState.Registering, TournamentState.LateRegistering].includes(
                this.tournament.state,
            );
        },
    },

    methods: {
        async register() {
            if (!this.isAuthorized) {
                this.$stock.commit("authModal/open", AuthModalTab.SignIn);
                return;
            }

            if (
                !(await this.$bvModal.msgBoxConfirm(
                    `You are about to register for tournament '${this.tournament.name}' and receive 10,000 chips for this tournament only, press OK to proceed.`,
                    // `Do you want to register at tournament '${this.tournament.name}' for ${this.price}?`,
                    {
                        title: "Registration",
                        modalClass: "modal-text-lg myModal",
                        buttonSize: "lg",
                    },
                ))
            ) {
                return;
            }

            this.$stock.commit("loader/show");

            try {
                await this.$stock.state.api.registerForTournament(this.tournament.id);
            } catch (e) {
                this.$toast.error((e as AxiosError).response?.data.message);
            } finally {
                this.$stock.commit("loader/hide");
            }

            await this.$stock.dispatch("user/reload");
        },
    },
});
</script>
<style lang="scss" scoped>
@media (max-width: 768px){
    button.register{
        background: #7F3DA7;
        background: #008000;
        border-radius: 20px !important;
        line-height: 40px;
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0 30px;
    }
    .myModal{
        background: none !important;
        margin-top: -30px;
    }
}
</style>