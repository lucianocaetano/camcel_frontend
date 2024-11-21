<template>
  <q-page>
    <div class="ola q-mx-auto">
      <q-list bordered style="background-color: #ffffff;">
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
      
 
   <template>
  <q-dialog v-model="dialogVisible" class="col-10">
    <q-card style="height: 80%; width: 80%;">
       <q-markup-table style="height: 90%; overflow-y: scroll">
      <q-card-section>
       
        <!-- Paso 1: Datos de la actividad -->
        <div v-if="step === 0">
          <div class="col-6">
            
              <q-select
                v-model="selectedEnterpriseId" 
                :options="enterpriseOptions"
                option-label="nombre" 
                option-value="enterprise_id"
                label="Seleccionar Empresa"
                emit-value
                map-options
              />
            
            <q-input class="col-6" v-model="newActividad.trabajo" label="Trabajo a realizar" />
          </div>
          <div class="row">
            <div>
              <q-btn label="Agregar Fecha y Horario" @click="addFechaHora" color="primary" />
              <div v-for="(item, index) in fechaHoraList" :key="index" class="fecha-hora-input">
                <div class="row">
                  <q-input class="col-6" v-model="item.fechaInicio" label="Fecha" type="date" />
                  <q-btn
                    class="col-2 q-mt-md"
                    style="margin-left: auto;"
                    @click="removeFechaHora(index)"
                  >
                    Eliminar
                  </q-btn>
                </div>
                <div class="row">
                  <q-input filled v-model="item.timeE" label="Hora de entrada" mask="time" />
                  <q-input filled v-model="item.timeS" label="Hora de salida" mask="time" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Paso 2: Selección de operadores -->
        <div v-if="step === 1">
          <q-btn label="Agregar Operador" @click="addOperador" color="primary" />
          <div v-for="(operador, index) in operadoresList" :key="index" class="operador-input">
            <div class="row q-col-gutter-md">
              <q-input class="col-6" v-model="operador.nombre" label="Nombre del Operador" />
              <q-input class="col-6" v-model="operador.rol" label="Rol del Operador" />
              <q-btn
                class="col-2 q-mt-md"
                style="margin-left: auto;"
                @click="removeOperador(index)"
                color="negative"
              >
                Eliminar
              </q-btn>
            </div>
          </div>
        </div>

        <!-- Paso 3: Documentos -->
        <div v-if="step === 2">
          <q-btn label="Agregar Documento" @click="addDocumento" color="primary" />
          <div v-for="(doc, index) in documentosList" :key="index" class="documento-input">
            <div class="row q-col-gutter-md">
              <q-input class="col-6" v-model="doc.titulo" label="Tipo del Documento" />
              <q-checkbox
                class="col-6"
                v-model="doc.cargarDetalles"
                label="¿Cargar detalles del documento?"
              />
              <div v-if="doc.cargarDetalles">
                <q-input class="col-6" v-model="doc.url"  type="file" />
                <q-input class="col-6" v-model="doc.dataTang" label="Fecha de Expiración" type="date" />
                <q-checkbox class="col-6" v-model="doc.valido" label="¿Documento válido?" />
              </div>
              <q-btn
                class="col-2 q-mt-md"
                style="margin-left: auto; max-height: 30px;"
                @click="removeDocumento(index)"
                color="negative"
              >
                Eliminar
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-markup-table>
      <q-card-actions>
        <q-btn label="Cancelar" @click="dialogVisible = false" />
        <q-btn v-if="step > 0" @click="stepmenos" icon="mdi-chevron-left" />
        <q-btn v-if="step < 2" @click="stepmas" icon="mdi-chevron-right" />
        <q-btn v-if="step === 2" label="Registrar" @click="registrarActividad" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
    

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
import { date } from 'quasar';
import { useQuasar } from 'quasar';

//constantes

