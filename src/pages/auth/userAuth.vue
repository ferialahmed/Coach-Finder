<template>
  <div>
    <base-dialog :show="!!isAuth" title="Error Found!" @close="handleError">
        <p>{{ isAuth }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authenticating...">
        <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
        <form @submit.prevent="userRegisteration">
            <div class="form-control" :class="{ errors: !formValidity }">
                <label for="email">E-Mail</label>
                <input type="email" id="email" v-model.trim="fields.email"/>
                <p>{{errors.email}}</p>
            </div>
            <div class="form-control" :class="{ errors: !formValidity }">
                <label for="password">Password</label>
                <input type="password" id="password" v-model.trim="fields.password"/>
                
                <p>{{errors.password}}</p>
            </div>
            <base-button>{{ submitButtonCaption }}</base-button>
            <base-button mode="flat" type="button" @click="switchAuthMode">
                {{switchModeButtonCaption}}
            </base-button>
      </form>
    </base-card>
  </div>
</template>
<script>
// import useValidate from '@vuelidate/core';
// import { required } from '@vuelidate/validators';
// import { stringLiteral } from '@babel/types';
import * as yup from 'yup';

export default {
  data() {
    const schema = yup.object().shape({
      email: yup.string().email().required('email is required'),
      password: yup.string().matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Use 8 or more characters with a mix of uppercase letters and numbers')
      .required('Password is required')
    })
    return {
      // v$: useValidate(),
      schema,
      fields:{

        email: '',
         password: '',
      } ,
      errors:{
        email: '',
        password: ''
      },
      mode: 'login',
      formValidity: true,
      isLoading: false,
      isAuth: null,

    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') return 'Login';
      else return 'SignUp';
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') return 'SignUp instead';
      else return 'Login instead';
    },
  },

  methods: { 
    switchAuthMode(){
      if (this.mode === 'login') this.mode = 'signup';
      else if (this.mode === 'signup') this.mode = 'login';
    },
    async userRegisteration(){
      let actionPayload = {
        email: this.fields.email,
        password: this.fields.password,
      };
      try{
      const response = await this.schema.validate(this.fields, {abortEarly: false})
      console.log(response)
      if(response) {
        console.log('success');
        this.errors.email = '';
        this.errors.password = '';
        this.formValidity = true;
      }
      }catch(err){
          err.inner.forEach(error => {
          this.errors[error.path] = error.message;
          this.formValidity = false;
      })}
      if (this.formValidity === true) {
        this.isLoading = true;
        try {
          if (this.mode === 'login') {
            await this.$store.dispatch('login', actionPayload);
          } else {
            await this.$store.dispatch('signup', actionPayload);
          }
          this.switchAuthMode();
          const redirectedUrl = '/' + (this.$route.query.red || 'coaches');
          this.$router.replace(redirectedUrl);
        } catch (error) {
          console.log(error)
          this.isAuth = error.message;
        }
        this.isLoading = false;
      }
    },
    handleError() {
      this.isAuth = null;
    }
    },
  
};
</script>
<style scoped>
form {
  margin: 1rem;
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

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors input {
  border: 1px solid red;
}
 .errors p {
  color: red;
}

.actions {
  text-align: center;
}
</style>
