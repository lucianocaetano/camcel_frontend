<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Crear Usuarios</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleCreateUser">
          <q-input name="name" required label="name" v-model="data.name" />
          <div
            v-for="(error, index) in error_create?.name"
            :key="index"
            class="q-mt-sm"
          >
            <span  class="q-pa-xs bg-negative text-white">{{
              error
            }}</span>
          </div>

          <q-input
            name="email"
            required
            type="email"
            label="email"
            v-model="data.email"
          />
          <div
            v-for="(error, index) in error_create?.email"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-input
            name="password"
            required
            type="password"
            label="password"
            v-model="data.password"
          />
          <div
            v-for="(error, index) in error_create?.password"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-select
            v-model="data.rol"
            required
            option-label="label"
            option-value="value"
            :options="roles"
            label="Rol Usuario"
          />
          <div
            v-for="(error, index) in error_create?.rol"
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
          @click="handleCloseCreateUser"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { reactive, toRef, ref } from "vue";
import { api } from "src/boot/axios";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {

    const roles = [
      { label: "Empresario", value: "Enterprise" },
      { label: "Guardia", value: "Guard" },
      { label: "Admin", value: "Admin" },
    ];

    const show = toRef(props, "show");

    const data = reactive({
      email: "",
      name: "",
      password: "",
      rol: roles[0],
    });

    const error_create = ref(null);

    const handleCloseCreateUser = () => {
      emit("handleCreateUserMenuClose");
    };

    const handleCreateUser = () => {

      api
        .post(
          "users",
          {
            ...data,
            rol: data.rol.value,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(() => {
          handleCloseCreateUser();
        })
        .catch((err) => {
            console.error(err)
          if (err?.response?.status === 422) {
            const messages = err.response.data.errors;
            error_create.value = messages;
          }
        });
    };

    return {
      data,
      handleCreateUser,
      show,
      handleCloseCreateUser,
      roles,
      error_create,
    };
  },
};
</script>
