<template>
  <q-card class="my-card q-mr-md">
    <q-card-section class="q-pa-md text-center">
      <q-avatar size="100px" class="q-mb-md" >
        <img :src="api_base_backend + empresa.image" />
      </q-avatar>
      <div class="w-full">{{ empresa.nombre }}</div>
    </q-card-section>
    <q-card-section class="q-pa-md">
      <div class="text-caption text-grey">{{ empresa.descripcion }}</div>
    </q-card-section>
    <q-card-section class="text-right row items-center justify-between"> 
      <div class="text-caption text-grey">
        {{ empresa.is_valid === 1? "Verificado" : "No verificado" }} 
        <q-icon
          :name="empresa.is_valid === 1 ? 'check_circle' : 'cancel'"
          :color="empresa.is_valid === 1? 'green' : 'red'"
          size="30px"
        />
      </div>
      <router-link class="text-md" :to="{name: 'enterprise-detail', params: {slug: empresa.slug}}">
        <q-icon name="arrow_forward" size="20px" />
      </router-link>
    </q-card-section>
  </q-card>
 </template>

<script>
import { api_base_backend } from "../helpers.js"

export default {
  props: ["empresa"],
  setup() {

    return {api_base_backend}
  }
}
</script>

<style scoped>
.my-card {
  width: 380px; /* ajusta el ancho de la tarjeta */
  height: auto; /* ajusta el alto de la tarjeta */
  margin-bottom: 20px; /* agrega un margen inferior a cada tarjeta */
  border-radius: 10px; /* agrega un borde redondeado a la tarjeta */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.scrollable-section {
   /* Altura máxima deseada para la sección */
  overflow-y: auto; /* Habilitar barra de desplazamiento vertical cuando sea necesario */
  /* Otros estilos opcionales */
}
</style>



