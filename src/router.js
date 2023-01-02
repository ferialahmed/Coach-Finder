// import { defineAsyncComponent } from 'vue';
import AllCoaches from './pages/Coaches/AllCoaches.vue';
// import CoachDetails from './pages/Coaches/CoachDetails.vue';
// import RegisterCoach from './pages/Coaches/RegisterCoach.vue';
// import contactCoach from './pages/Requests/ContactCoach.vue';
// import ReceivedRequests from './pages/Requests/ReceivedRequests.vue';
// import NotFound from './pages/NotFound.vue';
import userAuth from './pages/auth/userAuth';

const contactCoach = () => import('./pages/Requests/ContactCoach.vue');
const CoachDetails = () => import('./pages/Coaches/CoachDetails.vue');
const RegisterCoach = () => import('./pages/Coaches/RegisterCoach.vue');
const ReceivedRequests = () => import('./pages/Requests/ReceivedRequests.vue');
const NotFound = () => import('./pages/NotFound.vue');
const routes = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: AllCoaches },
  {
    path: '/coaches/:id',
    component: CoachDetails,
    children: [{ path: 'contact', component: contactCoach }],
  },
  { path: '/register', component: RegisterCoach, meta: { requiresAuth: true } },
  {
    path: '/requests',
    component: ReceivedRequests,
    meta: { requiresAuth: true },
  },
  { path: '/:notFound(.*)', component: NotFound },
  { path: '/login', component: userAuth, meta: { requiresUnAuth: true } },
];
export default routes;
