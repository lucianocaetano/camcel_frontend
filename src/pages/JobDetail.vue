<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <!-- Contenedor principal -->
        <q-card
          v-if="trabajo"
          style="
            margin: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
          "
          flat
          bordered
        >
          <!-- Botón para regresar -->
          <q-card-section>
            <q-btn
              flat
              color="primary"
              icon="arrow_back"
              label="Volver"
              @click="volver"
            />
          </q-card-section>

          <q-separator />

          <!-- Contenido principal -->
          <div
            style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 16px"
          >
            <!-- Sección izquierda (Ahora ocupa toda la página dividida en dos) -->
            <div class="col-12 col-md-8" style="flex: 1; width: 50%">
              <!-- Sección 1: Empresa y Trabajo -->
              <q-card-section>
                <div class="text-h6">
                  <q-icon name="business" color="primary" /> Empresa:
                  {{ trabajo?.enterprise_id }}
                </div>
                <div class="text-subtitle1">
                  <q-icon name="work" color="primary" /> Trabajo a realizar:
                  {{ trabajo?.trabajo }}
                </div>
              </q-card-section>

              <q-separator />

              <!-- Sección 3: Confirmación -->
              <q-card-section>
                <div class="text-body1">
                  <q-icon name="check_circle" color="primary" />
                  <strong>Confirmación:</strong>
                </div>
                <q-list>
                  <q-item dense>
                    <q-item-section>
                      Prevencionista:
                      <q-chip
                        :color="
                          trabajo?.confirmacion_prevencionista
                            ? 'positive'
                            : 'negative'
                        "
                        outline
                        dense
                        style="max-width: 10%"
                      >
                        {{ trabajo?.confirmacion_prevencionista ? "Sí" : "No" }}
                      </q-chip>
                    </q-item-section>
                  </q-item>
                  <q-item dense>
                    <q-item-section>
                      Empresa:
                      <q-chip
                        :color="
                          trabajo?.confirmacion_empresa
                            ? 'positive'
                            : 'negative'
                        "
                        outline
                        dense
                        style="max-width: 10%"
                      >
                        {{ trabajo?.confirmacion_empresa ? "Sí" : "No" }}
                      </q-chip>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-separator />
            </div>

            <!-- Sección derecha (Fechas) -->
            <div style="flex: 1; width: 50%" class="col-12 col-md-4">
              <q-card-section>
                <div class="text-body1">
                  <q-icon name="event" color="primary" />
                  <strong>Fechas:</strong>
                </div>
                <q-list>
                  <q-item
                    v-for="(fecha, index) in trabajo?.fechas"
                    :key="index"
                    class="q-pa-xs"
                    dense
                  >
                    <q-item-section>
                      <div>{{ fecha.fecha }}</div>
                      <small
                        >Entrada: {{ fecha.horaEntrada }} | Salida:
                        {{ fecha.horaSalida }}</small
                      >
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </div>

            <!-- Sección derecha (Documentos al final) -->
            <div class="col-12 col-md-12" style="width: 100%">
              <q-card-section>
                <!-- Lista de documentos solo se muestra si hay documentos -->

                <table-documents :documents="documents" />
                <!-- Botones adicionales para documentos -->
                <q-list v-if="!trabajo?.documentos?.length">
                  <q-item
                    v-for="(documento, index) in trabajo?.documentos"
                    :key="index"
                    clickable
                    @click="expandDocument(documento)"
                    class="q-pa-xs"
                    dense
                  >
                    <q-item-section avatar>
                      <q-icon name="insert_drive_file" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      {{ documento.titulo }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "src/boot/axios";
import TableDocuments from "../components/documents/TableDocuments.vue";
import { useJobDocuments } from "src/hooks/api/documents.hooks";

const trabajo = ref(null);
const router = useRouter();
const route = useRoute();

const params = route.params.id;
console.log(params);

// Cargar los detalles del trabajo al montar el componente

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await api.get(`admin/jobs/${id}`);
    trabajo.value = response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del trabajo:", error);
  }
});

const {
  documents,
  isLoading: isLoadingDocuments,
  refetch: refetchDocuments,
} = useJobDocuments(params);

// Función para regresar a la página anterior
function volver() {
  router.back();
}
</script>
