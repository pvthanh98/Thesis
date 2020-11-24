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
import StoreIcon from '@material-ui/icons/Store'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import BillAdd from './views/Bill/add';
import List from './views/Bill/list';
import StoreInfo from './views/Storeinfo/Storeinfo.js';
// core components/views for RTL layout
import Service from "views/Service/service";
import AddService from './views/Service/addservice';
import ModifyService from './views/Service/modifyservice';
import BillModify from './views/Bill/modify';
import Rescue from './views/Rescue/index';
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
    path: "/rescue",
    name: "Rescue",
    exact: true,
    rtlName: "قائمة الجدول",
    icon: DirectionsCarIcon,
    component: Rescue,
    layout: "/admin",
    showSidebar: true
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
    path: "/bill/modify/:id",
    name: "Bill",
    icon: "business_center",
    component: BillModify,
    exact: true,
    layout: "/admin",
    showSidebar: false
  },
  {
    path: "/bill/add/:customer_id",
    name: "Bill",
    icon: "business_center",
    component: BillAdd,
    exact: true,
    layout: "/admin",
    showSidebar: false
  },
  {
    path: "/bill",
    name: "Bill",
    icon: "business_center",
    component: List,
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
