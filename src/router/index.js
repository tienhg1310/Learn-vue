import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/product",
      name: "product.list",
      component: () => import("../views/products/List.vue"),
    },
    {
      path: "/product/create",
      name: "product.create",
      component: () => import("../views/products/Form.vue"),
    },
    {
      path: "/user",
      name: "users.list",
      component: () => import("../views/users/List.vue"),
    },
    {
      path: "/user/create",
      name: "users.create",
      component: () => import("../views/users/Form.vue"),
    },
  ],
});

export default router;
