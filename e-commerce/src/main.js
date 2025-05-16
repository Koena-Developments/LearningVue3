import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import StripePlugin from 'vue-stripe-elements-plus'; 


createApp(App).use(router).mount('#app');
// .use(StripePlugin, {Publishable_Key: process.env(STRIPE_SECRET_KEY)})