<template>


  <q-page>
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
          <q-item-label header>Fecha</q-item-label>
        </q-item-section>
        <q-item-section class="col-1 text-center"> 
          <q-item-label header>Hora de Entrada</q-item-label>
        </q-item-section>
        <q-item-section class="col-1 text-center"> 
          <q-item-label header>Hora de Salida</q-item-label>
        </q-item-section>
        <q-item-section class="col-4 text-center"> 
          <q-item-label header>Confirmación</q-item-label>
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
          {{ actividad.fecha }}
        </q-item-section>
        <q-item-section class="col-1 text-center">
         
            {{ actividad.horaEntrada }}
          <!--  <q-btn v-if="!actividad.entradaConfirmada"  color="green" @click="marcarHoraActualEntrada(index)" class="q-mx-md"> Entro</q-btn> -->
    
        </q-item-section>
        <q-item-section class="col-1 text-center">
         
            {{ actividad.horaSalida }}
           <!-- <q-btn v-if="!actividad.salidaConfirmada" color="red" @click="marcarHoraActualSalida(index)" class="q-mx-md"> Salio</q-btn> -->
   
        </q-item-section>
        <q-item-section class="col-2 text-center">
          <div>
            <q-btn v-if="!actividad.confirmacionPREV" color="green" @click="confirmarPREV(index)" class="q-mx-auto">confirmar</q-btn>
            <q-icon v-if="actividad.confirmacionPREV" name="mdi-check-circle" color="green" size="40px" style="padding-right: 20px;"> </q-icon>
            
            
          </div>
          </q-item-section>
          <q-item-section class="col-1 text-center">
          
            
            <q-icon v-if="actividad.confirmacionEmpresa" name="mdi-close-circle" color="green" size="40px" > </q-icon>
            <q-icon v-if="!actividad.confirmacionEmpresa" name="mdi-close-circle" color="red" size="40px"> </q-icon>
          
        </q-item-section>
        <q-item-section class="col-1 text-center">
          <q-btn class="q-mx-auto" style="background-color: white;"> <q-icon name="mdi-text-box-search-outline" size="30px"></q-icon></q-btn>
        </q-item-section>
      </q-item> 
    </q-list> 
   </div>
  </q-page>
 
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
const actividades = ref([
  { nombre: "Los Pinos", trabajo: "Revisar sistema eléctrico", horaEntrada: "8:00", horaSalida: "17:00", fecha: "2024-09-2", completada: false, confirmacionPREV: false, confirmacionEmpresa: true },
  { nombre: "El Roble", trabajo: "Reparar sistema de agua", horaEntrada: "9:00", horaSalida: "18:00", fecha: "2024-10-3", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Industria Metalúrgica", trabajo: "Mantenimiento de máquinas", horaEntrada: "7:30", horaSalida: "16:00", fecha: "2024-10-3", completada: false, confirmacionPREV: true, confirmacionEmpresa: true },
  { nombre: "Colegio San Martín", trabajo: "Instalación de paneles solares", horaEntrada: "7:00", horaSalida: "15:00", fecha: "2024-10-03", completada: false, confirmacionPREV: true, confirmacionEmpresa: false },
  { nombre: "Hospital Central", trabajo: "Reparación de generador", horaEntrada: "6:30", horaSalida: "14:30", fecha: "2024-08-27", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Taller Mecánico López", trabajo: "Reemplazo de luces fluorescentes", horaEntrada: "10:00", horaSalida: "19:00", fecha: "2024-08-28", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Fábrica de Plásticos", trabajo: "Inspección de seguridad", horaEntrada: "8:30", horaSalida: "17:30", fecha: "2024-10-3", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Universidad Nacional", trabajo: "Revisión de red eléctrica", horaEntrada: "7:45", horaSalida: "16:15", fecha: "2024-10-3", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Estación de Bomberos", trabajo: "Mantenimiento de equipo", horaEntrada: "7:00", horaSalida: "15:30", fecha: "2024-08-31", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Centro Comercial Las Flores", trabajo: "Instalación de cámaras de seguridad", horaEntrada: "9:00", horaSalida: "18:00", fecha: "2024-09-01", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Los Pinos", trabajo: "Revisar sistema eléctrico", horaEntrada: "8:00", horaSalida: "17:00", fecha: "2024-08-2", completada: false, confirmacionPREV: false, confirmacionEmpresa: true },
  { nombre: "El Roble", trabajo: "Reparar sistema de agua", horaEntrada: "9:00", horaSalida: "18:00", fecha: "2024-08-2", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Industria Metalúrgica", trabajo: "Mantenimiento de máquinas", horaEntrada: "7:30", horaSalida: "16:00", fecha: "2024-08-25", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Colegio San Martín", trabajo: "Instalación de paneles solares", horaEntrada: "7:00", horaSalida: "15:00", fecha: "2024-08-26", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Hospital Central", trabajo: "Reparación de generador", horaEntrada: "6:30", horaSalida: "14:30", fecha: "2024-08-27", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Taller Mecánico López", trabajo: "Reemplazo de luces fluorescentes", horaEntrada: "10:00", horaSalida: "19:00", fecha: "2024-08-28", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Fábrica de Plásticos", trabajo: "Inspección de seguridad", horaEntrada: "8:30", horaSalida: "17:30", fecha: "2024-08-29", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Universidad Nacional", trabajo: "Revisión de red eléctrica", horaEntrada: "7:45", horaSalida: "16:15", fecha: "2024-08-30", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Estación de Bomberos", trabajo: "Mantenimiento de equipo", horaEntrada: "7:00", horaSalida: "15:30", fecha: "2024-08-31", completada: false, confirmacionPREV: false, confirmacionEmpresa: false },
  { nombre: "Centro Comercial Las Flores", trabajo: "Instalación de cámaras de seguridad", horaEntrada: "9:00", horaSalida: "18:00", fecha: "2024-09-04", completada: false, confirmacionPREV: false, confirmacionEmpresa: false }
]);

const actividadesFiltradas = computed(() => {
  const hoy = new Date().toISOString().split('T')[0]; 
  return actividades.value.filter(actividad => actividad.fecha >= hoy);
});

function confirmarHoraEntrada(index) {
  actividades.value[index].entradaConfirmada = true;
}
const borrarActividadesFiltradas = () =>{
  const hoy = new Date().toISOString().split('T')[0];
  actividades.value = actividades.value.filter(actividad => actividad.fecha >= hoy);
}

function marcarHoraActualEntrada(index) {
  const ahora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  actividades.value[index].horaEntrada = ahora;
  actividades.value[index].entradaConfirmada = true;
}

function confirmarHoraSalida(index) {
  actividades.value[index].salidaConfirmada = true;
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