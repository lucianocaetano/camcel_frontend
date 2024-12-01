<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Menu Edit Empresa</div>
      </q-card-section>

      <q-card-section class="q-pt-none" v-if="enterprise">
        <q-form @submit.prevent="handleUpdateEnterprise">
          <q-input
            name="nombre"
            required
            label="nombre"
            v-model="enterprise.name"
          />
          <div
            v-for="(error, index) in error_edit?.nombre"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-file color="teal" filled label="image" v-model="image">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div
            v-for="(error, index) in error_edit?.image"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <p v-if="isLoadingUser">loading...</p>
          <q-select
            v-else
            v-model="enterprise.user"
            required
            option-label="email"
            :options="users"
            label="Usuarios"
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
import { useUpdateEnterprise } from "src/hooks/api/enterprises.hooks";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    enterprise: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");
    const enterprise = toRef(props, "enterprise");
    const error_edit = ref(null);
    const image = ref(null);

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

    const handleClose = () => emit("handleCloseMenuEditEnterprise");

    const handleUpdateEnterprise = async () => {
      const {
        isError,
        error,
        enterprise: data,
      } = await useUpdateEnterprise(enterprise.value.slug, {
        ...enterprise.value,
        image: image.value,
      })

      if (!isError.value) {
        enterprise.value.image = data.value.image
        handleClose()
      } else {
        error_edit.value = error.value;
      }
    };

    return {
      show,
      handleClose,
      enterprise,
      error_edit,
      handleUpdateEnterprise,
      isLoadingUser,
      image,
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
