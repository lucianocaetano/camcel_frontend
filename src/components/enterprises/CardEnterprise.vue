<template>
  <q-card class="my-card">
    <q-card-section class="text-center" style="height: 200px">
      <div v-if="enterprise.image" style="width: 100%; height: 100%">
        <img
          :src="`${api_base_backend}/${enterprise.image}`"
          style="object-fit: cover;"
          width="100%"
          height="100%"
        />
        <p class="w-full">{{ enterprise.name }}</p>
      </div>

      <div v-else style="width: 100%; height: 100%" class="row justify-center items-center">
        <p>{{ enterprise.name }}</p>
      </div>
    </q-card-section>
    <q-card-section class="text-right row items-center justify-between">
      <div class="text-caption text-grey">
        {{ enterprise.is_valid ? "Verificado" : "No verificado" }}
        <q-icon
          :name="enterprise.is_valid ? 'check_circle' : 'cancel'"
          :color="enterprise.is_valid ? 'green' : 'red'"
          size="30px"
        />
      </div>
      <router-link
        class="text-md"
        :to="{ name: 'enterprise-detail', params: { slug: enterprise.slug } }"
      >
        <q-icon name="arrow_forward" size="20px" />
      </router-link>
    </q-card-section>
  </q-card>
</template>

<script>
import { api_base_backend } from "../../helpers.js";

export default {
  props: ["enterprise"],
  setup() {
    return { api_base_backend };
  },
};
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
