import { createApp } from 'vue'
import VueTypewriterEffect from "vue-typewriter-effect";
import App from './App.vue'
const app = createApp(App);

app
.component("vue-typewriter-effect", VueTypewriterEffect)
.mount("#app");

