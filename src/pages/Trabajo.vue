<template >


  <q-page >
    <div class="ola q-mx-auto">
    
    <q-list bordered>
      <q-item bordered>
        <q-item-section class="col-2"> 
          <q-item-label header>Nombre Empresa</q-item-label>
        </q-item-section>
        <q-item-section class="col-2"> 
          <q-item-label header>Trabajo a realizar</q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-center"> 
          <q-item-label header>fecha <br>
                              * Entrada <br>
                              * Salida</q-item-label>
        </q-item-section>
       
        <q-item-section class="col-2 text-center"> 
          <q-item-label header>Confirmación <br>
                               Prevencionista </q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-center"> 
          <q-item-label header>Confirmación <br>
                               Empresa </q-item-label>
        </q-item-section>
        <q-item-section class="col-2 text-center"> 
          <q-item-label header>Mas informacion</q-item-label>
        </q-item-section>
      </q-item>
      <q-list bordered>
        <q-item >
          <q-item-section class="col-12 text-center" > 
            <q-btn  color="green" @click="registrar" class="col-12">Registrar trabajo</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
      

      <q-item v-for="(actividad, index) in actividadesFiltradas" :key="index" :class="{'bg-grey-4': index % 2 === 0}">
        <q-item-section class="col-2"> 
          {{ actividad.nombre }} 
        </q-item-section>
        <q-item-section class="col-2"> 
          {{ actividad.trabajo }}
        </q-item-section>
        <q-item-section class="col-2 text-center"> 
          {{ actividad.fechaInicio }} <br>
          {{ actividad.fechaFin }}
        </q-item-section>
      
        <q-item-section class="col-3 text-center">
          <div>
            <q-btn round v-if="actividad.confirmacionPREV === null" color="green" @click="confirmarPREV(index)" icon="mdi-check-circle" />
            <q-btn round v-if="actividad.confirmacionPREV === null" color="red"  @click="denegarPREV(index)" icon="mdi-close-circle" />
            
            <q-icon v-if="actividad.confirmacionPREV === true" name="mdi-check-circle" color="green" size="40px" style="padding-right: 20px;"> </q-icon>
            <q-icon v-if="actividad.confirmacionPREV === false" name="mdi-close-circle" color="red" size="40px" style="padding-right: 20px;"> </q-icon>
            
            
          </div>
          <q-item-section class="col-1 text-center">

          </q-item-section>
          </q-item-section>
          <q-item-section class="col-1 text-center">
          
            
            <q-icon v-if="actividad.confirmacionEmpresa" name="mdi-check-circle" color="green" size="40px" > </q-icon>
            <q-icon v-if="!actividad.confirmacionEmpresa" name="mdi-close-circle" color="red" size="40px"> </q-icon>
          
        </q-item-section>
        <q-item-section class="col-2 text-center">
          <q-btn class="q-mx-auto" style="background-color: white;"> <q-icon name="mdi-text-box-search-outline" size="30px"></q-icon></q-btn>
        </q-item-section>
      </q-item> 
    </q-list> 
   </div>
  </q-page>
  <!--
  <q-page v-if="isMobile()">
    <div class="ola q-mx-auto">
      <q-list bordered>
        <q-item bordered>
          <q-item-section class="col-4">
            <q-item-label header>Trabajo a realizar</q-item-label>
          </q-item-section>
          <q-item-section class="col-4">
            <q-item-label header>Fecha Inicio</q-item-label>
          </q-item-section>
          <q-item-section class="col-4">
            <q-item-label header>Fecha Fin</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-for="(actividad, index) in actividadesFiltradas" :key="index" :class="{'bg-grey-4': index % 2 === 0}" @click="abrirDetalles(actividad)">
          <q-item-section class="col-4">
            {{ actividad.trabajo }}
          </q-item-section>
          <q-item-section class="col-4">
            {{ actividad.fechaInicio }}
          </q-item-section>
          <q-item-section class="col-4">
            {{ actividad.fechaFin }}
          </q-item-section>
        </q-item>
      </q-list>
      
     
      <q-btn color="green" @click="registrar" class="q-mx-auto">Registrar trabajo</q-btn>

      
      <q-dialog v-model="dialogVisible">
        <q-card>
          <q-card-section>
            <div>
              <h4>{{ actividadSeleccionada.trabajo }}</h4>
              <p>Nombre Empresa: {{ actividadSeleccionada.nombre }}</p>
              <p>Hora Entrada: {{ actividadSeleccionada.horaEntrada }}</p>
              <p>Hora Salida: {{ actividadSeleccionada.horaSalida }}</p>
              <p>Fecha Inicio: {{ actividadSeleccionada.fechaInicio }}</p>
              <p>Fecha Fin: {{ actividadSeleccionada.fechaFin }}</p>
              <p>Confirmación Prevencionista: {{ actividadSeleccionada.confirmacionPREV }}</p>
              <p>Confirmación Empresa: {{ actividadSeleccionada.confirmacionEmpresa }}</p>
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Cerrar" @click="dialogVisible = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
  -->
