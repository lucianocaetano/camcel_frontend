<template>
  <div>
    <div class="q-pa-md" v-if="!isLoading">
      <div class="flex justify-between q-mb-md">
        <q-btn color="primary" flat @click="handleOutClick">salir</q-btn>
        <div class="flex justify-between">
          <q-btn color="primary q-mr-md" @click="handleOpenUpdateOperator">
            Editar
          </q-btn>
          <q-btn color="negative" @click="handleDeleteClick">Borrar</q-btn>
        </div>
      </div>
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <div class="text-h6">Datos del operario</div>
        </q-card-section>

        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">C.I.</th>
              <th class="text-right">Nombre</th>
              <th class="text-right">Autorización</th>
              <th class="text-right">Cargo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">{{ operator.ci }}</td>
              <td class="text-right">{{ operator.name }}</td>
              <td class="text-right">{{ operator.is_valid }}</td>
              <td class="text-right">{{ operator.cargo }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
      <table-documents
        v-if="documents"
        :documents="documents"
        :isOperator="true"
      />

    </div>
    <MenuEditOperator
      v-if="updateOperator"
      @handleCloseUpdateOperator="handleCloseUpdateOperator"
      :operator="operator"
      :show="updateOperator"
    />

    <div class="text-center" v-if="isLoading">Cargando...</div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import MenuEditOperator from "src/components/MenuEditOperator.vue";
import TableDocuments from "../components/TableDocuments.vue";

export default {
  components: { MenuEditOperator, TableDocuments },
  setup() {
    const { params } = useRoute();
    const router = useRouter();

    const operator = ref(null);
    const documents = ref(null);
    const isLoading = ref(true);

    const handleOutClick = () => {
      router.push("/empresas/" + params.enterprise);
    };

    const handleDeleteClick = () => {
      api
        .delete(`enterprises/${params.enterprise}/operators/${params.pk}`)
        .then((response) => {
          if (response.status == 200) {
            handleOutClick();
          }
        });
    };

    const fetchOperator = () => {
      api
        .get(`enterprises/${params.enterprise}/operators/${params.pk}`)
        .then((response) => {
          operator.value = {
            ...response.data.operator,
            is_valid: response.data.operator.is_valid
              ? "Autorizado"
              : "No Autorizado",
          };
          if (response.status === 200) {
            api
              .get(
                `enterprises/${params.enterprise}/operators/${params.pk}/documents`
              )
              .then((response) => {
                documents.value = response.data.documents;
              });
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    fetchOperator();

    const updateOperator = ref(false);
    const handleOpenUpdateOperator = () => {
      updateOperator.value = true;
    };
    const handleCloseUpdateOperator = () => {
      updateOperator.value = false;
      fetchOperator();
    };

    return {
      updateOperator,
      handleCloseUpdateOperator,
      handleOpenUpdateOperator,
      operator,
      documents,
      isLoading,
      handleOutClick,
      handleDeleteClick,
    };
  },
};
</script>
