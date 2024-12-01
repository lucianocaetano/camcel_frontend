<template>
  <MenuCreateOperator
    v-if="createOperator"
    :show="createOperator"
    @handleCloseCreateOperator="handleCloseCreateOperator"
  />
  <div class="flex justify-between items-center q-my-md">
    <h4 class="text-h4 q-my-none">Operarios:</h4>
    <q-btn
      label="Crear Operario"
      class="q-mt-md q-mr-sm"
      type="button"
      color="primary"
      @click="handleOpenCreateOperator"
    />
  </div>
  <q-markup-table flat bordered>
    <thead class="bg-dark text-white">
      <tr>
        <th class="text-left">C.I.</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Autorización</th>
        <th class="text-left">Cargo</th>
        <th class="text-center">Acciones</th>
      </tr>
    </thead>
    <tbody
      :class="$q.dark.isActive ? 'bg-grey-91973-08-07 00:00:00' : 'bg-grey-3'"
    >
      <operator-item v-for="operator in operators" :key="operator.id" :operator="operator" @refetch="refetch"/>
    </tbody>
  </q-markup-table>
</template>

<script>
import { useOperators } from "src/hooks/api/operators.hooks";
import MenuCreateOperator from "src/components/MenuCreateOperator.vue";
import OperatorItem from "src/components/operators/OperatorItem.vue";
import { ref } from "vue";

export default {
  components: {
    MenuCreateOperator,
    OperatorItem
  },
  props: {
    enterprise: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { operators, isLoading, refetch } = useOperators(props.enterprise);

    const createOperator = ref(false);

    const handleOpenCreateOperator = () => {
      createOperator.value = true;
    };

    const handleCloseCreateOperator = () => {
      createOperator.value = false;
      refetch();
    };

    return {
      operators,
      createOperator,
      handleOpenCreateOperator,
      handleCloseCreateOperator,
      refetch,
      isLoading,
    };
  },
};
</script>
