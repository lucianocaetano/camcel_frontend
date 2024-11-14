<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Quieres borrar a este usuario?</div>
      </q-card-section>

      <q-card-actions class="flex justify-between">
        <p class="text-negative text-md">
          Warning: Recuerda que si borras un usuario empresario la empresa NO se borrara
        </p>
      </q-card-actions>
      <q-card-actions class="flex justify-between">
        <q-btn
          flat
          label="Cerrar"
          v-close-popup
          @click="handleDeleteUserMenuClose"
        />
        <q-btn
          flat
          label="Aceptar"
          color="primary"
          v-close-popup
          @click="handleDeleteUserMenuAccept"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { toRef } from "vue";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");

    const handleDeleteUserMenuAccept = () => {
      emit("handleDeleteUserMenuAccept");
    };

    const handleDeleteUserMenuClose = () => {
      emit("handleDeleteUserMenuClose");
    };
    return {
      handleDeleteUserMenuClose,
      handleDeleteUserMenuAccept,
      show,
    };
  },
};
</script>
