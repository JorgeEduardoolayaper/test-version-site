<template>
    <v-app class="layout h-100">
        <div v-if="this.$router.currentRoute.meta.applyNewLayout" class="h-100">
            <div v-if="isAuthenticated && userLoaded" class="h-100">
                <!-- hamburger -->
                <div id="sidebarCollapse" @click="toggleSideBar()">
                    <!-- <i
                        class="fal fa-align-left menu-toggle mobile"
                        :style="!showSideBar ? 'color:white' : 'color:black'"
                    ></i> -->
                    <i
                        class="fal fa-align-left menu-toggle mobile"
                        :class="showSideBar ? 'color-white' : 'color-black'"
                    ></i>
                </div>
                <!-- layout -->
                <div class="dashboard-wrapper h-100" :class="{ tournament: checkSidebar() }">
                    <!-- layout side bar -->
                    <div id="sidebar" :class="{ active: showSideBar }" class="h-auto">
                        <div class="bg-sidebar" @click="toggleSideBar()"></div>
                        <div class="row h-100 hide-scroll">
                            <!-- vertical main menu items -->
                            <div class="col-3 menu-icons py-auto px-auto h-auto">
                                <HamburgerNavBar :navigations="navigations" />
                            </div>
                            <!-- vertical sub menu items -->
                            <div class="col-9 sub-menu">
                                <Profile />
                                <div class="tab-content " id="myTabContent">
                                    <hr />
                                    <div
                                        :class="selectClass(navigations[0])"
                                        id="home"
                                        role="tabpanel"
                                        aria-labelledby="home-tab"
                                    >
                                        <LobbySubNav
                                            v-on:toShowSideBar="autoToggleSideBarForSmallScreens()"
                                        />
                                    </div>
                                    <!--home-tab end-->

                                    <div
                                        :class="selectClass(navigations[1])"
                                        id="user"
                                        role="tabpanel"
                                        aria-labelledby="user-tab"
                                    >
                                        <UserSubNav
                                            v-on:toShowSideBar="autoToggleSideBarForSmallScreens()"
                                        />
                                    </div>
                                    <div
                                        :class="selectClass(navigations[2])"
                                        id="calendar"
                                        role="tabpanel"
                                        aria-labelledby="calendar-tab"
                                    ></div>
                                    <div
                                        :class="selectClass(navigations[3])"
                                        id="notifications"
                                        role="tabpanel"
                                        aria-labelledby="notification-tab"
                                    ></div>
                                    <div
                                        :class="selectClass(navigations[4])"
                                        id="ranking"
                                        role="tabpanel"
                                        aria-labelledby="ranking-tab"
                                    ></div>
                                    <div
                                        :class="selectClass(navigations[5])"
                                        id="email"
                                        role="tabpanel"
                                        aria-labelledby="email-tab"
                                    ></div>
                                    <div
                                        :class="selectClass(navigations[6])"
                                        id="chat"
                                        role="tabpanel"
                                        aria-labelledby="chat-tab"
                                    >
                                        <ChatMessageSubNav
                                            v-on:toShowSideBar="autoToggleSideBarForSmallScreens()"
                                        />
                                    </div>
                                    <div
                                        :class="selectClass(navigations[7])"
                                        id="prizes"
                                        role="tabpanel"
                                        aria-labelledby="prizes-tab"
                                    >
                                        <PrizesSubNav
                                            v-on:toShowSideBar="autoToggleSideBarForSmallScreens()"
                                        />
                                    </div>
                                    <div
                                        :class="selectClass(navigations[8])"
                                        id="settings"
                                        role="tabpanel"
                                        aria-labelledby="settings-tab"
                                    >
                                        <SettingsSubNav
                                            v-on:toShowSideBar="autoToggleSideBarForSmallScreens()"
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div class="sub-menu-bottom-img pb-2">
                                    <img class="img-fluid" src="/assets/i/banner-side.png" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- layout main content area -->
                    <div id="dashboard-main-section" :class="{ lesswidth: !showSideBar }">
                        <div class="row p-0 m-0 h-100 overflow-auto">
                            <div class="col-md-12 p-0 h-100 d-flex align-stretch flex-column">
                                <!-- <div class="header row p-2" style="background:#E4E8EE"> -->
                                <!-- <div class="col-md-3 col-sm-3"> -->
                                <!-- <img class="pl-5 img-fluid" src="/assets/i/pickwins-new-logo.png"></div> -->
                                <!-- <div class="col-md-6  d-none d-sm-block"> -->
                                <!-- <DashboardBanner/> -->
                                <!-- </div> -->
                                <!-- <div class="col-md-3 col-sm-9 mt-4"> -->
                                <!-- <div class="header-icons float-right f-size"> -->
                                <!-- <a href="/email"> -->
                                <!-- <i class="fal fa-bell pr-3"/> -->
                                <!-- </a> -->
                                <!-- <a href=""> -->
                                <!-- <i class="fas fa-circle pr-3"/> -->
                                <!-- </a> -->
                                <!-- <a href="" @click="logout"> -->
                                <!-- <i class="fal fa-sign-out"/> -->
                                <!-- </a> -->
                                <!-- </div> -->
                                <!-- </div> -->
                                <!-- </div> -->
                                <v-flex row d-flex justify-space-between align-center m-0>
                                    <v-toolbar>
                                        <v-toolbar-title
                                            ><router-link to="/"
                                                ><img
                                                    class="pl-10 pr-10 py-2"
                                                    height="80px"
                                                    src="/assets/i/pickwins-new-logo.png"/></router-link
                                        ></v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn class="bell" icon to="/email">
                                            <v-badge
                                                top
                                                color="red"
                                                dot
                                                offset-x="10"
                                                offset-y="10"
                                                class="text-black"
                                            >
                                                <v-icon>mdi-bell-outline</v-icon>
                                            </v-badge>
                                        </v-btn>

                                        <v-menu bottom left>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-avatar
                                                    size="40"
                                                    class="ml-3"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <img :src="backgroundUrl" alt="John" />
                                                </v-avatar>
                                            </template>

                                            <v-list>
                                                <v-list-item v-for="(item, i) in [1]" :key="i">
                                                    <v-list-item-title>
                                                        <a href="" @click="logout">
                                                            <i class="fal fa-sign-out" /> Log out
                                                        </a>
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-toolbar>
                                </v-flex>
                                <!-- banner main container section -->
                                <component
                                    :is="
                                        this.$router.currentRoute.meta.layout &&
                                            this.$router.currentRoute.meta.layout[0]
                                    "
                                    class="grey-bg"
                                />

                                <div
                                    class="container dashboard-content-container table-responsive h-100 rounded-0"
                                    style="max-width:none !important; background: #F3F7FC;"
                                >
                                    <!-- container content / router view -->
                                    <router-view />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="layout" v-else>
            <component
                :is="
                    this.$router.currentRoute.meta.layout &&
                        this.$router.currentRoute.meta.layout[0]
                "
            />

            <component
                :is="
                    this.$router.currentRoute.meta.layout &&
                        this.$router.currentRoute.meta.layout.length === 2 &&
                        this.$router.currentRoute.meta.layout[1]
                "
            />

            <router-view />
            <FullLoader v-if="isLoaderVisible" />
            <Toasts :timeOut="7000" :closeable="true" />
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import DashboardBanner from "./views/DashboardBanner.vue";
import FullLoader from "../general/components/FullLoader.vue";
import Profile from "./molecules/auth/Profile.vue";
import SettingsSubNav from "./molecules/auth/SettingsSubNav.vue";
import UserSubNav from "./molecules/auth/UserSubNav.vue";
import PrizesSubNav from "./molecules/prize/PrizesSubNav.vue";
import ChatMessageSubNav from "./molecules/chat/ChatMessageSubNav.vue";
import NavBar from "./molecules/layout/NavBar.vue";
import Footer from "./molecules/layout/Footer.vue";
import WindowBar from "./molecules/layout/WindowBar.vue";
import HamburgerNavBar from "./molecules/layout/HamburgerNavBar.vue";
import LobbySubNav from "./molecules/tournament/LobbySubNav.vue";
import { userAvatar } from "./utils/game/statistics";
import { User } from "../general/types/user";

