<template>
  <div style="width: 100%; height: 100vh" class="q-mt-xl">
    <div class="flex justify-between q-mb-md items-center">
      <h4 class="text-h4 q-my-none">Documentos :</h4>
      <q-btn
        label="Añadir Documento"
        class="q-mt-md q-mr-sm"
        type="button"
        color="primary"
        @click="handleOpenAddDocumentMenu"
      />
    </div>
    <q-markup-table flat bordered>
      <thead class="bg-teal text-white">
        <tr>
          <th class="text-left">Título</th>
          <th class="text-left">Vencimiento</th>
          <th class="text-left">Autorización</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr
          v-for="(document, index) in documents"
          :key="index"
          :class="`${document.is_valid ? '' : 'bg-grey-4'} cursor-pointer`"
          @click="() => handleOpenDocumentMenu(document.id)"
        >
          <td class="text-left">
            {{ document.title }}
          </td>
          <td class="text-left">
            {{ document.expire }}
          </td>
          <td class="text-left">
            <p :class="document.is_valid ? 'text-green' : 'text-red'">
              {{ document.is_valid ? "Autorizado" : "No Autorizado" }}
            </p>
          </td>
          <td class="text-center">
            <q-btn type="button" class="text-h6 text-secondary">
              <span class="mdi mdi-pencil"></span>
            </q-btn>

            <q-btn
              v-if="document.is_valid"
              type="button"
              class="q-ml-md text-h6 text-negative"
            >
              <span class="mdi mdi-thumb-down"></span>
            </q-btn>

            <q-btn v-else type="button" class="q-ml-md text-h6 text-primary">
              <span class="mdi mdi-thumb-up"></span>
            </q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <view-document
      v-if="showDocumentMenu"
      :show="showDocumentMenu"
      :document="doc"
      :operator="isOperator"
      @handleCloseDocumentMenu="handleCloseDocumentMenu"
    />

    <add-document
      v-if="showAddDocumentMenu"
      :show="showAddDocumentMenu"
      :handleCloseAddDocumentMenu="handleCloseAddDocumentMenu"
    />
  </div>
</template>

<script>
import ViewDocument from "../components/ViewDocument.vue";
import AddDocument from "../components/AddDocument.vue";
import { ref } from "vue";

export default {
  components: {
    ViewDocument,
    AddDocument,
  },
  props: {
    documents: {
      type: Array,
      required: true,
    },
    isOperator: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const showDocumentMenu = ref(false);
    const isOperator = props.isOperator ? true : false;
    const doc = ref(null);

    const handleOpenDocumentMenu = (pk) => {
      doc.value = pk;
      showDocumentMenu.value = true;
    };

    const handleCloseDocumentMenu = () => {
      showDocumentMenu.value = false;
    };

    const showAddDocumentMenu = ref(false);

    const handleOpenAddDocumentMenu = () => {
      showAddDocumentMenu.value = true;
    };

    const handleCloseAddDocumentMenu = () => {
      showAddDocumentMenu.value = false;
      console.log(showAddDocumentMenu.value)
      emit("refetch");
    };

    return {
      documents: props.documents,
      isOperator,
      doc,
      handleCloseDocumentMenu,
      handleOpenDocumentMenu,
      showDocumentMenu,
      showAddDocumentMenu,
      handleCloseAddDocumentMenu,
      handleOpenAddDocumentMenu,
    };
  },
};
</script>
