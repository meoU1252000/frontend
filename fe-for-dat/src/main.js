import { createApp } from "vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import BadgeDirective from "primevue/badgedirective";
import Dropdown from "primevue/dropdown";
import DataView from "primevue/dataview";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import InputNumber from "primevue/inputnumber";
import Slider from "primevue/slider";
import PanelMenu from "primevue/panelmenu";
import Checkbox from "primevue/checkbox";
// import VueFbCustomerChat from "vue-fb-customer-chat";
import Image from "primevue/image";
import Carousel from "primevue/carousel";
import Galleria from "primevue/galleria";
import VueSweetalert2 from "vue-sweetalert2";
import InputMask from "primevue/inputmask";
import "sweetalert2/dist/sweetalert2.min.css";

import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "@/assets/styles/global.css";
import "../src/assets/styles/main.scss";
const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;

app.directive("badge", BadgeDirective);
app.component("DataView", DataView);
app.component("my-dropdown", Dropdown);
app.component("my-button", Button);
app.component("my-dialog", Dialog);
app.component("my-inputText", InputText);
app.component("my-inputNumber", InputNumber);
app.component("my-slider", Slider);
app.component("my-password", Password);
app.component("my-panel", PanelMenu);
app.component("my-checkbox", Checkbox);
app.component("my-image", Image);
app.component("my-carousel", Carousel);
app.component("my-galleria", Galleria);
app.component("my-InputMask", InputMask);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyD-ssz8mLgCIWlm_EcxZ935oXoVrWYPsCE",
  },
});

// app.use(VueFbCustomerChat, {
//   page_id: 100083056603992, //  change 'null' to your Facebook Page ID,
//   theme_color: "#333333", // theme color in HEX
//   locale: "en_US", // default 'en_US'
// });
app.mount("#app");