export default Vue.extend({
    name: "App",
    components: {
        Footer,
        FullLoader,
        NavBar,
        WindowBar,
        HamburgerNavBar,
        LobbySubNav,
        Profile,
        SettingsSubNav,
        PrizesSubNav,
        UserSubNav,
        DashboardBanner,
        ChatMessageSubNav,
    },

    data() {
        return {
            navigations: [
                "/lobby",
                "/user",
                "/calendar",
                "/notifications",
                "/ranking",
                "/email",
                "/chat",
                "/prizes",
                "/settings",
            ],
            userLoaded: false,
            showSideBar: false,
            toShowSideBar: false,
        };
    },

    beforeMount(){
        this.showSideBar = false
    },

    computed: {
        isLoaderVisible(): boolean {
            return this.$stock.state.loader.isVisible;
        },

        isAuthenticated(): boolean {
            this.$stock.dispatch("user/load").then(() => {
                let user = this.$stock.state.user.user;
                this.userLoaded = true;
                if (!user) {
                    this.$router.push("/login");
                }
            });
            return true;
        },
        user(): User | null {
            return this.$stock.state.user.user;
        },
        backgroundUrl(): string {
            //@TODOD: Add unique avatar for each user
            return userAvatar(this.user?.id ?? -1);
        },
    },

    methods: {
        checkSidebar(): boolean {
            // let str=''
            // if (window.location.href.indexOf("/tournaments/") > -1) str = 'tournament '
            // return this.showSideBar? str+'active': str
            return window.location.href.indexOf("/tournaments/") > -1;
            // return this.showSideBar && window.location.href.indexOf("/tournaments/") == -1
        },
        logout(): void {
            this.$stock.dispatch("user/logout");
            this.$router.push("/");
        },

        toggleSideBar() {
            this.showSideBar = !this.showSideBar;
        },

        autoToggleSideBarForSmallScreens() {
            if (screen.width <= 992) {
                this.showSideBar = !this.showSideBar;
            }
        },

        selectClass(nav: string) {
            if (this.$route.path.startsWith(nav)) {
                return ["tab-pane", "fade", "active", "show"];
            } else {
                return ["tab-pane", "fade"];
            }
        },
    },
});
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
body {
    font-family: "Poppins", sans-serif;
    background: #fafafa;
}

