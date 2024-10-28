<template>
  <q-toolbar class="column">
      <q-input
        style="width: 100%;"
        filled
        class="custom-input"
        v-model="search"
        label="Busqueda">

         <template v-slot:prepend>
            <q-btn flat round dense class="icono_de_busqueda" icon="search"/>
         </template>
      </q-input>

   </q-toolbar>

  <q-page>
    <div class="ola row justify-center q-mt-md">
      <div class="col-12">
        <!-- Añadir el menú desplegable para filtrar -->
        <q-btn-dropdown  color="#a5a5a5" :label="selectedOption" text-color="#000000">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick('Todos')">
              <q-item-section>
                <q-item-label>Todos</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onItemClick('Aceptados')">
              <q-item-section>
                <q-item-label>Aceptados</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onItemClick('Rechazados')">
              <q-item-section>
                <q-item-label>Rechazados</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <!-- Lista de actividades filtradas -->
        <q-list bordered separator>
          <q-item>
        <q-item-section class="col-2 text-center">
          <q-item-label header>Nombre Empresa</q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-center">
          <q-item-label header>Trabajo a realizar</q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-center">
          <q-item-label header>Fecha</q-item-label>
        </q-item-section>

        <q-item-section class="col-2 text-center">
          <q-item-label header>Confirmación Prevencionista</q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-center">
          <q-item-label header>Confirmación Empresa</q-item-label>
        </q-item-section>
        <q-item-section class="col-1 text-center q-pl-xs">
          <q-item-label header>Más información</q-item-label>
        </q-item-section>

      </q-item>

          <q-item v-for="(actividad, index) in filteredActividades" :key="index" :class="{'bg-grey-4': index % 2 === 0}">
            <q-item-section class="col-2 text-center">
             {{ actividad.nombre }}
            </q-item-section>
            <q-item-section class="col-2 text-center">
             {{ actividad.trabajo }}
            </q-item-section>
            <q-item-section class="col-2 text-center">
              {{ actividad.fecha }}
            </q-item-section>
            <q-item-section side class="col-2 content-center">
              <!-- <q-icon class="row justify-center items-center" size="40px" style="padding-right: 20px"
              :name ="actividad.confirmacion ? 'mdi-check-circle' : 'mdi-close-circle'">
              :color ="actividad.confirmacion ? 'green' : 'red'" </q-icon> -->
              <q-icon v-if="actividad.confirmacionPREV" name="mdi-check-circle" color="green" size="40px" style="padding-right: 20px;"> </q-icon>
              <q-icon v-if="!actividad.confirmacionPREV" name="mdi-close-circle" color="red" size="40px" style="padding-right: 20px;"> </q-icon>
             
              
            </q-item-section>
            <q-item-section side class="col-2 content-center">
              <!-- <q-icon class="row justify-center items-center" size="40px" style="padding-right: 20px"
              :name ="actividad.confirmacion ? 'mdi-check-circle' : 'mdi-close-circle'">
              :color ="actividad.confirmacion ? 'green' : 'red'" </q-icon> -->
              
              <q-icon v-if="actividad.confirmacionEmpresa" name="mdi-check-circle" color="green" size="40px" > </q-icon>
              <q-icon v-if="!actividad.confirmacionEmpresa" name="mdi-close-circle" color="red" size="40px"> </q-icon>
              
            </q-item-section>
            <q-item-section class="col-1 content-center q-pl-xl">
        
         <q-btn  class="boton" color="white" text-color="black" icon="description"/>
        
        </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedOption = ref('Todos')
const actividades = ref([
  { nombre: 'Actividad 1', trabajo: 'Compensacion por romper la ventana', fecha: '2024-11-01', confirmacionPREV:true, confirmacionEmpresa:false },
  { nombre: 'Actividad 2', trabajo: 'Compensacion por romper la ventana', fecha: '2024-11-02', confirmacionPREV:false, confirmacionEmpresa:false },
  { nombre: 'Actividad 3', trabajo: 'Compensacion por romper la ventana', fecha: '2024-11-03', confirmacionPREV:true, confirmacionEmpresa:true},
  // ... más actividades
])

const onItemClick = (option) => {
  selectedOption.value = option
}

const filteredActividades = computed(() => {
  switch(selectedOption.value) {
    case 'Aceptados':
      return actividades.value.filter(a => a.confirmacionEmpresa === true, a => a.confirmacionPREV === true)
    case 'Rechazados':
      return actividades.value.filter(a => a.confirmacionEmpresa === false, a => a.confirmacionPREV === false)
    default:
      return actividades.value
  }
})



</script>

<style scoped>


@media only screen and (max-width: 1022px) {
.ola{
  overflow-x: scroll;
  width: 900px;
}
}

</style>

<style>
.boton-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>