import VueRouter, { RouteConfig } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import MailContainerView from "../views/MailContainerView.vue";
import NotificationsView from "../views/NotificationView.vue";
import RankingView from "../views/RankingView.vue";
import CalendarView from "../views/CalendarView.vue";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import TournamentView from "../views/TournamentView.vue";
// import { scrollBehavior } from "./utils";
import WindowBar from "../molecules/layout/WindowBar.vue";
import NavBar from "../molecules/layout/NavBar.vue";
import LogoHeader from "../molecules/layout/LogoHeader.vue";
import HistoryView from "../views/HistoryView.vue";
import SignInForm from "../molecules/auth/SignInForm.vue";
import SignUpForm from "../molecules/auth/SignUpForm.vue";
import UserStats from "../molecules/auth/UserStats.vue";
import ChatMessageContainer from "../molecules/chat/ChatMessageContainer.vue";
import AboutView from "../views/AboutView.vue";
import SoonView from "../views/SoonView.vue";
import SupportView from "../views/SupportView.vue";
import CashierView from "../molecules/cashier/CashierView.vue";
import UserPersonalInfo from "../molecules/auth/UserPersonalInfo.vue";
import ProfileView from "../molecules/auth/ProfileView.vue";
import ProfileEdit from "../molecules/auth/ProfileEdit.vue";
import UserReferralForm from "../molecules/auth/UserReferralForm.vue";
import ForgotPasswordForm from "../molecules/auth/ForgotPasswordForm.vue";
import UpdatePasswordForm from "../molecules/auth/UpdatePasswordForm.vue";
import ResetPasswordForm from "../molecules/auth/ResetPasswordForm.vue";
import BankWireMobileForm from "../molecules/cashier/BankWireMobileForm.vue";
import BitcoinMobileForm from "../molecules/cashier/BitcoinMobileForm.vue";
import CreditCardMobileForm from "../molecules/cashier/CreditCardMobileForm.vue";
import PaypalMobileForm from "../molecules/cashier/PaypalMobileForm.vue";
import MobileInfoSection from "../molecules/tournament/info/MobileInfoSection.vue";
import HomeNavBar from "../molecules/layout/HomeNavBar.vue";
import Prizes from "../molecules/prize/Prizes.vue";
import ShippingInfo from "../molecules/prize/ShippingInfo.vue";
import TermsOfServiceView from "../views/TermsOfService.vue";
import PrivacyPolicyView from "../views/PrivacyPolicy.vue";

export const createRouter = (): VueRouter => {
    const routes: RouteConfig[] = [
        { path: "/", component: HomeView, meta: { layout: [HomeNavBar], isHome: true } },
        { path: "/lobby", name: "lobby", component: DashboardView, meta: { applyNewLayout: true } },
        {
            path: "/user/stats",
            name: "userstats",
            component: UserStats,
            meta: { applyNewLayout: true },
        },
        {
            path: "/user",
            name: "profile",
            component: ProfileView,
            meta: { applyNewLayout: true, sectionDisplay: false },
        },
        {
            path: "/user/history",
            name: "history",
            component: HistoryView,
            meta: { applyNewLayout: true, sectionDisplay: false },
        },
        {
            path: "/user/referral",
            name: "referral",
            component: UserReferralForm,
            meta: { applyNewLayout: true, sectionDisplay: false },
        },
        {
            path: "/calendar",
            name: "calendar",
            component: CalendarView,
            meta: { applyNewLayout: true },
        },
        {
            path: "/email",
            name: "email",
            component: MailContainerView,
            meta: { applyNewLayout: true },
        },
        {
            path: "/notifications",
            name: "notifications",
            component: NotificationsView,
            meta: { applyNewLayout: true },
        },
        {
            path: "/ranking",
            name: "ranking",
            component: RankingView,
            meta: { applyNewLayout: true },
        },
        {
            path: "/chat",
            name: "chat",
            component: ChatMessageContainer,
            meta: { layout: [], applyNewLayout: true },
        },
        { path: "/prizes", name: "prizes", component: Prizes, meta: { applyNewLayout: true } },
        {
            path: "/prizes/shippingInfo",
            name: "shippingInfo",
            component: ShippingInfo,
            meta: { applyNewLayout: true },
        },
        {
            path: "/settings/about",
            name: "about",
            component: AboutView,
            meta: { applyNewLayout: true },
        },
        {
            path: "/settings/support",
            name: "support",
            component: SupportView,
            meta: { applyNewLayout: true },
        },
        {
            path: "/settings",
            name: "personalinfo",
            component: UserPersonalInfo,
            meta: { applyNewLayout: true },
        },
        {
            path: "/settings/terms-of-service",
            name: "terms-of-service",
            component: TermsOfServiceView,
            meta: { applyNewLayout: true },
        },
        {
            path: "/settings/privacy-policy",
            name: "privacy-policy",
            component: PrivacyPolicyView,
            meta: { applyNewLayout: true },
        },
        {
            path: "/settings/updatepassword",
            name: "updatepassword",
            component: UpdatePasswordForm,
            meta: { applyNewLayout: true },
        },
        { path: "/login", component: SignInForm },
        { path: "/referral", component: UserReferralForm, meta: { layout: [LogoHeader] } },
        { path: "/forgotpassword", component: ForgotPasswordForm, meta: { layout: [LogoHeader] } },
        { path: "/resetpassword", component: ResetPasswordForm, meta: { layout: [LogoHeader] } },
        { path: "/signup", component: SignUpForm },
        { path: "/register", component: SignUpForm },
        { path: "/referralLink", component: SignUpForm },
        { path: "/profile", component: ProfileView, meta: { layout: [NavBar] } },
        { path: "/profile-edit", component: ProfileEdit, meta: { layout: [NavBar] } },
        {
            path: "/tournaments/:tournamentId",
            component: TournamentView,
            meta: { layout: [WindowBar], applyNewLayout: true },
        },
        { path: "/history", component: HistoryView, meta: { layout: [LogoHeader] } },
        { path: "/about", component: AboutView, meta: { layout: [LogoHeader] } },
        {
            path: "/terms-of-service",
            component: TermsOfServiceView,
            meta: { layout: [LogoHeader] },
        },
        { path: "/privacy-policy", component: PrivacyPolicyView, meta: { layout: [LogoHeader] } },
        { path: "/soon", component: SoonView },
        { path: "/support", component: SupportView, meta: { layout: [LogoHeader] } },
        { path: "/cashier", component: CashierView, meta: { layout: [NavBar] } },
        { path: "/bankwire", component: BankWireMobileForm, meta: { layout: [NavBar] } },
        { path: "/bitcoin", component: BitcoinMobileForm, meta: { layout: [NavBar] } },
        { path: "/cc", component: CreditCardMobileForm, meta: { layout: [NavBar] } },
        { path: "/paypal", component: PaypalMobileForm, meta: { layout: [NavBar] } },
        {
            path: "/tour_info/:tournamentId",
            component: MobileInfoSection,
            meta: { layout: [NavBar] },
        },
        { path: "*", component: NotFoundView, meta: { layout: [NavBar] } },
    ];

    return new VueRouter({
        mode: "history",
        routes,
        linkActiveClass: "active",
        scrollBehavior(to, from, savedPosition) {
            console.log(to, from, savedPosition);
            return { x: 0, y: 0 };
        },
    });
};