p {
    font-family: "Poppins", sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.dashboard-wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    background: #e4e8ee;
}

.dashboard-content-container {
    background-color: #e4e8ee;
}

#sidebar {
    min-width: 350px;
    max-width: 350px;
    /* background: #7386D5;*/
    /* color: #fff;*/
    transition: all 0.3s;
}
@media (min-width:992px) {
    #dashboard-main-section{
    width: calc(100% - 80px);
    }
}

#sidebar.active {
    margin-left: -350px;
}
@media (min-width:769px){
    .tournament #sidebar.active {
        margin-left: -80px;
    }
    .tournament #dashboard-main-section {
        margin-left: -270px;
    }

    .tournament #dashboard-main-section.lesswidth{
        width: calc(100% - 0px);
    }
}
.tournament #dashboard-main-section{
    min-width: calc(100% - 80px);
}
#sidebar .row {
    margin-top: 0px !important;
}

.menu-icons {
    z-index: 3;
    background-color: #1d232a;
    height: 100%;
    /*  min-height: 800px; */
    color: #fff;
}
.menu-icons ul {
    padding: 300px 0 200px 0;
}

.menu-icons ul .svg-inline--fa {
    font-size: 32px !important;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}
.menu-toggle {
    background: transparent !important;
    padding: 5px;
    font-size: 26px;
    margin-left: 0px;
}
a[data-toggle="collapse"] {
    position: relative;
}
#dashboard-main-section {
    width: 100%;
    transition: all 0.3s;
    background-color: #e4e8ee;
}
#sidebarCollapse {
    position: absolute;
    left: 10px;
    top: 30px;
    z-index: 33;
    padding: 12px;
    background-color: transparent;
    margin-left: 0px;
    margin-top: -30px;
}
.dashboard-wrapper .header {
    border-bottom: 1px solid #d7d7d7;
    margin: 0px;
    padding: 0px;
}
.w-24 {
    width: 24% !important;
}
.btn-rounder {
    border-radius: 50px;
    padding-top: 0px;
    padding-bottom: 0px;
}
/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */
@media (max-width: 992px){
    
    .dashboard-content-container {
        padding: 0;
    }
    .bell{
        display: none;
    }
}

.color-white{
    color: white;
}
.color-black{
    color: black;
}
@media (max-width: 768px) {
    #sidebar {
        margin-left: -350px;
    }
    #sidebar.active {
        margin-left: 0px;
        position: absolute;
        z-index: 32;
    }
    #sidebar.active .bg-sidebar {
        content: "";
        z-index: 0;
        position: absolute;
        left: 100%;
        top: 0;
        width: 100vh;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
    }
    #sidebarCollapse span {
        display: none;
    }
    .mobile.text-black {
        color: white !important;
    }
    .mobile.text-white {
        color: black !important;
    }
    .color-white{
        color: #0065C9;
    }
    .color-black{
        color: white;
    }
    #sidebarCollapse{
        top: 47px;
    }
}
.grey-bg {
    background: #e4e8ee !important;
}
.sub-menu {
    padding: 12px 16px;
    margin-left: -4px;
}
.hide-scroll {
    overflow-y: auto;
}
#myTabContent {
    min-height: 250px;
}

</style>
