<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Quieres borrar esto realmente?</div>
        <p class="q-mt-sm">Escribe "CONFIRMAR":</p>
        <q-card-actions class="flex column w-full">
          <q-input outlined v-model="text_confirm" label="escribe aqui" />
        </q-card-actions>
      </q-card-section>

      <q-card-actions class="flex justify-between">
        <q-btn
          flat
          label="Cerrar"
          v-close-popup
          @click="handleDeleteMenuClose"
        />
        <q-btn
          flat
          label="Aceptar"
          color="primary"
          v-close-popup
          @click="handleDeleteMenuAccept"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, toRef } from "vue";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    warning: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");
    const text_confirm = ref("");

    const handleDeleteMenuAccept = () => {
      if (text_confirm.value === "CONFIRMAR") {
        emit("handleDeleteMenuAccept");
      }
    };

    const handleDeleteMenuClose = () => {
      emit("handleDeleteMenuClose");
    };
    return {
      handleDeleteMenuClose,
      handleDeleteMenuAccept,
      text_confirm,
      show,
    };
  },
};
</script>
