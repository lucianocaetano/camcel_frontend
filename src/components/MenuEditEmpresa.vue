<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Menu Edit Empresa</div>
      </q-card-section>

      <q-card-section class="q-pt-none" v-if="empresa">
        <q-form @submit.prevent="handleUpdateEnterprise">
          <q-input
            name="rut"
            required
            label="rut"
            v-model="empresa.RUT"
          />

          <q-input
            name="nombre"
            required
            label="nombre"
            v-model="empresa.nombre"
          />
          <div
            v-for="(error, index) in error_create?.nombre"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-file color="teal" filled label="image" v-model="empresa.image">
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

          <p v-if="isLoadingUser">loading...</p>
          <q-select
            v-else
            v-model="empresa.user"
            required
            option-label="email"
            :options="users"
            label="Standard"
          />

          <q-btn
            label="Editar"
            class="q-mt-md q-mr-sm"
            type="submit"
            color="primary"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" @click="handleClose" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, toRef } from "vue";
import { api } from "src/boot/axios";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    empresa: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");
    const empresa = toRef(props, "empresa");
    const error_create = ref(null);

    const isLoadingUser = ref(true);
    const users = ref(null);

    api
      .get("users", {
        params: {
          rol: "users_enterprise",
        },
      })
      .then((response) => {
        isLoadingUser.value = false;
        users.value = response.data.users;
      });

    const handleClose = () => {
      emit("handleCloseMenuEmpresa");
    };

    const handleUpdateEnterprise = () => {
      api
        .put(
          "enterprises/" + empresa.value.slug,
          {
            ...empresa.value,
            user_id: empresa.value.user?.id,
            image: undefined,
          },
          {
            headers: empresa.image
              ? { "Content-Type": "multipart/form-data" }
              : { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            handleClose();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 422) {
            const messages = err.response.data.errors;
            error_create.value = messages;
          }
        });
    };

    return {
      show,
      handleClose,
      empresa,
      error_create,
      handleUpdateEnterprise,
      isLoadingUser,
      users,
    };
  },
};
</script>

<style scoped>
.my-card {
  width: 380px; /* ajusta el ancho de la tarjeta */
  height: auto; /* ajusta el alto de la tarjeta */
  margin-bottom: 20px; /* agrega un margen inferior a cada tarjeta */
  border-radius: 10px; /* agrega un borde redondeado a la tarjeta */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.scrollable-section {
  /* Altura máxima deseada para la sección */
  overflow-y: auto; /* Habilitar barra de desplazamiento vertical cuando sea necesario */
  /* Otros estilos opcionales */
}
</style>
