<template>
    <div id="dashboard-submenu">
        <div class="pt-4 sub-menu-list pb-0">
            <h3 class="text-center">Dashboard</h3>
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
    name: "UserSubNav",

    data() {
        return {
            subNavs: ["Profile", "History", "Statistics"],
            currentNav: 0,
        };
    },
    methods: {
        selectNavigation(navIndex: number) {
            this.setActive(navIndex);
            switch (navIndex) {
                case 0:
                    this.$router.push("/user");
                    this.$emit("toShowSideBar", false);
                    break;
                case 1:
                    this.$router.push("/user/history");
                    this.$emit("toShowSideBar", false);
                    break;
                case 2:
                    this.$router.push("/user/stats");
                    this.$emit("toShowSideBar", false);
                    break;
            }
        },

        setActive(index: number) {
            this.currentNav = index;
        },
    },
});
</script>
<style>
button.active {
    background: #0062cc;
}
</style>
