import { ref } from "vue";
import { api } from "src/boot/axios";

export const useOperators = (enterprise) => {
  const isLoading = ref(true);
  const operators = ref(null);

  const refetch = () => {
    api.get(`enterprises/${enterprise}/operators`).then((response) => {
      isLoading.value = false;
      operators.value = response.data.operators;
    });
  };

  api.get(`enterprises/${enterprise}/operators`).then((response) => {
    isLoading.value = false;
    operators.value = response.data.operators;
  });

  return {
    operators,
    isLoading,
    refetch,
  };
};

export const useOperator = (enterprise, pk) => {
  const isLoading = ref(true);
  const operator = ref(null);

  const refetch = () => {
    console.log("hola")
    api.get(`enterprises/${enterprise}/operators/${pk}`).then((response) => {
      operator.value = response.data.operator;
      isLoading.value = false;
    });
  };

  api.get(`enterprises/${enterprise}/operators/${pk}`).then((response) => {
    operator.value = response.data.operator;
    isLoading.value = false;
  });

  return {
    operator,
    isLoading,
    refetch,
  };
};

export const useDeleteOperator = async (enterprise, pk) => {
  return await api.delete(`enterprises/${enterprise}/operators/${pk}`)
};
