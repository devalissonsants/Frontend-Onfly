import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const token = localStorage.getItem('token');
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
});

export { api };
