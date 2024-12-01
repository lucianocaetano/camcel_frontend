<template>
  <ValidDeleteMenu
    v-if="validDeleteMenu"
    :show="validDeleteMenu"
    @handleDeleteMenuClose="handleDeleteMenuClose"
    @handleDeleteMenuAccept="handleDeleteMenuAccept"
  />
  <tr
    :class="`${operator.is_valid ? '' : 'bg-grey-4'} cursor-pointer`"
    @click="() => handleClickOperator()"
  >
    <td class="text-left">
      {{ operator.ci }}
    </td>
    <td class="text-left">
      {{ operator.name }}
    </td>
    <td class="text-left">
      <p :class="operator.is_valid ? 'text-green' : 'text-red'">
        {{ operator.is_valid ? "Autorizado" : "No Autorizado" }}
      </p>
    </td>
    <td class="text-left">{{ operator.cargo }} hola</td>
    <td class="text-center">
      <q-btn
        type="button"
        @click="handleDeleteMenuOpen"
        class="text-h5 text-negative"
      >
        <span class="mdi mdi-trash-can"></span>
      </q-btn>
    </td>
  </tr>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useDeleteOperator } from "src/hooks/api/operators.hooks";
import ValidDeleteMenu from "src/components/ValidDeleteMenu.vue";
import { ref } from "vue"

export default {
  components: {
    ValidDeleteMenu
  },
  props: {
    operator: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { params } = useRoute();

    const validDeleteMenu = ref(false);

    const handleDeleteMenuAccept = async () => {
      validDeleteMenu.value = false;
      // await useDeleteOperator(params.slug, props.operator.id)
      emit("refetch")
    };    

    const handleDeleteMenuClose = () => validDeleteMenu.value = false;
    
    const handleDeleteMenuOpen = (e) => { 
      e.stopPropagation();
      validDeleteMenu.value = true;
    }

    const handleClickOperator = () => {
      router.push({
        name: "operators-detail",
        params: {
          pk: props.operator.id,
          enterprise: params.slug,
        },
      });
    };

    return { handleClickOperator, handleDeleteMenuOpen, handleDeleteMenuClose, handleDeleteMenuAccept, validDeleteMenu };
  },
};
</script>
