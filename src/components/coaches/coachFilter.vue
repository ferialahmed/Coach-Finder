<template>
  <div>
    <h2>Find your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilters" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilters" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilters" />
      <label for="career">Career</label>
    </span>
  </div>
</template>
<script>
export default {
  emits: ['update-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilters(event) {
      const coachId = event.target.id;
      const isActive = event.target.checked;
      // const updatedFilter = { ...this.filters,
      //     [coachId]: isActive};
      //     console.log(updatedFilter);
      const updatedFilter = Object.assign({}, this.filters, {
        [coachId]: isActive,
      });
      this.filters = updatedFilter;
      this.$emit('update-filter', updatedFilter);
    },
  },
};
</script>
<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
