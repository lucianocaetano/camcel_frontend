<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Editar operador</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleUpdateOperator">
          <q-input
            name="Cédula"
            required
            label="Cédula"
            v-model="dataUpdateOperator.ci"
          />
          <div
            v-for="(error, index) in error_update?.ci"
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
            v-model="dataUpdateOperator.name"
          />
          <div
            v-for="(error, index) in error_update?.nombre"
            :key="index"
            class="q-mt-sm"
          >
            <span style="2px;" class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-checkbox
            label="Autorizado"
            v-model="dataUpdateOperator.authorized"
          />

          <q-input
            name="Cargo"
            required
            label="Cargo"
            v-model="dataUpdateOperator.role_description"
          />
          <div
            v-for="(error, index) in error_update?.authorize"
            :key="index"
            class="q-mt-sm"
          >
            <span style="2px;" class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-btn label="Editar" class="q-mt-md" type="submit" color="primary" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="handleCloseUpdateOperator"
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
    operator: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");
    const { params } = useRoute();

    const dataUpdateOperator = reactive({
      ci: props.operator.ci,
      name: props.operator.name,
      authorized: props.operator.is_valid === "Autorizado"? true: false,
      role_description: props.operator.cargo,
    });

    const error_update = ref(null);

    const handleCloseUpdateOperator = () => {
      emit("handleCloseUpdateOperator");
    };

    const handleUpdateOperator = () => {
      api
        .put(
          `enterprises/${params.enterprise}/operators/${props.operator.id}`,
          dataUpdateOperator
        )
        .then(() => {
          handleCloseUpdateOperator();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 422) {
            const messages = err.response.data.errors;
            error_update.value = messages;
          }
        });
    };

    return {
      dataUpdateOperator,
      handleUpdateOperator,
      handleCloseUpdateOperator,
      error_update,
      show,
    };
  },
};
</script>
