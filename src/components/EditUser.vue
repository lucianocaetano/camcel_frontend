<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Editar Usuario</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleEditUser">
          <q-input name="name" label="name" v-model="data.name" />
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
            type="password"
            label="password"
            v-model="data.password"
            value=""
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

          <q-btn label="Edit" class="q-mt-md" type="submit" color="primary" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="handleCloseEditUser"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { toRef, ref, reactive } from "vue";
import { api } from "src/boot/axios";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
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
      name: props.user.name,
      email: props.user.email,
      password: undefined,
      rol: props.user.rol === "Empresario sin empresa"? roles[0]: props.user.rol,
    })

    const error_create = ref(null);

    const handleCloseEditUser = () => {
      emit("handleCloseEditUser");
    };

    const handleEditUser = () => {
      api
        .patch(
          "users/" + props.user.id,
          {
            ...data,
            rol: data.rol.value,
            email: data.email === props.user.email? undefined: data.email
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(() => {
          handleCloseEditUser();
        })
        .catch((err) => {
          console.error(err);
          if (err?.response?.status === 422) {
            const messages = err.response.data.errors;
            error_create.value = messages;
          }
        });
    };

    return {
      handleEditUser,
      show,
      handleCloseEditUser,
      roles,
      data,
      error_create,
    };
  },
};
</script>
