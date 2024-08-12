<!-- eslint-disable vue/valid-template-root -->
<template>
   <q-toolbar class="column">
      <q-input
        style="width: 100%;"
        filled
        class="custom-input"
        v-model="search"
        label="Busqueda"
      >
         <template v-slot:prepend>
            <q-btn flat round dense class="icono_de_busqueda" icon="search"/>
         </template>
      </q-input>

      <q-toolbar class="row reverse">
         <q-btn flat bordered>
            <q-avatar icon="mdi-plus-circle-outline" />
         </q-btn>
      </q-toolbar>
      
   </q-toolbar>

   <div v-if="!isLoading" class="q-pa-md row justify-center">
      <div v-for="empresa in empresas" :key="empresa.id">
         <boton-empresas :empresa="empresa"/>
      </div>
   </div>
   <div v-if="isLoading" class="text-center">loading ...</div>
</template>

<script>
import BotonEmpresas from 'src/components/BotonEmpresas.vue';
import { api } from "src/boot/axios";
import { useUserStore } from "src/store/user.store";
import { ref } from "vue";

export default {
   components: {
      BotonEmpresas
   }, setup () {

      const search = ref("");
      const isLoading = ref(true)
      const empresas = ref(null)

      api.get("admin/enterprises").then((response) => {
         isLoading.value = false
         empresas.value = response.data
      })

      return {isLoading, empresas, search}
   }
}


</script>
