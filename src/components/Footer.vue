<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pagina flex flex-center bg-teal-10">
    <div class="text-h4 text-white"> Todos los derechos reservados UTU</div>
  </div>
  </template>
  <script setup>
  import { ref } from "vue";
  
  const icons = ref([
    "mdi:mdi-facebook",
    "mdi:mdi-twitter",
    "mdi:mdi-linkedin",
    "mdi:mdi-instagram",
  ]);
  </script>
  <style scoped>
  @media (min-width: 0) and (max-width: 960px) {
    .ocultar {
      display: none;
    }
  }
  .pagina{
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    z-index: 2;
  }
  </style>
  