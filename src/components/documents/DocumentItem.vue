<template>
  <tr
    :class="`${document.is_valid ? '' : 'bg-grey-4'} cursor-pointer`"
    @click="() => show = true"
  >
    <td class="text-left">
      {{ document.title }}
    </td>
    <td class="text-left">
      {{ document.expire }}
    </td>
    <td class="text-left">
      <p :class="document.is_valid ? 'text-green' : 'text-red'">
        {{ document.is_valid ? "Autorizado" : "No Autorizado" }}
      </p>
    </td>
    <td class="text-center">
      <q-btn type="button" class="text-h6 text-secondary">
        <span class="mdi mdi-pencil"></span>
      </q-btn>

      <q-btn
        v-if="document.is_valid"
        type="button"
        class="q-ml-md text-h6 text-negative"
      >
        <span class="mdi mdi-thumb-down"></span>
      </q-btn>

      <q-btn v-else type="button" class="q-ml-md text-h6 text-primary">
        <span class="mdi mdi-thumb-up"></span>
      </q-btn>
    </td>
  </tr>
  <view-document
    v-if="show"
    :show="show"
    :document="document"
    @handleClose="handleCloseDocumentView"
  />
</template>

<script>
import { ref } from "vue";
import ViewDocument from "./ViewDocument.vue";

export default {
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
  components: {
    ViewDocument
  },
  data(props) {
    const show = ref(false);


    const handleCloseDocumentView = () => show.value = false;

    return {
      document: props.document,
      show,
      handleCloseDocumentView,
    };
  },
};
</script>
