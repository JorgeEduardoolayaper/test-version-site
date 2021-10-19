<template>
    <div id="dashboard-submenu">
        <div class="pt-4 sub-menu-list pb-0">
            <h3 class="text-center">Settings</h3>
            <ul class="list-unstyled  pt-2 pl-0 lists">
                <!-- {{subNavs}} -->
                <li v-for="(item, index) in subNavs" :key="'subnav' + index" class="mb-2">
                    <b-button
                        block
                        variant="primary"
                        :class="currentNav === index ? ' active' : ''"
                        @click="selectNavigation(index)"
                        >{{ item }}</b-button
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "SettingsSubNav",

    data() {
        return {
            // subNavs : ['Personal Information', 'Update Password', 'About Us', 'Contact', 'Privacy', 'Terms of Use'],
            //subNavs: ["Personal Information", "Update Password", "About Us", "Contact"],
            subNavs: ["Personal Information", "Update Password", "Contact"],
            currentNav: 0,
        };
    },

    methods: {
        selectNavigation(navIndex: number) {
            this.setActive(navIndex);
            switch (navIndex) {
                case 0:
                    this.$router.push("/settings");
                    this.$emit("toShowSideBar", false);
                    break;
                case 1:
                    this.$router.push("/settings/updatepassword");
                    this.$emit("toShowSideBar", false);
                    break;
                case 2:
                    this.$router.push("/settings/support");
                    this.$emit("toShowSideBar", false);
                    break;
                // case 3:
                //     this.$router.push("/settings/support");
                //     this.$emit("toShowSideBar", false);
                //     break;
                // case 4:
                //     this.$router.push("/settings/privacy-policy");
                //     this.$emit("toShowSideBar", false);
                //     break;
                // case 5:
                //     this.$router.push("/settings/terms-of-service");
                //     this.$emit("toShowSideBar", false);
                //     break;
            }
        },

        setActive(index: number) {
            this.currentNav = index;
        },
    },
});
</script>
