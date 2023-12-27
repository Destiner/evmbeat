import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import Home from './pages/Home.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [{ path: '/', component: Home }],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

export { routerHistory, router };
