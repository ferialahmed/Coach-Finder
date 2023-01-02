<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ hourlyRate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <h2>Interested? Reach out now!</h2>
        <base-button link="true" :to="directedLink">Contact</base-button>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :mode="area">
          {{ area }}
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    hourlyRate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
    directedLink() {
      return this.$route.path + '/contact';
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coachesData/allCoaches'].find(
      (coach) => coach.id === this.$route.params.id
    );
  },
};
</script>
