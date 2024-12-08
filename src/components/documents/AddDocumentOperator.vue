<template>
  <q-dialog v-model="show">
    <q-card style="width: 2500px">
      <q-card-section class="q-mb-md">
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
            class="q-my-md"
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

          <q-file
            color="teal"
            filled
            label="Documento"
            required
            v-model="data.document"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div
            v-for="(error, index) in error_create?.document"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <div class="q-mt-md">
            <q-input
              filled
              type="datetime-local"
              required
              v-model="data.expire"
              label="Selecciona fecha y hora"
            />
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
import { reactive, ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useCreateDocumentOperator } from "src/hooks/api/documents.hooks";

export default {
  components: {
    Datepicker,
  },
  props: {
    enterprise: {
      type: String,
      required: true,
    },
    operator: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = ref(false);

    const data = reactive({
      title: "",
      type: "",
      is_valid: false,
      document: null,
      expire: null,
    });

    const handleCloseMenu = () => {
      show.value = false;
      
      data.title = ""
      data.type = ""
      data.is_valid = false
      data.document = null
      data.expire = null

      emit("refetch");
    };

    const error_create = ref(null)

    const handleAddDocument = async () => {
      console.log(data)
      const { isError, error } = await useCreateDocumentOperator(
        props.enterprise,
        props.operator,
        {
          ...data,
          expire: data.expire.replace("T", " "),
        }
      );
      if (isError.value) {
        error_create.value = error.value;
        console.log(error_create.value);
      } else {
        handleCloseMenu()
      }
    };

    return {
      data,
      error_create,
      handleAddDocument,
      show,
      handleCloseMenu,
      show,
    };
  },
};
</script>
