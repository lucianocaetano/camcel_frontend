<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Añadir Documento</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleAddDocument">
          <q-input
            name="title"
            required
            label="Titulo"
            v-model="data.title"
            />
            <div
              v-for="(error, index) in error_create?.title"
              :key="index"
              class="q-mt-sm"
              >
              <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
            </div>
            <q-btn label="Subir" class="q-mt-md" type="submit" color="primary" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="handleCloseAddDocumentMenu"
          />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { reactive, toRef, ref } from "vue";
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    isOperator: {
      type: Boolean,
    }
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");
    const isOperator = props.isOperator ? true: false;

    const data = reactive({
      title: "",
      is_valid: false,
      document: null,
      expire: null,
    });

    const error_create = ref(null);

    const handleCloseAddDocumentMenu = () => {
      emit("handleCloseAddDocumentMenu");
    };

    const { params } = useRoute()
    
    const handleAddDocument = () => {
      api
        .post(
          isOperator
          ? `enterprises/${params.slug}/documents`
          : `enterprises/${params.enterprise}/operators/${params.pk}/documents`,
          {
            ...data,
          },
          {
            headers: dataCreateEnterprise.image
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          enterpriseStore.addEnterprise(response.data.enterprise);
          handleCloseCreateEnterprise();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            const messages = err.response.data.errors;
            error_create.value = messages;
          }
        });
    };

    return {
      data,
      handleAddDocument,
      show,
      handleCloseAddDocumentMenu,
      error_create,
    };
  },
};
</script>
