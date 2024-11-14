<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Crear operador</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleCreateOperator">
          <q-input
            name="Cédula"
            required
            label="Cédula"
            v-model="dataCreateOperator.ci"
          />
          <div
            v-for="(error, index) in error_create?.ci"
            :key="index"
            class="q-mt-sm"
          >
            <span style="2px;" class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-input
            name="Nombre"
            required
            label="Nombre"
            v-model="dataCreateOperator.name"
          />
          <div
            v-for="(error, index) in error_create?.nombre"
            :key="index"
            class="q-mt-sm"
          >
            <span style="2px;" class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-checkbox
            label="Autorizado"
            v-model="dataCreateOperator.authorized"
          />

          <q-input
            name="Cargo"
            required
            label="Cargo"
            v-model="dataCreateOperator.role_description"
          />
          <div
            v-for="(error, index) in error_create?.authorize"
            :key="index"
            class="q-mt-sm"
          >
            <span style="2px;" class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-btn label="Crear" class="q-mt-md" type="submit" color="primary" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="handleCloseCreateOperator"
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
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");
    const { params } = useRoute();

    const dataCreateOperator = reactive({
      ci: "",
      name: "",
      authorized: false,
      role_description: null,
    });

    const error_create = ref(null);

    const handleCloseCreateOperator = () => {
      emit("handleCloseCreateOperator");
    };

    console.log(params.slug)
    const handleCreateOperator = () => {
      api
        .post(
          `enterprises/${params.slug}/operators`,
          dataCreateOperator,
        )
        .then(() => {
          handleCloseCreateOperator();
        })
        .catch((err) => {
              console.log(err)
          if (err.response.status === 422) {
            const messages = err.response.data.errors;
            error_create.value = messages;
          }
        });
    };

    return {
      dataCreateOperator,
      handleCreateOperator,
      show,
      handleCloseCreateOperator,
      error_create,
    };
  },
};
</script>
