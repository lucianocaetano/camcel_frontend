<template>
  <q-btn class="bg-primary text-white">Crear</q-btn>
  <br />
  <div class="full-width flex justify-end">
    <div>
      <q-btn @click="reFetchUsers(undefined)">Todos</q-btn>
      <q-btn @click="reFetchUsers('Admin')">Admin</q-btn>
      <q-btn @click="reFetchUsers('Enterprise')">Empresarios</q-btn>
      <q-btn @click="reFetchUsers('Guard')">Guardia</q-btn>
    </div>
  </div>
  <div class="q-pa-md">
    <q-markup-table style="height: 500px; overflow-y: scroll">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-right">Email</th>
          <th class="text-right">Rol</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="cursor-pointer">
          <td class="text-left">{{ user.name }}</td>
          <td class="text-right">{{ user.email }}</td>
          <td class="text-right">{{ user.rol }}</td>
          <td class="text-right">
            <q-btn
              icon="delete"
              class="text-negative"
              @click="() => handleDeleteUser(user.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { ref } from "vue";

export default {
  setup() {
    const isLoading = ref(true);
    const validMenu = ref(false);
    const users = ref([]);

    const handleDeleteUser = (id) => {
      api.delete(`admin/users/${id}}`).then((response) => {
        if (response.status === 200) {
          users.value = users.value.filter((user) => user.id !== id);
        }
      });
    };

    const reFetchUsers = (role = undefined) => {
      const params = {
        role,
      };

      api.get("admin/users", { params }).then((response) => {
        isLoading.value = false;
        users.value = response.data;
      });
    };

    api.get("admin/users").then((response) => {
      isLoading.value = false;
      users.value = response.data;
    });

    return {
      reFetchUsers,
      users,
      isLoading,
      handleDeleteUser,
      validMenu,
    };
  },
};
</script>
