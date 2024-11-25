import Login from "views/pages/Login.js";
import User from "views/pages/User.js";
import Register from "views/pages/Register.js";
// import Authorization from "views/pages/admin/Authorization";
// import Bots from "views/pages/admin/admins";
// import Wallets from "views/pages/admin/Wallets";
// import Setting from "views/pages/admin/Setting";
import Dashboard from "views/Dashboard";
import Project from "views/Project";
import ProjectDetail from "views/ProjectDetail";
import Pledge from "views/Pledge";
import Link from "views/Link";
import Profit from "views/Profit";
import News from "views/News";
import Faq from "views/Faq";
import AppUser from "views/AppUser";
import AppUserDetail from "views/AppUserDetail";
import ProfitDetail from "views/ProfitDetail";
import AppLogin from "views/Login";
import Notification from "views/Notification";
import PreAppUser from "views/PreAppUser";
import Order from "views/Order";
import Like from "views/Like";
import Withdrawal from "views/Withdrawal";
import Deposit from "views/Deposit";
import Feature from "views/Feature";
import FeatureDetail from "views/FeatureDetail";

const routes = [
  {
    path: "/login",
    name: "Login",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Register,
    layout: "/auth",
  },

  // {
  //   path: "/dashboard",
  //   name: "Home",
  //   rtlName: "لوحة القيادة",
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/appuser",
    name: "App Users",
    rtlName: "يتعهد",
    icon: "tim-icons icon-single-02",
    component: AppUser,
    layout: "/admin",
    onSidebarMenu: true, //show in sidebar menu
  },
  {
    path: "/features",
    name: "Questions",
    rtlName: "يتعهد",
    icon: "tim-icons icon-link-72",
    component: Feature,
    layout: "/admin",
    onSidebarMenu: true, //show in sidebar menu
  },
  {
    path: "/feature/:id",
    name: "FeatureDetail",
    rtlName: "مشروع",
    mini: "L",
    rtlMini: "هعذا",
    component: FeatureDetail,
    layout: "/admin",
  },
  {
    path: "/appuserDetail/:id",
    name: "AppUserDetail",
    rtlName: "مشروع",
    mini: "L",
    rtlMini: "هعذا",
    component: AppUserDetail,
    layout: "/admin",
  },
  {
    path: "/like/:user_id",
    name: "Like",
    rtlName: "يتعهد",
    icon: "tim-icons icon-coins",
    component: Like,
    layout: "/admin",
  },
  {
    path: "/order/:user_id",
    name: "Order",
    rtlName: "يتعهد",
    icon: "tim-icons icon-coins",
    component: Order,
    layout: "/admin",
  },
  {
    path: "/withdrawal/:user_id",
    name: "Withdrawal",
    rtlName: "يتعهد",
    icon: "tim-icons icon-coins",
    component: Withdrawal,
    layout: "/admin",
  },
  {
    path: "/deposit/:user_id",
    name: "Withdrawal",
    rtlName: "يتعهد",
    icon: "tim-icons icon-coins",
    component: Deposit,
    layout: "/admin",
  },

  // {
  //   path: "/projectDetail/:id",
  //   name: "ProjectDetail",
  //   rtlName: "مشروع",
  //   mini: "L",
  //   rtlMini: "هعذا",
  //   component: ProjectDetail,
  //   layout: "/admin",
  //
  // },

  // {
  //   path: "/pledge",
  //   name: "Pledge",
  //   rtlName: "يتعهد",
  //   icon: "tim-icons icon-coins",
  //   component: Pledge,
  //   layout: "/admin",
  // },
  // {
  //   path: "/link",
  //   name: "Link",
  //   rtlName: "يتعهد",
  //   icon: "tim-icons icon-coins",
  //   component: Link,
  //   layout: "/admin",
  // },
  // {
  //   path: "/profit",
  //   name: "Profit",
  //   rtlName: "يتعهد",
  //   icon: "tim-icons icon-money-coins",
  //   component: Profit,
  //   layout: "/admin",
  // },
  // {
  //   path: "/profitDetail/:id",
  //   name: "profitDetail",
  //   rtlName: "مشروع",
  //   mini: "L",
  //   rtlMini: "هعذا",
  //   component: ProfitDetail,
  //   layout: "/admin",
  //
  // },

  // {
  //   path: "/preappuser",
  //   name: "Preferred App Users",
  //   rtlName: "يتعهد",
  //   icon: "tim-icons icon-user-run",
  //   component: PreAppUser,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notification",
  //   name: "Notifications",
  //   rtlName: "يتعهد",
  //   icon: "tim-icons icon-notes",
  //   component: Notification,
  //   layout: "/admin",
  // },
  // {
  //   path: "/news",
  //   name: "Coming Soon",
  //   rtlName: "يتعهد",
  //   icon: "tim-icons icon-map-big",
  //   component: News,
  //   layout: "/admin",
  // },
  // {
  //   path: "/faq",
  //   name: "Faq",
  //   rtlName: "يتعهد",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: Faq,
  //   layout: "/admin",
  // },

  // {
  //   path: "/settings",
  //   name: "Account Settings",
  //   rtlName: "لوحة القيادة",
  //   icon: "tim-icons icon-key-25",
  //   component: User,
  //   layout: "/admin",
  // },
  // {
  //   collapse: true,
  //   name: "Admin Panel",
  //   rtlName: "صفحات",
  //   icon: "tim-icons icon-paper",
  //   state: "adminCollapse",
  //   isManager: true, //use when item is for admin
  //   views: [
  //     {
  //       path: "/admin/wallets",
  //       name: "Wallets",
  //       rtlName: "لوحة القيادة",
  //       mini: "W",
  //       component: Wallets,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/admin/admins",
  //       name: "Bots",
  //       rtlName: "لوحة القيادة",
  //       mini: "B",
  //       component: Bots,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/admin/autorization",
  //       name: "Authorization",
  //       rtlName: "لوحة القيادة",
  //       mini: "A",
  //       component: Authorization,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/admin/settings",
  //       name: "Settings",
  //       rtlName: "لوحة القيادة",
  //       mini: "S",
  //       component: Setting,
  //       layout: "/admin",
  //     },
  //   ],
  // },
];

export default routes;
