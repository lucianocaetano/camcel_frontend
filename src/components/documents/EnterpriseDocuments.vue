<template>
  <div class="flex justify-between q-mb-md items-center">
    <h4 class="text-h4 q-my-none">Documentos :</h4>
    <add-document :enterprise="enterprise" @refetch="refetch"/>
  </div>
  <table-documents
    v-if="!isLoading"
    :documents="documents"
    :paginate="paginate"
    @refetch="refetch"
    @handleAddDocument="handleAddDocument"
  />
</template>

<script>
import { useDocumentsEnterprise } from "src/hooks/api/documents.hooks";
import TableDocuments from "./TableDocuments.vue";
import Pagination from "../helpers/Pagination.vue";
import AddDocument from "./AddDocumentEnterprise.vue";

export default {
  components: {
    TableDocuments,
    Pagination,
    AddDocument,
  },
  props: {
    enterprise: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { documents, paginate, isLoading, refetch } = useDocumentsEnterprise(
      props.enterprise
    );

    const handleRefetchPage = (page) => {
      refetch(page);
    };

    return {
      documents,
      paginate,
      isLoading,
      refetch,
      handleRefetchPage,
    };
  },
};
</script>
