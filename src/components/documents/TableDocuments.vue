<template>
  <div style="width: 100%; height: 100vh" class="q-mt-xl">
    <div class="flex justify-between q-mb-md items-center">
      <h4 class="text-h4 q-my-none">Documentos :</h4>

      <add-document role="enterprise"/>
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
        <document-item
          :document="document"
          v-for="document in documents"
          :key="document.id"
        />
      </tbody>
    </q-markup-table>

  </div>
</template>

<script>
import AddDocument from "./AddDocument.vue";
import DocumentItem from "./DocumentItem.vue";
import { ref } from "vue";

export default {
  components: {
    AddDocument,
    DocumentItem,
  },
  props: {
    documents: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const doc = ref(null);

    return {
      doc,
    };
  },
};
</script>
