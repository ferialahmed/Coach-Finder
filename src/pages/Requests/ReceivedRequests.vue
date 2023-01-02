<template>
  <div>
    <base-dialog :show="!!error" title="Error found" @close="handleError">
      {{ error }}
    </base-dialog>

    <base-card>
      <header>
        <h3>Requests Received</h3>
      </header>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-if="!isLoading">
        <request-item
          v-for="request in allRequests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></request-item>
      </ul>
      <h4 v-if="!isLoading && emptyRequestsList">{{ emptyRequestsList }}</h4>
    </base-card>
  </div>
</template>
<script>
import requestItem from '../../components/requests/requestItem.vue';
export default {
  data() {
    return {
      error: null,
      isLoading: true,
    };
  },
  components: {
    requestItem,
  },
  computed: {
    allRequests() {
      return this.$store.getters['requests/getRequests'];
    },
    emptyRequestsList() {
      if (this.allRequests.length === 0) return 'No requests found for you';
      return false;
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      try {
        await this.$store.dispatch('requests/loadRequests');
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3,
h4 {
  text-align: center;
}
</style>
