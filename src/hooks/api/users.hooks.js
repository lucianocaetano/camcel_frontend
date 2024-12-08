import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUsers = () => {
  const isLoading = ref(true);
  const users = ref([]);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    api
      .get("users", {
        params,
      })
      .then((response) => {
        isLoading.value = false;
        users.value = response.data.users;
        paginate.value = response.data.meta;
      });
  };

  api.get("users").then((response) => {
    isLoading.value = false;
    users.value = response.data.users;
    paginate.value = response.data.meta;
  });

  return {
    isLoading,
    refetch,
    users,
    paginate,
  };
};

export const useDeleteUser = async (id) => {
  return await api.delete(`users/${id}}`);
};
