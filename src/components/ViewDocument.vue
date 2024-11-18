<template>
  <q-dialog v-model="show">
    <q-card
      style="height: 100%; width: 100%; max-width: 1500px; max-height: 1000px"
      class="q-mx-md flex column justify-between"
      v-if="!isLoading"
    >
      <q-card-section class="flex justify-between">
        <div>
          <div class="text-h6 q-mb-sm">{{ doc.title }}</div>
          <p class="q-mb-none">Expira: {{ doc.expire }}</p>
          <p v-if="doc.enterprise">Empresa: {{ doc.enterprise }}</p>
        </div>
        <div>
          <p :class="doc.is_valid ? 'text-green' : 'text-red'">
            {{ doc.is_valid ? "Autorizado" : "No Autorizado" }}
          </p>

          <a
            :href="api_base_backend + doc.url_document"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir al documento
          </a>
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-none" style="flex-grow: 1; overflow: hidden; padding: 0 10px;">
        <iframe
          :src="api_base_backend + doc.url_document"
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
import { toRef, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { api_base_backend } from "../helpers.js";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    document: {
      type: Number,
      required: true,
    },
    operator: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");
    const isOperatorMenu = toRef(props, "operator");
    const doc_id = toRef(props, "document");

    const isLoading = ref(true);

    const doc = ref(null);

    const { params } = useRoute();

    const operatorRoute = isOperatorMenu.value
      ? `enterprises/${params.enterprise}/operators/${params.pk}/documents/${doc_id.value}`
      : `enterprises/${params.slug}/documents/${doc_id.value}`;

    api.get(operatorRoute).then((response) => {
      if (response.status === 200) {
        doc.value = response.data.document;
      }
      isLoading.value = false;
    });

    const handleCloseMenu = () => {
      emit("handleCloseDocumentMenu");
    };

    return {
      doc,
      handleCloseMenu,
      isLoading,
      show,
      api_base_backend,
    };
  },
};
</script>
