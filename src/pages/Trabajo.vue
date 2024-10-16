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
            <q-btn  color="green" @click="dialogVisible = true" class="col-12">Registrar trabajo</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
      
      <q-dialog v-model="dialogVisible">
  <q-card>
    <q-card-section>
      <div v-if="step === 0">
     
      <div class="col-6">
        <q-input class="col-6" v-model="newActividad.nombre" label="Nombre Empresa" />
        <q-input class="col-6" v-model="newActividad.trabajo" label="Trabajo a realizar" />
      </div>
      <div class="row">
        <q-input class="col-6" v-model="newActividad.fechaInicio" label="Fecha Inicio" type="date" />
        <q-input class="col-6" v-model="newActividad.fechaFin" label="Fecha Fin" type="date" />
      </div>
      <div class="row">
       
        <q-input filled v-model="timeE" label="Hora de entrada" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="timeE">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
        
      <q-input filled v-model="timeS" label="Hora de salida" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="timeS">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      </div>
      
    </div>
      <div class="col-12" v-if="step === 1">
        <div>
          
          <q-checkbox v-model="newActividad.confirmacionEmpresa" label="¿Esta empresa, confirmó el trabajo?" style="display: block;"/>
        </div>
      <div class="col-6" style="display: inline-block; width: 50%;">
        <q-checkbox v-model="newActividad.solicitarCI" label="Solicitar CI" style="display: block;"/>
        
        <q-checkbox v-model="newActividad.solicitarBPS" label="Solicitar BPS" style="display: block;"/>
         
        <q-checkbox v-model="newActividad.solicitarBSE" label="Solicitar BSE" style="display: block;"/>  
      
        <q-checkbox v-model="newActividad.solicitarInduccionSeguridad" label="Solicitar Inducción de Seguridad" style="display: block;"/>
       
        <q-checkbox v-model="newActividad.permisoTrabajoEnCaliente" label="Permiso de trabajo en caliente" style="display: block;"/> 
       
       
      </div>
      <div class="col-6" style="display: inline-block; width: 50%;">
        <q-checkbox v-model="newActividad.permisoTrabajoEnAltura" label="Permiso de trabajo en altura" style="display: block;" /> 
        
        <q-checkbox v-model="newActividad.permisoTrabajoEnEspacioConfinado" label="Permiso de trabajo en espacio confinado" style="display: block;"/>
        
        <q-checkbox v-model="newActividad.permisoTrabajoOtros" label="Otros permisos de trabajo" style="display: block;"/> 
       
        <q-checkbox v-model="newActividad.solicitarEntregaEPP" label="Entrega EPP" style="display: block;"/>
         </div></div>
    </q-card-section>
    <q-card-actions>
      <q-btn label="Cancelar" @click="dialogVisible = false" />
      <q-btn v-if="step === 0" @click="stepmas" icon="mdi-chevron-right"/>
      <q-btn v-if="step === 1" @click="stepmenos"icon="mdi-chevron-left"></q-btn>
      <q-btn v-if="step === 1" label="Registrar" @click="registrarActividad" color="primary" />
    </q-card-actions>
  </q-card>
</q-dialog>
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
          <q-btn class="q-mx-auto" style="background-color: white;"> <q-icon name="description" size="30px"></q-icon></q-btn>
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
const timeE = ref("")
const timeS = ref ("")
const step = ref(0)

function stepmas() {
  if (step.value < 2) {
    step.value++
  }
}
function stepmenos() {
  if (step.value > 0) {
    step.value--
  }
}


const dialogVisible = ref(false);
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
const newActividad = ref({
  nombre: '',
  trabajo: '',
  fechaInicio: '',
  fechaFin: '',
  horaEntrada: '',
  horaSalida: '',
  solicitarCI: false,
  solicitarBPS: false,
  solicitarBSE: false,
  solicitarInduccionSeguridad: false,
  permisoTrabajoEnCaliente: false,
  permisoTrabajoEnAltura: false,
  permisoTrabajoEnEspacioConfinado: false,
  permisoTrabajoOtros: false,
});

function registrarActividad() {
  // Verificar que los campos obligatorios estén completos
  if (newActividad.value.nombre && newActividad.value.trabajo && newActividad.value.fechaInicio && newActividad.value.fechaFin) {
    // Agregar la nueva actividad al ref actividades
    actividades.value.push({
      nombre: newActividad.value.nombre,
      trabajo: newActividad.value.trabajo,
      fechaInicio: newActividad.value.fechaInicio,
      fechaFin: newActividad.value.fechaFin,
      horaEntrada: timeE,
      horaSalida: timeS,
      completada: false, // Puedes establecer el estado completada según sea necesario
      confirmacionPREV: null, // Otras propiedades inicializadas si es necesario
      confirmacionEmpresa: newActividad.value.confirmacionEmpresa,
      solicitarCI: newActividad.value.solicitarCI,
      solicitarBPS: newActividad.value.solicitarBPS,
      solicitarBSE: newActividad.value.solicitarBSE,
      solicitarInduccionSeguridad: newActividad.value.solicitarInduccionSeguridad,
      permisoTrabajoEnCaliente: newActividad.value.permisoTrabajoEnCaliente,
      permisoTrabajoEnAltura: newActividad.value.permisoTrabajoEnAltura,
      permisoTrabajoEnEspacioConfinado: newActividad.value.permisoTrabajoEnEspacioConfinado,
      permisoTrabajoOtros: newActividad.value.permisoTrabajoOtros,
    });

    // Cerrar el diálogo o formulario
    dialogVisible.value = false;

    // Limpiar los campos del formulario
    newActividad.value = {
      nombre: '',
      trabajo: '',
      fechaInicio: '',
      fechaFin: '',
      solicitarCI: false,
      solicitarBPS: false,
      solicitarBSE: false,
      solicitarInduccionSeguridad: false,
      permisoTrabajoEnCaliente: false,
      permisoTrabajoEnAltura: false,
      permisoTrabajoEnEspacioConfinado: false,
      permisoTrabajoOtros: false,
    };
  } else {
    alert('Por favor, complete todos los campos');
  }
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