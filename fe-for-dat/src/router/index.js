import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import ProductView from "../views/ProductView.vue";
import BrandView from "../views/BrandView.vue";
import CartView from "../views/CartView.vue";
import UserView from "../views/UserView.vue";
import AddressView from "../views/AddressView.vue";
import CheckOutView from "../views/CheckOutView.vue";
import OrderView from "../views/OrderView.vue";
import SearchView from "../views/SearchView.vue";

import MainLayout from "@/layout/MainLayout.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/danh-muc/:category_name",
        name: "showCategoryView",
        props: true,
        component: CategoryView,
      },
      {
        path: "/tim-kiem",
        name: "showSearchView",
        props: true,
        component: SearchView,
      },
      {
        path: "/thuong-hieu/:brand_name",
        name: "showBrandView",
        component: BrandView,
      },
      {
        path: "/san-pham/:kind/:id",
        name: "showProductView",
        component: ProductView,
      },
      {
        path: "/gio-hang",
        name: "showCartView",
        component: CartView,
      },
      {
        path: "/tai-khoan",
        name: "showAccountView",
        component: UserView,
      },
      {
        path: "/dia-chi",
        name: "showAddressView",
        component: AddressView,
      },
      {
        path: "/thanh-toan",
        name: "showCheckOutView",
        component: CheckOutView,
      },
      {
        path: "/don-hang",
        name: "showOrderView",
        component: OrderView,
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
