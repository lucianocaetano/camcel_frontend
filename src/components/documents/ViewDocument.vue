<template>
  <q-dialog v-model="show">
    <q-card
      style="height: 100%; width: 100%; max-width: 1500px; max-height: 1000px"
      class="q-mx-md flex column justify-between"
      v-if="!isLoading"
    >
      <q-card-section class="flex justify-between">
        <div>
          <div class="text-h6 q-mb-sm">{{ document.title }}</div>
          <p class="q-mb-none">Expira: {{ document.expire }}</p>
          <p v-if="document.enterprise">Dueño: {{ document.owner }}</p>
        </div>
        <div>
          <p :class="document.is_valid ? 'text-green' : 'text-red'">
            {{ document.is_valid ? "Autorizado" : "No Autorizado" }}
          </p>

          <a
            :href="api_base_backend + '/' + document.url_document"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir al documentumento
          </a>
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-none" style="flex-grow: 1; overflow: hidden; padding: 0 10px;">
        <iframe
          :src="api_base_backend + '/' + document.url_document"
          class="w-full"
          style="flex-grow: 1; border: none; height: 100%; height: 100%"
        />
      </q-card-actions>
      <q-card-actions class="flex justify-end" style="height: auto">
        <q-btn
          flat
          label="Cerrar"
          class="text-left"
          color="primary"
          v-close-popup
          @click="handleCloseMenu"
        />
      </q-card-actions>
    </q-card>

    <q-card style="width: 900px" v-if="isLoading">
      <q-card-actions class="q-my-2xl"> loading... </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { toRef } from "vue";
import { api_base_backend } from "../../helpers.js";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    document: {
      type: Object,
      required: true,
    },
    operator: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");

    const handleCloseMenu = () => emit("handleClose");

    return {
      handleCloseMenu,
      documentument: props.document,
      show,
      api_base_backend,
    };
  },
};
</script>
