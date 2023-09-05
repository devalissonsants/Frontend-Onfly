<template>
  <div class="q-pa-md column flex-center">
    <q-card>
      <q-card-section class="q-pt-xl q-pb-xl">
        <div class="q-gutter-md">
          <h2 class="q-mb-md">Login</h2>
          <q-input v-model="email" label="Email" outlined dense />
          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            dense
          />
          <q-btn @click="login" color="primary" label="Login" class="q-mt-md" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import './Login.css';
import { api } from 'boot/axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('auth/login', {
          username: this.email,
          password: this.password,
          grant_type: 'password',
          client_id: '9a0e0e22-4226-4bbb-9c0f-0bce26539e68',
          client_secret: '6YzhT3PmW8qzZVJPlcUDXH7JX3Obq8lFE5vuEhdp',
          scope: '',
        });

        localStorage.setItem('token', response.data.access_token);

        this.$router.push('/');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    },
  },
};
</script>
