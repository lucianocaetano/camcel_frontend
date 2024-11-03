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
            <q-item-label header>Fecha <br>* Entrada <br>* Salida</q-item-label>
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <q-item-label header>Confirmación <br>Prevencionista</q-item-label>
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <q-item-label header>Confirmación <br>Empresa</q-item-label>
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <q-item-label header>Más información</q-item-label>
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
              <q-btn round v-if="actividad.confirmacionPREV === null" color="red" @click="denegarPREV(index)" icon="mdi-close-circle" />
              <q-icon v-if="actividad.confirmacionPREV === true" name="mdi-check-circle" color="green" size="40px" style="padding-right: 20px;"></q-icon>
              <q-icon v-if="actividad.confirmacionPREV === false" name="mdi-close-circle" color="red" size="40px" style="padding-right: 20px;"></q-icon>
            </div>
          </q-item-section>
          <q-item-section class="col-1 text-center">
            <q-icon v-if="actividad.confirmacionEmpresa" name="mdi-check-circle" color="green" size="40px"></q-icon>
            <q-icon v-if="!actividad.confirmacionEmpresa" name="mdi-close-circle" color="red" size="40px"></q-icon>
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <q-btn class="q-mx-auto" style="background-color: white;">
              <q-icon name="description" size="30px"></q-icon>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useEnterpriseStore } from "src/store/enterprise.store"
import { api } from "src/boot/axios";

const enterpriseStore = useEnterpriseStore()
const actividades = ref([]);
const dialogVisible = ref(false);
const timeE = ref("");
const timeS = ref("");
const step = ref(0);
const newActividad = ref({
  nombre: '',
  trabajo: '',
  fechaInicio: '',
  fechaFin: '',
  horaEntrada: '',
  horaSalida: '',
  confirmacionEmpresa: false,
  confirmacionPREV: null,
});

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

// Computed para filtrar las actividades
const actividadesFiltradas = computed(() => {
  const hoy = new Date().toISOString().split('T')[0];
  return actividades.value.filter(actividad => actividad.fechaInicio >= hoy);
});

// Función para obtener actividades desde la API

api.get("admin/jobs").then((response) => {
  console.log(response.data);
  
  actividades.value = response.data.jobs.map(job => ({
    nombre: job.enterprise_id, // Reemplaza según la estructura de tu respuesta
    trabajo: job.title,
    fechas: job.fechas || [], // Ajusta según el nuevo campo de fechas
    horaEntrada: job.in_time,
    horaSalida: job.out_time,
    completada: false, // O ajusta según lo necesario
    confirmacionPREV: null, // O ajusta según lo necesario
    confirmacionEmpresa: job.is_check_enterprise,
  }));
  
  return actividades.value;
});

 
   


// Llama a la función en el mounted

</script>

<style scoped>
@media only screen and (max-width: 1022px) {
  .ola {
    overflow-x: scroll;
    width: 900px;
  }
}
</style>
