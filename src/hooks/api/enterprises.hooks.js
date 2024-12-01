import { ref } from "vue";
import { api } from "src/boot/axios";

export const useEnterprises = () => {
  const isLoading = ref(true);
  const enterprises = ref(null);

  const refetch = (filter = null) => {
    api
      .get("enterprises", {
        params: {
          filter,
        },
      })
      .then((response) => {
        isLoading.value = false;
        enterprises.value = response.data;
      });
  };

  api
    .get("enterprises", {
      params: {
        filter: true,
      },
    })
    .then((response) => {
      isLoading.value = false;
      enterprises.value = response.data;
    });

  return {
    enterprises,
    isLoading,
    refetch,
  };
};

export const useEnterprise = (slug) => {
  const isLoading = ref(true);
  const enterprise = ref(null);

  const refetch = () => {
    api.get(`enterprises/${slug}`).then((response) => {
      enterprise.value = response.data.enterprise;
    });
  };

  api.get(`enterprises/${slug}`).then((response) => {
    enterprise.value = response.data.enterprise;
    isLoading.value = false;
  });

  return {
    enterprise,
    isLoading,
    refetch,
  };
};

export const useValidEnterprise = async (slug) => {
  return await api.patch(`enterprises/${slug}`, {
    is_valid: true,
  });
};

export const useNotValidEnterprise = async (slug) => {
  return await api.patch(`enterprises/${slug}`, {
    is_valid: false,
  });
};

export const useDeleteEnterprise = async (slug) => {
  return await api.delete(`enterprises/${slug}`);
};

export const useCreateEnterprise = async (data) => {
  const enterprise = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("RUT", data.RUT);
  formData.append("nombre", data.name);
  formData.append("is_valid", data.is_valid);
  formData.append("user_id", data.user_id);

  if (data.image !== null) {
    formData.append("image", data.image);
  }

  await api
    .post("enterprises", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      enterprise.value = response.data.enterprise;
    })
    .catch((err) => {
      console.error(err)
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    enterprise,
    isError,
    error,
  };
};

export const useUpdateEnterprise = async (slug, data) => {
  const enterprise = ref(null);
  const isError = ref(false);
  const error = ref(null);
  
  const formData = new FormData();
  
  formData.append("_method", "PUT");
  formData.append("nombre", data.name);
  formData.append("user_id", data.user?.id);

  if (data.image !== null) {
    formData.append("image", data.image);
  }

  await api
    .post(`enterprises/${slug}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      if (response.status === 200) {
        enterprise.value = response.data.enterprise
      }
    })
    .catch((err) => {
      if (err?.response?.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    enterprise,
    isError,
    error,
  };
};
