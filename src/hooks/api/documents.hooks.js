import { ref } from "vue";
import { api } from "src/boot/axios";

export const useJobDocuments = () => {
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

export const useDocumentsEnterprise = (enterprise) => {
  const isLoading = ref(true);
  const documents = ref(null);
  const paginate = ref(null);

  const refetch = (page = 1) => {
    api
      .get(`enterprises/${enterprise}/documents`, {
        params: {
          page,
        },
      })
      .then((response) => {
        isLoading.value = false;
        documents.value = response.data.documents;
        paginate.value = response.data.meta;
      });
  };

  api.get(`enterprises/${enterprise}/documents`).then((response) => {
    isLoading.value = false;
    documents.value = response.data.documents;
    paginate.value = response.data.meta;
  });

  return {
    documents,
    paginate,
    isLoading,
    refetch,
  };
};

export const useDocumentsOperators = (enterprise, operator) => {
  const isLoading = ref(true);
  const documents = ref(null);
  const paginate = ref(null);

  const refetch = (page = 1) => {
    api
      .get(`enterprises/${enterprise}/operators/${operator}/documents`, {
        params: {
          page,
        },
      })
      .then((response) => {
        isLoading.value = false;
        paginate.value = response.data.meta;
        documents.value = response.data.documents;
      });
  };

  api
    .get(`enterprises/${enterprise}/operators/${operator}/documents`)
    .then((response) => {
      isLoading.value = false;
      documents.value = response.data.documents;
      paginate.value = response.data.meta;
    });

  return {
    documents,
    paginate,
    isLoading,
    refetch,
  };
};

export const useCreateDocumentOperator = async (enterprise, operator, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("expire", data.expire);
  formData.append("is_valid", data.is_valid ? "1" : "0");

  formData.append("document", data.document);

  await api
    .post(
      `enterprises/${enterprise}/operators/${operator}/documents`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
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
    doc,
  };
};

export const useCreateDocumentEnterprise = async (enterprise, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("expire", data.expire);
  formData.append("is_valid", data.is_valid ? "1" : "0");

  formData.append("document", data.document);

  await api
    .post(`enterprises/${enterprise}/documents`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
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
    doc,
  };
};