</template>


 


<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';




const actividades = ref([
  { nombre: "Los Pinos", trabajo: "Revisar sistema eléctrico", horaEntrada: "8:00", horaSalida: "17:00", fechaInicio: "2024-10-11", fechaFin: "2024-10-24", completada: false, confirmacionPREV: true, confirmacionEmpresa: true },
  { nombre: "El Roble", trabajo: "Reparar sistema de agua", horaEntrada: "9:00", horaSalida: "18:00", fechaInicio: "2024-10-12", fechaFin: "2024-10-25", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Industria Metalúrgica", trabajo: "Mantenimiento de máquinas", horaEntrada: "7:30", horaSalida: "16:00", fechaInicio: "2024-08-25", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Industria Metalúrgica", trabajo: "Mantenimiento de máquinas", horaEntrada: "7:30", horaSalida: "16:00", fechaInicio: "2024-10-13", fechaFin: "2024-10-26", completada: false, confirmacionPREV: false, confirmacionEmpresa: true },
  { nombre: "Colegio San Martín", trabajo: "Instalación de paneles solares", horaEntrada: "7:00", horaSalida: "15:00", fechaInicio: "2024-10-14", fechaFin: "2024-10-27", completada: false, confirmacionPREV: true, confirmacionEmpresa: false },
  { nombre: "Hospital Central", trabajo: "Reparación de generador", horaEntrada: "6:30", horaSalida: "14:30", fechaInicio: "2024-10-15", fechaFin: "2024-10-28", completada: false, confirmacionPREV: null, confirmacionEmpresa: false },
  { nombre: "Taller Mecánico López", trabajo: "Reemplazo de luces fluorescentes", horaEntrada: "10:00", horaSalida: "19:00", fechaInicio: "2024-10-16", fechaFin: "2024-10-29", completada: false, confirmacionPREV: null, confirmacionEmpresa: false },
  { nombre: "Fábrica de Plásticos", trabajo: "Inspección de seguridad", horaEntrada: "8:30", horaSalida: "17:30", fechaInicio: "2024-10-17", fechaFin: "2024-10-30", completada: false, confirmacionPREV: null, confirmacionEmpresa: false },
  { nombre: "Universidad Nacional", trabajo: "Revisión de red eléctrica", horaEntrada: "7:45", horaSalida: "16:15", fechaInicio: "2024-10-18", fechaFin: "2024-10-31", completada: false, confirmacionPREV: null, confirmacionEmpresa: false },
  { nombre: "Estación de Bomberos", trabajo: "Mantenimiento de equipo", horaEntrada: "7:00", horaSalida: "15:30", fechaInicio: "2024-10-19", fechaFin: "2024-11-01", completada: false, confirmacionPREV: null, confirmacionEmpresa: false },
  { nombre: "Centro Comercial Las Flores", trabajo: "Instalación de cámaras de seguridad", horaEntrada: "9:00", horaSalida: "18:00", fechaInicio: "2024-10-20", fechaFin: "2024-11-02", completada: false, confirmacionPREV: null, confirmacionEmpresa: false }
]);

const actividadesFiltradas = computed(() => {
  const hoy = new Date().toISOString().split('T')[0]; 
  return actividades.value.filter(actividad => actividad.fechaInicio >= hoy);
});

function confirmarHoraEntrada(index) {
  actividades.value[index].entradaConfirmada = true;
}
const borrarActividadesFiltradas = () =>{
  const hoy = new Date().toISOString().split('T')[0];
  actividades.value = actividades.value.filter(actividad => actividad.fechaInicio >= hoy);
}


function confirmarPREV(index) {
  actividades.value[index].confirmacionPREV = !actividades.value[index].confirmacionPREV;
}
function denegarPREV(index) {
  actividades.value[index].confirmacionPREV = false;
}


onMounted(()=>{borrarActividadesFiltradas();});


</script>
<style scoped>


@media only screen and (max-width: 1022px) {
.ola{
  overflow-x: scroll;
  width: 900px;
}
}
  
</style>