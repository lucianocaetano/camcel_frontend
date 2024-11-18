<template>
  <q-page>
    <div class="ola q-mx-auto">
       <!-- Añadir el menú desplegable para filtrar -->
       <q-btn-dropdown  color="#ffffff" :label="selectedOption" text-color="#000000" style=" margin-bottom: 2%;">
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
        
      </q-list>
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
              
              
              
              <q-icon  v-if="item.confirmacionPREV === null" name="mdi-close-circle" color="red" size="40px" style="padding-right: 20px;"/>
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
const selectedOption = ref('Todos'); // Opción por defecto
const itemTemp = ref([]); // Almacena todos los trabajos
const onItemClick = (option) => {
    selectedOption.value = option;
    filterItems(); // Llama a la función para filtrar los trabajos
};
// Función para filtrar los trabajos
const filterItems = () => {
  const hoy = new Date().toISOString().split('T')[0]; // Fecha actual
  item.value = itemTemp.value.filter(job => {
    const fechas = job.fechas;
    return fechas.length > 0 && fechas[fechas.length - 1] < hoy; // Solo trabajos pasados
  });

  if (selectedOption.value === 'Aceptados') {
    item.value = item.value.filter(job => job.confirmacionPREV === 1 && job.confirmacionEmpresa === 1);
  } else if (selectedOption.value === 'Rechazados') {
    item.value = item.value.filter(job => job.confirmacionPREV === 0 || job.confirmacionEmpresa === 0);
  }
};
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
     await api.patch(`admin/jobs/${jobId}/updateConfirmation`, { confirmacion_prevencionista: 0 }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
  // Actualizar el estado local
    item.value[index].confirmacionPREV = true;
  } catch (error) {
    console.error("Error al denengar la prevención:", error);
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
        const trabajos = response.data.jobs;
        const jobDates = response.data.job_dates;

        // Asegúrate de que itemTemp.value sea un array
        itemTemp.value = []; // Inicializa itemTemp como un array vacío

        trabajos.forEach(job => {
            const fechas = jobDates.filter(date => date.job_id === job.id) || [];
            if (!Array.isArray(fechas)) {
                console.error("La variable 'fechas' no es un array:", fechas);
                return;
            }

            const fechasFormateadas = fechas.map(date => new Date(date.fecha.replace(/"/g, '')))
                                             .sort((a, b) => a - b)
                                             .map(date => date.toISOString().split('T')[0]);

            // Usa itemTemp.value para agregar elementos
            
            itemTemp.value.push({
                id: job.id,
                nombre: job.enterprise,
                trabajo: job.trabajo || "Trabajo desconocido",
                fechas: fechasFormateadas,
                confirmacionPREV: job.confirmacion_prevencionista,
                confirmacionEmpresa: job.confirmacion_empresa,
            });
        });

        // Ordenar y almacenar los trabajos
        itemTemp.value.sort((a, b) => a.id - b.id);
        filterItems(); // Filtra los trabajos según la opción seleccionada

    } catch (error) {
        console.error("Error al obtener item:", error);
    }
}

// Llama a la función al montar el componente
onMounted(
  obteneritem
)

</script>


<style scoped>
@media only screen and (max-width: 1022px) {
  .ola {
    overflow-x: scroll;
    width: 900px;
  }
}
</style>