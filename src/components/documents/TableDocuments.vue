<template>
  <div style="width: 100%; height: 100vh">
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
    <Pagination
      :currentPage="paginate.current_page"
      :maxPages="paginate.last_page"
      @handleRefetchPage="handleRefetchPage"
    />
  </div>
</template>

<script>
import DocumentItem from "./DocumentItem.vue";
import { ref } from "vue";
import Pagination from "../helpers/Pagination.vue";

export default {
  components: {
    DocumentItem,
    Pagination,
  },
  props: {
    documents: {
      type: Array,
      required: true,
    },
    paginate: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const doc = ref(null);

    const refetch = () => emit("refetch");

    const handleRefetchPage = (page) => {
      emit("refetch", page);
    };

    return {
      doc,
      refetch,
      handleRefetchPage,
    };
  },
};
</script>