const userStore = useUserStore()
const token = userStore.token;
const item = ref([]);
const dialogVisible = ref(false);
const step = ref(0);
const dropdowns = ref({}); // Objeto para manejar el estado de cada desplegable
const props = defineProps(['items']);



// Estado reactivo
const selectedEnterpriseId = ref(null);
const enterpriseOptions = ref([]);

// Función para obtener las empresas
const fetchEnterprises = async () => {
  try {
    const response = await api.get("enterprises");
   
   
    // Mapea los datos para obtener solo los campos necesarios
    enterpriseOptions.value = response.data.map(empresa => ({
      enterprise_id: empresa.id, // Usamos RUT como el identificador
      nombre: empresa.nombre, // Usamos 'nombre' para el nombre de la empresa
      
    }));
  } catch (error) {
    console.error('Error al obtener los datos de la empresa:', error);
  }
};


// Ejecutar la función cuando el componente se monte
onMounted(fetchEnterprises);
// Datos de la actividad
const newActividad = ref({
  nombre: '',
  trabajo: '',
});

// Fechas y horarios
const fechaHoraList = ref([]);

// Lista de documentos
const documentosList = ref([]);

// Lista de operadores
const operadoresList = ref([]);

// Quasar para notificaciones
const $q = useQuasar();

// Función para agregar una fecha y horario
const addFechaHora = () => {
  fechaHoraList.value.push({
    fechaInicio: '',
    timeE: '',
    timeS: '',
  });
};

// Función para eliminar una fecha y horario
const removeFechaHora = (index) => {
  fechaHoraList.value.splice(index, 1);
};

// Función para agregar un operador
const addOperador = () => {
  operadoresList.value.push({
    nombre: '',
    rol: '',
  });
};

// Función para eliminar un operador
const removeOperador = (index) => {
  operadoresList.value.splice(index, 1);
};

// Función para agregar un documento
const addDocumento = () => {
  documentosList.value.push({
    titulo: '',
    cargarDetalles: false, // Inicialmente, no se solicitan detalles
    url: '',
    dataTang: '',
    valido: false,
  });
};

// Función para eliminar un documento
const removeDocumento = (index) => {
  documentosList.value.splice(index, 1);
};

// Validaciones para datos requeridos
const validarDatos = () => {
  // Validar datos de actividad
  if (!newActividad.value.trabajo) {
    $q.notify({ type: 'negative', message: 'Por favor completa todos los campos de la actividad.' });
    return false;
  }

  // Validar fechas y horarios
  for (const fecha of fechaHoraList.value) {
    if (!fecha.fechaInicio || !fecha.timeE || !fecha.timeS) {
      $q.notify({ type: 'negative', message: 'Por favor completa todos los campos de fecha y horario.' });
      return false;
    }
  }

  // Validar operadores
  for (const operador of operadoresList.value) {
    if (!operador.nombre || !operador.rol) {
      $q.notify({ type: 'negative', message: 'Por favor completa todos los datos de los operadores.' });
      return false;
    }
  }

  // Validar documentos
  for (const doc of documentosList.value) {
    if (!doc.titulo) {
      $q.notify({ type: 'negative', message: 'Por favor completa el título de todos los documentos.' });
      return false;
    }
    if (doc.cargarDetalles && (!doc.url || !doc.dataTang)) {
      $q.notify({ type: 'negative', message: 'Por favor completa los detalles de los documentos marcados.' });
      return false;
    }
  }

  return true;
};

