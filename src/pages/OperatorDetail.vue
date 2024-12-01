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
import TableDocuments from "../components/documents/TableDocuments.vue";
import { useOperator, useDeleteOperator } from "src/hooks/api/operators.hooks";
import { useDocumentsOperators as useDocuments } from "src/hooks/api/documents.hooks";

export default {
  components: { MenuEditOperator, TableDocuments },
  setup() {
    const { params } = useRoute();
    const router = useRouter();

    const {operator, isLoading, refetch} = useOperator(params.enterprise, params.pk)
    const { documents, isLoading: isLoadingDocuments, refetch: refetchDocuments } = useDocuments(params.enterprise, params.pk);
    
    const handleOutClick = () => router.push("/enterprise/" + params.enterprise);

    const handleDeleteClick = async () => {
      await useDeleteOperator(params.enterprise, params.pk)
      refetch();
    };

    const updateOperator = ref(false);
    
    const handleOpenUpdateOperator = () => updateOperator.value = true;

    const handleCloseUpdateOperator = () => {
      updateOperator.value = false 
      refetch() 
    };

    return {
      updateOperator,
      handleCloseUpdateOperator,
      handleOpenUpdateOperator,
      operator,
      documents,
      isLoading: isLoading && isLoadingDocuments,
      refetchDocuments,
      handleOutClick,
      handleDeleteClick,
    };
  },
};
</script>
