import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import FontAwesomeIcon from "./fontawesome-icons.ts";

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(VueSweetalert2)
    .use(router)
    .mount('#app')