// Registrar actividad
// Función para registrar la actividad
const registrarActividad = async () => {
  if (!validarDatos()) {
    return;
  }
  fechaHoraList.value = fechaHoraList.value.map(item => {
  if (item.fechaInicio && item.timeE && item.timeS) {
    const fechaFormateada = new Date(item.fechaInicio);
    // Verificar si la fecha es válida
    if (isNaN(fechaFormateada.getTime())) {
      console.error("Fecha inválida:", item.fechaInicio);
      return null;  // Si la fecha es inválida, eliminar el item
    }
    return {
      fechaInicio: fechaFormateada.toISOString().split("T")[0],  // Formatear a "yyyy-mm-dd"
      timeE: item.timeE,
      timeS: item.timeS
    };
  } else {
    console.error("Faltan datos en:", item);
    return null;  // Eliminar item con datos faltantes
  }
}).filter(item => item !== null);  // Filtrar los valores nulos
  const payload = {
    trabajo: newActividad.value.trabajo,
    fechas: fechaHoraList.value,
    operadores: operadoresList.value,
    documentos: documentosList.value,
    enterprise_id: selectedEnterpriseId.value,
    confirmacionPREV: null // Agregar el enterprise_id aquí
  };
  try {
    await $q.loading.show();
    await api.post('admin/jobs', payload); // Enviar el payload con el enterprise_id
    $q.notify({ type: 'positive', message: 'Actividad registrada exitosamente.' });
    dialogVisible.value = false;
    // Limpiar datos después del registro
    newActividad.value = { nombre: '', trabajo: '' };
    fechaHoraList.value = [];
    operadoresList.value = [];
    documentosList.value = [];
  } catch (error) { 
  console.error('Error:', error.response ? error.response.data : error.message);
  $q.notify({ type: 'negative', message: 'Hubo un error al registrar la actividad.' });
  } finally {
    $q.loading.hide();
  }
};

// Funciones para avanzar y retroceder en los pasos
const stepmas = () => {
  step.value++;
};

const stepmenos = () => {
  step.value--;
};


const toggleDropdown = (index) => {
  dropdowns.value[index] = !isDropdownOpen(index); // Cambia el estado del desplegable
};

const isDropdownOpen = (index) => {
  return !!dropdowns.value[index]; // Verifica si el desplegable está abierto
};
// Función para eliminar una fecha y horario

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

// Función para filtrar los trabajos con fechas a partir de hoy
function filterJobsFromToday(jobs) {
  const today = date.formatDate(new Date(), 'YYYY-MM-DD'); // Fecha actual en formato 'YYYY-MM-DD'
  return jobs.filter((job) => {
    // Obtener la lista de fechas del trabajo
    const fechas = job.fechas || [];
    // Filtrar solo los trabajos cuyas fechas incluyen hoy o una fecha futura
    return fechas.some(fecha => fecha >= today);
  });
}

async function obteneritem() {
  try {
    const response = await api.get("admin/jobs");
    const trabajos = response.data.jobs;
    const jobDates = response.data.job_dates;

    const itemTemp = [];

    // Iterar sobre los trabajos
    trabajos.forEach(job => {
      const fechas = jobDates.filter(date => date.job_id === job.id) || [];

      if (!Array.isArray(fechas)) {
        console.error("La variable 'fechas' no es un array:", fechas);
        return;
      }

      // Formatear y ordenar las fechas
      const fechasFormateadas = fechas.map(date => new Date(date.fecha.replace(/"/g, '')))
                                       .sort((a, b) => a - b)
                                       .map(date => date.toISOString().split('T')[0]);

      // Agregar a la lista de item solo si hay fechas futuras o de hoy
      itemTemp.push({
        id: job.id,
        nombre: job.enterprise,
        trabajo: job.trabajo || "Trabajo desconocido",
        fechas: fechasFormateadas,
        confirmacionPREV: job.confirmacion_prevencionista,
        confirmacionEmpresa: job.confirmacion_empresa,
      });
    });

    // Aplicar el filtro de trabajos desde hoy en adelante
    const itemFiltrado = filterJobsFromToday(itemTemp);

    // Ordenar los trabajos filtrados
    item.value = itemFiltrado.sort((a, b) => a.id - b.id);

  } catch (error) {
    console.error("Error al obtener item:", error);
  }
}



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
.fecha-hora-input {
    margin-bottom: 20px;
  }
</style>