/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import StoreIcon from '@material-ui/icons/Store'
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import ProvisionalBillAdd from './views/ProvisionalBill/provisional_bill_add';
import ProvisionalList from './views/ProvisionalBill/list';
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import StoreInfo from './views/Storeinfo/Storeinfo.js';
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Service from "views/Service/service";
import AddService from './views/Service/addservice';
import ModifyService from './views/Service/modifyservice';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    exact: true,
    showSidebar: true
  },
  {
    path: "/service/add",
    name: "Service",
    icon: StoreIcon,
    component: AddService,
    layout: "/admin",
    exact: true,
    showSidebar: false
  },
  {
    path: "/service/modify/:id",
    name: "Service",
    exact: true,
    icon: StoreIcon,
    component: ModifyService,
    layout: "/admin",
    showSidebar: false
  },
  {
    path: "/service",
    name: "Service",
    exact: true,
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Service,
    layout: "/admin",
    showSidebar: true
  },
  {
    path: "/bill",
    name: "Bill",
    rtlName: "قائمة الجدول",
    icon: "payment",
    component: TableList,
    exact: true,
    layout: "/admin",
    showSidebar: true
  },
  {
    path: "/provisional_bill/add",
    name: "Provisional Bill",
    icon: "business_center",
    component: ProvisionalBillAdd,
    exact: true,
    layout: "/admin",
    showSidebar: false
  },
  {
    path: "/provisional_bill",
    name: "Provisional Bill",
    icon: "business_center",
    component: ProvisionalList,
    exact: true,
    layout: "/admin",
    showSidebar: true
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   exact: true,
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin",

  //   showSidebar: true
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   exact: true,
  //   layout: "/admin",
  //   showSidebar: true
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  //   exact: true,
  //   showSidebar: true
  // },
  {
    path: "/info",
    name: "Info",
    icon: "info",
    component: StoreInfo,
    layout: "/admin",
    exact: true,
    showSidebar: true
  },
];

export default dashboardRoutes;
