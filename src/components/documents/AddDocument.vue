<template>
  <q-dialog v-model="show">
    <q-card style="width: 2500px">
      <q-card-section>
        <div class="text-h6">Añadir Documento</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleAddDocument">
          <q-input name="title" required label="Titulo" v-model="data.title" />
          <div
            v-for="(error, index) in error_create?.title"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-checkbox
            name="is_valid"
            required
            label="Autorizado"
            v-model="data.is_valid"
          />
          <div
            v-for="(error, index) in error_create?.is_valid"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-file color="teal" filled label="Documento" v-model="data.document">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div
            v-for="(error, index) in error_create?.image"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <div class="q-mt-md">
            <div class="row items-center"></div>
            <div
              v-for="(error, index) in error_create?.expire"
              :key="index"
              class="q-mt-sm"
            >
              <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
            </div>
          </div>

          <q-btn
            label="Guardar"
            class="q-mt-md"
            type="submit"
            color="primary"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="handleCloseMenu"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-btn
    label="Añadir Documento"
    class="q-mt-md q-mr-sm"
    type="button"
    color="primary"
    @click="show = true"
  />
</template>

<script>
import { reactive, toRef, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { params } = useRoute();

    const show = ref(false);

    const handleCloseMenu = () => {
      showAddDocumentMenu.value = false;
      emit("refetch");
    };

    const error_create = ref(null);
    const data = reactive({
      title: "",
      type: "",
      is_valid: false,
      document: null,
      expire: null,
      document: null,
    });


    const handleAddDocument = async () => {
      const role = props.role;
      if (role === "enterprise") {
        console.log(data);
      }
    };

    return {
      data,
      handleAddDocument,
      show,
      handleCloseMenu,
      error_create,
      show,
    };
  },
};
</script>
