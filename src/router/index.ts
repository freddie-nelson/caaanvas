import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Canvas from "@/views/Canvas.vue";
import Dash from "@/views/Dash/Root.vue";
import DashCanvases from "@/views/Dash/Canvases.vue";
import DashSettings from "@/views/Dash/Settings.vue";
import DashProfile from "@/views/Dash/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/canvas",
    name: "Canvas",
    component: Canvas,
  },
  {
    path: "/dash",
    name: "Dash",
    component: Dash,
    children: [
      {
        path: "",
        name: "DashCanvases",
        component: DashCanvases,
      },
      {
        path: "settings",
        name: "DashSettings",
        component: DashSettings,
      },
      {
        path: "profile",
        name: "DashProfile",
        component: DashProfile,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
