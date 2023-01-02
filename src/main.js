import { createApp, defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import baseButton from './components/ui/baseButton.vue';
import baseCard from './components/ui/baseCard.vue';
import baseBadge from './components/ui/baseBadge';
// import baseDialog from './components/ui/baseDialog.vue';
import baseSpinner from './components/ui/baseSpinner.vue';
import routes from './router';
import store from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const baseDialog = defineAsyncComponent(()=>import('./components/ui/baseDialog.vue'))
const app = createApp(App);
app.component('base-button', baseButton);
app.component('base-card', baseCard);
app.component('base-badge', baseBadge);
app.component('base-dialog', baseDialog);
app.component('base-spinner', baseSpinner);
app.use(router);
app.use(store);
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
app.mount('#app');
