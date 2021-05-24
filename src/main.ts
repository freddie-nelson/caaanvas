import { createApp } from "vue"
import App from "./App.vue"

import "./css/index.css"

const app = createApp(App)

import router from "@/router"
app.use(router)

app.mount("#app")
