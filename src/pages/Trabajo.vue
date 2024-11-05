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
            <q-item-label header>Fechas de Trabajo</q-item-label>
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

    <q-item v-for="(item, index) in item" :key="index" :class="{'bg-grey-4': index % 2 === 0}">
          <q-item-section class="col-2">
            {{ item.nombre }}
          </q-item-section>
          <q-item-section class="col-2">
            {{ item.trabajo }}
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <div>
              <span>{{ item.fechas[0] }}</span> <!-- Muestra la primera fecha -->
              <span v-if="item.fechas.length > 1"> - {{ item.fechas[item.fechas.length - 1] }}</span> <!-- Muestra la última fecha si hay más de una -->
              <q-btn @click="toggleDropdown(index)" :label="isDropdownOpen(index) ? 'Ocultar Fechas' : 'Ver Todas las Fechas'" />
            </div>
            <div v-if="isDropdownOpen(index)">
              <div v-for="(fecha, fechaIndex) in item.fechas" :key="fechaIndex">{{ fecha }}</div>
            </div>
          </q-item-section>
          <q-item-section class="col-3 text-center">
            <div>
              {{ index }}
              
              <q-btn round v-if="item.confirmacionPREV === null" color="green" @click="confirmarPREV(index)" icon="mdi-check-circle" />
              <q-btn round v-if="item.confirmacionPREV === null" color="red" @click="denegarPREV(index)" icon="mdi-close-circle" />
              <q-icon v-if="item.confirmacionPREV === 1" name="mdi-check-circle" color="green" size="40px" style="padding-right: 20px;"></q-icon>
              <q-icon v-if="item.confirmacionPREV === 0" name="mdi-close-circle" color="red" size="40px" style="padding-right: 20px;"></q-icon>

            </div>
          </q-item-section>
          <q-item-section class="col-1 text-center">
            <q-icon v-if="item.confirmacionEmpresa" name="mdi-check-circle" color="green" size="40px"></q-icon>
            <q-icon v-if="!item.confirmacionEmpresa" name="mdi-close-circle" color="red" size="40px"></q-icon>
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
import { useUserStore } from 'src/store/user.store';

const userStore = useUserStore()
const token = userStore.token;
const enterpriseStore = useEnterpriseStore()
const item = ref([]);
const horas = ref([]);
const dialogVisible = ref(false);
const timeE = ref("");
const timeS = ref("");
const step = ref(0);
const dropdowns = ref({}); // Objeto para manejar el estado de cada desplegable
function obtenerHoraActual() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}

const toggleDropdown = (index) => {
  dropdowns.value[index] = !isDropdownOpen(index); // Cambia el estado del desplegable
};

const isDropdownOpen = (index) => {
  return !!dropdowns.value[index]; // Verifica si el desplegable está abierto
};

// Asegúrate de que 'items' sea una propiedad pasada a este componente
const props = defineProps(['items']);
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

// Computed para filtrar las item
//  const itemFiltradas = computed(() => {
//    const hoy = new Date().toISOString().split('T')[0];
//    return item.value.filter(actividad => actividad.fechaInicio >= hoy);
//  });

// Función para obtener item desde la API

// Función para obtener item desde la API
async function obteneritem() {
  try {
    const response = await api.get("admin/jobs");
    const trabajos = response.data.jobs;
    const jobDates = response.data.job_dates;
    console.log(response.data)
    // Estructura para almacenar item
    const itemTemp = [];

    // Iterar sobre los trabajos y combinar con las fechas
    trabajos.forEach((job) => {
      const fechas = jobDates[job.id - 1] || []; // Asegúrate de acceder correctamente al array de fechas

      // Formatear las fechas
      const fechasFormateadas = fechas.map(date => new Date(date.fecha.replace(/"/g, '')))
                                       .sort((a, b) => a - b) // Ordenar las fechas
                                       .map(date => date.toISOString().split('T')[0]); // Convertir a formato YYYY-MM-DD

      // Agregar a la lista de item
      itemTemp.push({
        id: job.id,
        nombre: job.enterprise_id ? `Empresa ${job.enterprise_id}` : "Sin nombre",
        trabajo: job.trabajo || "Trabajo desconocido",
        fechas: fechasFormateadas,
        confirmacionPREV: job.confirmacion_prevencionista,
        confirmacionEmpresa: job.confirmacion_empresa,
      });
    });
    

    // Ordenar las item por id de trabajo
    item.value = itemTemp.sort((a, b) => a.id - b.id);
    
  } catch (error) {
    console.error("Error al obtener item:", error);
  }
}

// Llama a la función al montar el componente
onMounted(obteneritem);
const confirmarPREV = async (index) => {
  try {
    // Hacer una solicitud PATCH para actualizar el estado en la base de datos
    console.log(item.value)
    const jobId = item.value[index].id; // Asegúrate de que `id` existe
    console.log('Job ID antes de la solicitud:', jobId);
    console.log('Índice recibido:', index); // Verifica el índice
  if (index < 0 || index >= item.value.length) {
    console.error('Índice fuera de rango');
    
     }
     await api.patch(`admin/jobs/${jobId}/updateConfirmation`, { confirmacion_prevencionista: 1 }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});






    // Actualizar el estado local
    item.value[index].confirmacionPREV = true;
  } catch (error) {
    console.error("Error al confirmar la prevención:", error);
  }
};

const denegarPREV = async (index) => {
  try {
    // Hacer una solicitud PATCH para actualizar el estado en la base de datos
    console.log(item.value)
    const jobId = item.value[index].id; // Asegúrate de que `id` existe
    console.log('Job ID antes de la solicitud:', jobId);
    console.log('Índice recibido:', index); // Verifica el índice
  if (index < 0 || index >= item.value.length) {
    console.error('Índice fuera de rango');
    
     }
     await api.patch(`admin/jobs/${jobId}/updateConfirmation`, { confirmacion_prevencionista:0}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});





  this.obteneritem();
    // Actualizar el estado local
    item.value[index].denegarPREV = false;
  } catch (error) {
    console.error("Error al confirmar la prevención:", error);
  }
};
</script>


<style scoped>
@media only screen and (max-width: 1022px) {
  .ola {
    overflow-x: scroll;
    width: 900px;
  }
}
</style>
