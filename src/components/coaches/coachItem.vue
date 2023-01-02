<template>
  <div class="container">
    <div>
      <h3>{{ fullName }}</h3>
      <h4>${{ rating }}/hour</h4>
      <ul>
        <base-badge v-for="area in areas" :key="area" :mode="area">
          {{ area }}
        </base-badge>
      </ul>
    </div>
    <div class="actions">
      <base-button link="true" :to="coachContactLink" mode="outline">
        Contact
      </base-button>
      <base-button link="true" :to="coachDetailLink"> Details </base-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['firstName', 'lastName', 'rating', 'areas', 'id'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    coachDetailLink() {
      return this.$route.path + '/' + this.id;
    },
  },
};
</script>

<style scoped>
div.container {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

ul {
  padding: 0;
}
/* li {
    list-style: none;
    display: inline-block;
    margin-right: 0.5rem ;
} */

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
