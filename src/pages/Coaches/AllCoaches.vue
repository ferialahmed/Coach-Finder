<template>
  <div>
    <base-card>
      <section>
        <coach-filter @update-filter="filterCoaches"></coach-filter>
      </section>
    </base-card>
    <base-card>
      <base-dialog :show="!!error" title="An error occured" @close="handleError"
        ><p>{{ error }}</p></base-dialog
      >
      <section>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">
            Refresh
          </base-button>
          <base-button
            v-if="!isCoach && isAuthenticated"
            link="true"
            to="/register"
          >
            Register as a Coach
          </base-button>
          <base-button
            v-else-if="!isAuthenticated"
            link="true"
            to="/login?red=register"
            >Login to register</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="!isLoading && hasCoaches">
          <li v-for="coach in getCoaches" :key="coach.id">
            <coachItem
              :firstName="coach.firstName"
              :lastName="coach.lastName"
              :rating="coach.hourlyRate"
              :areas="coach.areas"
              :id="coach.id"
            ></coachItem>
          </li>
        </ul>
        <h3 v-if="emptyCoachList && !isLoading">{{ emptyCoachList }}</h3>
      </section>
    </base-card>
  </div>
</template>
<script>
import coachItem from '../../components/coaches/coachItem.vue';
import coachFilter from '../../components/coaches/coachFilter.vue';

export default {
  components: {
    coachItem,
    coachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  computed: {
    isCoach() {
      return this.$store.getters['coachesData/isCoach'];
    },
    isAuthenticated() {
      return this.$store.getters['isAuthenticated'];
    },
    getCoaches() {
      const filteredCoaches = this.$store.getters[
        'coachesData/allCoaches'
      ].filter((coach) => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          console.log('frontEnd');
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          console.log('backEnd');
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          console.log('career');
          return true;
        }
        return false;
      });
      return filteredCoaches;
    },
    emptyCoachList() {
      if (this.getCoaches.length === 0)
        return 'No coaches found in these Areas';
      return false;
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coachesData/hasCoaches'];
    }
  },
  
  created() {
    this.loadCoaches();
  },

  methods: {
    filterCoaches(updatedFilter) {
      this.activeFilter = updatedFilter;
    },
    loadCoaches(refresh = false) {
      this.isLoading = true;
      this.$store
        .dispatch('coachesData/setCoaches', { forceUpdate: refresh })
        .then(() => true)
        .catch((err) => (this.error = err.message))
        .finally(() => (this.isLoading = false));
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.controls {
  display: flex;
  justify-content: space-between;
}
h3{
  text-align: center;
}
</style>
