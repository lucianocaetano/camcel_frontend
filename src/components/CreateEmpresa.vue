<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Crear Empresa</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleCreateEnterprise">
          <q-input
            name="RUT"
            required
            label="RUT"
            v-model="dataCreateEnterprise.RUT"
          />
          <div
            v-for="(error, index) in error_create?.RUT"
            :key="index"
            class="q-mt-sm"
          >
            <span  class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>
          <q-input
            name="nombre"
            required
            label="nombre"
            v-model="dataCreateEnterprise.nombre"
          />
          <div
            v-for="(error, index) in error_create?.nombre"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>
          <q-checkbox
            label="Verificado"
            v-model="dataCreateEnterprise.is_valid"
          />

          <q-file
            color="teal"
            filled
            label="image"
            v-model="dataCreateEnterprise.image"
          >
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
            v-model="dataCreateEnterprise.user_id"
            required
            option-label="email"
            :options="users"
            label="Usuario Empresario"
          />

          <div
            v-for="(error, index) in error_create?.user_id"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
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
          @click="handleCloseCreateEnterprise"
        />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>

import { reactive, toRef, ref } from "vue";
import { api } from "src/boot/axios";
import { useEnterpriseStore } from "src/store/enterprise.store";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const enterpriseStore = useEnterpriseStore();

    const isLoadingUser = ref(true);
    const users = ref(null);

    api.get("users", {
      params: {
        rol: "users_enterprise"
      }
    }).then((response) => {
      isLoadingUser.value = false;
      users.value = response.data.users;
    });

    const show = toRef(props, "show");

    const dataCreateEnterprise = reactive({
      nombre: "",
      RUT: "",
      is_valid: false,
      image: null,
      user_id: null,
    });

    const error_create = ref(null);

    const handleCloseCreateEnterprise = () => {
      emit("handleCloseCreateEnterprise");
    };

    const handleCreateEnterprise = () => {
      api
        .post(
          "enterprises",
          {
            ...dataCreateEnterprise,
            user_id: dataCreateEnterprise.user_id?.id,
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
      dataCreateEnterprise,
      handleCreateEnterprise,
      show,
      handleCloseCreateEnterprise,
      isLoadingUser,
      users,
      error_create,
    };
  },
};
</script>
