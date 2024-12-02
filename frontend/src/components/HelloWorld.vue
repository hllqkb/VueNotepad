<template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import config from '../config';
  export default {
    data() {
      return {
        message: ''
      };
    },
    mounted() {
      axios.get(`${config.API_BASE_URL}/data`)
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  </script>
  
  <style scoped>
  /* 这里可以添加样式 */
  </style>
  