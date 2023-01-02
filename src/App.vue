<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component" />
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layouts/The-Header.vue';
export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters['autoLogout'];
    },
  },
  watch: {
    //redirecting to Coaches page on auto logout
    didAutoLogout(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    },
  },
  created() {
    //Auto login on refreshing the application
    this.$store.dispatch('autoLogin');
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.route-enter-active {
  transition: all 0.3s ease-in;
}
.route-leave-active {
  transition: all 0.3s ease-out;
}
</style>
