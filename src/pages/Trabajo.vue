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
            <!-- Botón que muestra la primera y última fecha -->
            <q-btn 
              @click="toggleDropdown(index)" 
              :label="`${item.fechas[0]} - ${item.fechas[item.fechas.length - 1]}`" 
            />
            
            <!-- Lista desplegable de todas las fechas -->
           
          </div>
            <div v-if="isDropdownOpen(index)">
              <div v-for="(fecha, fechaIndex) in item.fechas" :key="fechaIndex">{{ fecha }}</div>
            </div>
          </q-item-section>
          <q-item-section class="col-3 text-center">
            <div>
              
              
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
            <!--boton Documentos-->
               
                      <!-- Documentos -->
                      
                        <div>
                          <q-btn
                            class="q-mx-auto"
                            style="background-color: white;"
                            @click="()=>openDialog(item)"
                          >
                            <q-icon name="description" size="30px"></q-icon>
                          </q-btn>

                         
                        </div>
                      
          </q-item-section>
        </q-item>
      </q-list>
    </div>
     <!-- Q-Dialog para mostrar los detalles -->
     <q-dialog v-model="showDialog" persistent>
                            <q-card style="min-width: 90%; min-height: 90%; display: flex;">
                              <div class="col-6" style="width: 60%;">
                              <q-card-section class="col-6">
                                <div class="text-h6">Empresa: {{ trabajo.nombre }}</div> <!-- Nombre de la empresa -->
                                <div class="text-subtitle1">Trabajo a realizar: {{ trabajo.trabajo }}</div> <!-- Trabajo a realizar -->
                               
                              </q-card-section>

                              <q-separator />

                              <q-card-section>
                                <div class="text-body1">
                                  <strong>Fechas:</strong>
                               </div>
                               <div v-for="(fecha, fechaIndex) in trabajo.fechas" :key="fechaIndex">{{ fecha }}</div>
                               <!--  <div v-for="(fecha, index) in item.Fechas" :key="index">
                                  {{ fecha.formattedDate }} - Entrada: {{ fecha.horaEntrada }} | Salida: {{ fecha.horaSalida }}
                                </div>-->
                              </q-card-section>

                              <q-separator />

                              <q-card-section>
                                <div class="text-body1">
                                  <strong>Confirmación:</strong>
                                </div>
                                <p>Prevencionista: {{ formatConfirmation(trabajo.confirmacionPREV) }}</p>
                                <p>Empresa: {{ formatConfirmation(trabajo.confirmacionEmpresa) }}</p>
                               
                              </q-card-section>

                              <q-separator />
                            </div>
                            <div class="col-6">
                              <q-card-section class="col-12" style="width: 40%; height: 90%;">
                                <div class="text-body1">
                                  <strong>Documentos:</strong>
                                </div>
                                <div v-for="(documento, index) in trabajo.Documentos" :key="index">
                                  <q-btn
                                    flat
                                    color="primary"
                                    @click="expandDocument(documento)"
                                  >
                                    {{ documento.titulo }}
                                  </q-btn>
                                </div>
                              </q-card-section>

                              <q-separator />
                            </div>
                              <q-card-actions style="align-items: right; align-content: flex-end; ">
                                <q-btn flat label="Cerrar" color="primary" @click="closeDialog" />
                              </q-card-actions>
                            </q-card>
                          </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted,  onUnmounted, getCurrentInstance } from 'vue';

import { useEnterpriseStore } from "src/store/enterprise.store"
import { api } from "src/boot/axios";
import { useUserStore } from 'src/store/user.store';



//constantes


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
const props = defineProps(['items']);
const pollingInterval = ref(null);


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
const toggleDropdown = (index) => {
  dropdowns.value[index] = !isDropdownOpen(index); // Cambia el estado del desplegable
};

const isDropdownOpen = (index) => {
  return !!dropdowns.value[index]; // Verifica si el desplegable está abierto
};

const trabajo=ref()
const showDialog = ref(false);
function openDialog(item) {
  showDialog.value = true;
  trabajo.value = item
}
//constantes para el backend


