import { createApp } from "vue"
import App from "./App.vue"

import "./css/index.css"

const app = createApp(App)

import router from "@/router"
app.use(router)

import store from "@/store"
app.use(store)

app.mount("#app")
