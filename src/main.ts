import 'material-symbols/outlined.css';
import { createApp } from 'vue';
import { pinia } from './stores/index';
import App from './App.vue';
import router from './router';
import * as I18n from './i18n/index';

// Set up i18n
const locale = (window.localStorage.getItem('locale') || navigator.language || 'en').split('-')[0];
const i18n = I18n.createI18n();
I18n.setLanguage(i18n, locale);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');
