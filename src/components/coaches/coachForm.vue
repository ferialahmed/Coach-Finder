<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstNameValidity }">
      <label for="firstName">Firstname</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName"
        @blur="clearValidity"
      />
      <p v-if="firstNameValidity">This field can't be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastNameValidity }">
      <label for="lastName">Lastname</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName"
        @blur="clearValidity"
      />
      <p v-if="lastNameValidity">This field can't be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !descriptionValidity }">
      <label for="description">Description</label>
      <textarea
        type="text"
        id="description"
        v-model.trim="description"
        @blur="clearValidity"
      ></textarea>
      <p v-if="!descriptionValidity">This field can't be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRateValidity }">
      <label for="hourlyRate">hourly Rate</label>
      <input
        type="number"
        id="hourlyRate"
        v-model.number="hourlyRate"
        @blur="clearValidity"
      />
      <p v-if="!hourlyRateValidity">Rate must be more than 0!</p>
    </div>

    <div :class="{ invalid: !areasValidity }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas"
          @blur="clearValidity"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas"
          @blur="clearValidity"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas"
          @blur="clearValidity"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areasValidity">Choose at least one</p>
    </div>
    <div class="form-control">
      <base-button>Register</base-button>
    </div>
  </form>
</template>
<script>

import useValidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

export default {
  data() {
    return {
      v$: useValidate(),
      firstName: '',
      lastName: '',
      description: '',
      hourlyRate: null,
      areas: [],
      firstNameValidity: true,
      lastNameValidity: true,
      descriptionValidity: true,
      hourlyRateValidity: true,
      areasValidity: true,
    };
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      description: { required },
      hourlyRate: { required, minValue: minValue(0) },
      areas: { required },
    };
  },
  methods: {
    clearValidity() {
      this.validateForm();
    },
    validateForm() {
      this.v$.$validate();
      if (this.v$.firstName.$error) {
        this.firstNameValidity = false;
        console.log(this.v$.firstName);
      } else {
        this.firstNameValidity = true;
      }
      if (this.v$.lastName.$error) {
        this.lastNameValidity = false;
      } else {
        this.lastNameValidity = true;
      }
      if (this.v$.description.$error) {
        this.descriptionValidity = false;
      } else {
        this.descriptionValidity = true;
      }
      if (this.v$.hourlyRate.$error) {
        this.hourlyRateValidity = false;
      } else {
        this.hourlyRateValidity = true;
      }
      if (this.v$.areas.$error) {
        this.areasValidity = false;
      } else {
        this.areasValidity = true;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.v$.$error) {
        this.$store.dispatch('coachesData/registerCoach', {
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.description,
          hourlyRate: this.hourlyRate,
          areas: this.areas,
        });
        this.$router.replace('/coaches');
      }
    },
  },
};
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
