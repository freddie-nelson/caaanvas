import { createApp } from "vue";
import App from "./App.vue";

// import fonts
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

import "@fontsource/roboto-mono/300.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/500.css";
import "@fontsource/roboto-mono/600.css";

// import tailwind
import "./css/index.css";

const app = createApp(App);

import router from "@/router";
app.use(router);

import store from "@/store";
app.use(store);

app.mount("#app");
