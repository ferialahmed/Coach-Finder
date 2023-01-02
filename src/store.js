import { createStore } from 'vuex';
import coachesData from './modules/coaches';
import requests from './modules/requests';
import auth from './modules/auth';

const store = createStore({
  modules: {
    coachesData,
    requests,
    auth,
  },
});
export default store;
