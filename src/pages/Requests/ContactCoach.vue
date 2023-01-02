<template>
  <div>
    <base-dialog :show="!!error" title="Error found" @close="handleError">
      {{error}}
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your E-Mail</label>
        <input id="email" type="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message" v-model.trim="message"></textarea>
      </div>
      <p v-if="!formValidity" :class="{ errors: !formValidity }">
        Please enter a valid email and non-empty message
      </p>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </div>
</template>
<script>
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
export default {
  data() {
    return {
      v$: useValidate(),
      error: null,
      email: '',
      message: '',
      formValidity: true,
    };
  },

  validations() {
    return {
      email: { required },
      message: { required },
    };
  },

  methods: {
    validateForm() {
      this.v$.$validate();
      if (this.v$.email.$error || this.v$.message.$error) {
        this.formValidity = false;
      } else {
        this.formValidity = true;
      }
    },
    async submitForm() {
      this.validateForm();
      if (this.formValidity) {
        try {
          await this.$store.dispatch('requests/addRequest', {
            email: this.email,
            message: this.message,
            id: this.$route.params.id
          });
          this.$router.replace('/coaches');
        } catch (err) {
          this.error = err.message;
        }
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