const confirmarPREV = async (index) => {
  try {
    const jobId = item.value[index].id;
    console.log("Enviando solicitud para confirmar prevención, Job ID:", jobId);

    const response = await api.patch(`admin/jobs/${jobId}/updateConfirmation`, { 
      confirmacion_prevencionista: 1 
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log("Respuesta del backend:", response.data);
    
  } catch (error) {
    console.error("Error al confirmar la prevención:", error.response?.data || error.message);
  }
};

const denegarPREV = async (index) => {
  try {
    const jobId = item.value[index].id;
    console.log("Enviando solicitud para denegar prevención, Job ID:", jobId);

    const response = await api.patch(`admin/jobs/${jobId}/updateConfirmation`, { 
      confirmacion_prevencionista: 0 
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log("Respuesta del backend:", response.data);
    
  } catch (error) {
    console.error("Error al denegar la prevención:", error.response?.data || error.message);
  }
};





//funciones


function formatConfirmation(value) {
  if (value === null) {
    return 'No disponible';
  }
  return value === 1 ? 'Sí' : 'No';
}

function closeDialog() {
  showDialog.value = false;
}
function expandDocument(documento) {
  // Abre el documento en una nueva pestaña o como modal, según prefieras
  window.open(documento.url, '_blank');
}
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


async function obteneritem() {
    try {
        const response = await api.get("admin/jobs");
        // Procesa la respuesta y actualiza el estado
        const trabajos = response.data.jobs; // Asegúrate de que estás accediendo a la propiedad correcta
        const jobDates = response.data.job_dates; // Esto contiene todas las fechas

        // Estructura para almacenar item
        const itemTemp = [];

        // Iterar sobre los trabajos
        trabajos.forEach(job => {
            // Filtrar las fechas que corresponden a este trabajo
            const fechas = jobDates.filter(date => date.job_id === job.id) || []; // Asegúrate de que jobDates es un array

            // Asegúrate de que 'fechas' es un array
            if (!Array.isArray(fechas)) {
                console.error("La variable 'fechas' no es un array:", fechas);
                return; // Manejar el error adecuadamente
            }
            console.log(job)

            // Formatear las fechas
            const fechasFormateadas = fechas.map(date => new Date(date.fecha.replace(/"/g, '')))
                                             .sort((a, b) => a - b) // Ordenar las fechas
                                             .map(date => date.toISOString().split('T')[0]); // Convertir a formato YYYY-MM-DD

            // Agregar a la lista de item
            itemTemp.push({
                id: job.id,
                nombre: job.enterprise,
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

//const listenForJobUpdates = () => {
  //  const echo = getCurrentInstance().appContext.config.globalProperties.$echo;

    //if (!echo) {
      //  console.error("Echo no está definido");
        //return; // Salir si Echo no está disponible
    //}

//    const channel = echo.channel('jobs');

    // Escuchar el evento JobUpdated
//    channel.listen('JobUpdated', (e) => {
  //      console.log("Evento JobUpdated recibido:", e); // Agrega este log
    //    const updatedJob = e.job;
//        const index = jobs.value.findIndex(job => job.id === updatedJob.id);
//        
  //      if (index !== -1) {
            // Actualiza el trabajo existente
    //        jobs.value[index] = updatedJob; // Vue 3 detecta cambios automáticamente en refs
    //    } else {
            // Si es un nuevo trabajo, añade
   //         jobs.value.push(updatedJob);
   //     }
  //  });

   
//};




onMounted(() => {
      const echo = getCurrentInstance().appContext.config.globalProperties.$echo;
      
      echo.channel('jobs-channel')
        .listen('.job-updated', (data) => {
          console.log('Evento recibido:', data);

          // Asegúrate de que la propiedad "job" esté presente
          if (data.job) {
            const jobIndex = jobs.findIndex(job => job.id === data.job.id);
            if (jobIndex !== -1) {
              jobs[jobIndex] = data.job;  // Actualiza el trabajo con los nuevos datos
            } else {
              jobs.push(data.job);  // Si el trabajo no existe, lo agrega
            }
          }
        });
    });



// Llama a la función al montar el componente

onMounted(() => {
    
    obteneritem();
});

</script>


<style scoped>
@media only screen and (max-width: 1022px) {
  .ola {
    overflow-x: scroll;
    width: 900px;
  }
}
</style>