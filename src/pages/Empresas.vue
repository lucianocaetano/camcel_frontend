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
         <q-btn flat bordered @click="enterpriseCreate = true">
            <q-avatar icon="mdi-plus-circle-outline" />
         </q-btn>
         <q-dialog v-model="enterpriseCreate" >
           <q-card style="width: 900px;">
             <q-card-section>
               <div class="text-h6">Crear Empresa</div>
             </q-card-section>

             <q-card-section class="q-pt-none">
                <q-form @submit.prevent="handleCreateEnteprise">
                  <q-input name="RUT" label="RUT" v-model="dataCreateEnteprise.RUT"/>
                  <q-input name="nombre" label="nombre" v-model="dataCreateEnteprise.nombre"/>
                  <q-checkbox v-model="dataCreateEnteprise.valid" label="Verificado" />

                  <q-file color="teal" filled label="image" v-model="dataCreateEnteprise.image">
                    <template v-slot:prepend>
                      <q-icon name="cloud_upload" />
                    </template>
                  </q-file>


                  <q-btn label="Crear" class="q-mt-md" type="submit" color="primary"/>
                </q-form>
             </q-card-section>

             <q-card-actions align="right">
               <q-btn flat label="Cerrar" color="primary" v-close-popup />
             </q-card-actions>
           </q-card>
         </q-dialog>

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
import { reactive, ref } from "vue";

export default {
   components: {
      BotonEmpresas
   }, setup () {
      const search = ref("");
      const enterpriseCreate = ref(false);
      const isLoading = ref(true)
      const empresas = ref(null)

      const dataCreateEnteprise = reactive({
         nombre: "", RUT: "", valid: false, image: null
      })

      api.get("enterprises").then((response) => {
         isLoading.value = false
         empresas.value = response.data
      })

      const handleCreateEnteprise = () => {
         console.log(dataCreateEnteprise.image)
      }

      return {isLoading, empresas, search, enterpriseCreate, handleCreateEnteprise, dataCreateEnteprise}
   }
}


</script>
