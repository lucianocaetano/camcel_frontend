import { ref } from "vue";
import { api } from "src/boot/axios";

export const useDocuments = (enterprise) => {
  const isLoading = ref(true);
  const documents = ref(null);

  const refetch = () => {
    api.get(`enterprises/${enterprise}/documents`).then((response) => {
      isLoading.value = false;
      documents.value = response.data.documents;
    });
  };

  api.get(`enterprises/${enterprise}/documents`).then((response) => {
    isLoading.value = false;
    documents.value = response.data.documents;
  });

  return {
    documents,
    isLoading,
    refetch,
  };
};

export const useDocumentsOperators = (enterprise, operator) => {
  const isLoading = ref(true);
  const documents = ref(null);

  const refetch = () => {
    api
      .get(`enterprises/${enterprise}/operators/${operator}/documents`)
      .then((response) => {
        isLoading.value = false;
        documents.value = response.data.documents;
      });
  };

  api
    .get(`enterprises/${enterprise}/operators/${operator}/documents`)
    .then((response) => {
      isLoading.value = false;
      documents.value = response.data.documents;
    });

  return {
    documents,
    isLoading,
    refetch,
  };
};

export const handleCreateDocumentEnterprise = async (enterprise, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append('title', data.title)
  formData.append('expire', data.title)
  formData.append('is_valid', data.title)
  formData.append('enterprise_id', data.enterprise_id)

  if (data.document !== null) {
    formData.append("document", data.document);
  }

  await api
    .post(`enterprises/${enterprise}/operators/documents`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    )
    .then((response) => {
      doc.value = response.data.document;
    })
    .catch((err) => {
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    isError,
    error,
    doc
  }
};
