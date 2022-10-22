import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import ProductView from "../views/ProductView.vue";
import BrandView from "../views/BrandView.vue";
import CartView from "../views/CartView.vue";

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
        path:"/danh-muc/:category_name",
        name: "showCategoryView",
        props: true,
        component: CategoryView
      },
      {
        path:"/thuong-hieu/:brand_name",
        name: "showBrandView",
        component: BrandView
      },
      {
        path:"/san-pham/:kind/:id",
        name: "showProductView",
        component: ProductView
      },
      {
        path:"/gio-hang",
        name: "showCartView",
        component: CartView
      }
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
