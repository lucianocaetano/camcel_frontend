<template>
  <ValidDeleteUserMenu
    v-if="validDeleteMenu"
    :show="validDeleteMenu"
    @handleDeleteUserMenuClose="handleDeleteUserMenuClose"
    @handleDeleteUserMenuAccept="handleDeleteUserMenuAccept"
  />

  <EditUser
    v-if="editUser"
    :show="editUser"
    @handleCloseEditUser="handleEditUserMenuClose"
    :user="user"
  />

  <CreateUser
    v-if="createUser"
    :show="createUser"
    @handleCreateUserMenuClose="handleCreateUserMenuClose"
  />
  <div class="flex justify-center">
    <q-input
      style="max-width: 700px; width: 100%"
      filled
      v-model="search"
      class="custom-input q-mb-md"
      label="Busqueda"
    >
      <template v-slot:prepend>
        <q-btn flat round dense class="icono_de_busqueda" icon="search" />
      </template>
    </q-input>
  </div>

  <div class="full-width flex justify-center">
    <div>
      <q-btn
        class="bg-primary text-white q-mr-md"
        @click="handleCreateUserMenuOpen"
        >Create</q-btn
      >
      <q-btn @click="fetchUsers(undefined)">Todos</q-btn>
      <q-btn @click="fetchUsers('Admin')">Admin</q-btn>
      <q-btn @click="fetchUsers('Enterprise')">Empresarios</q-btn>
      <q-btn @click="fetchUsers('Guard')">Guardia</q-btn>
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
          <template
            v-if="user.name.toLowerCase().includes(search.toLowerCase())"
          >
            <td class="text-left">{{ user.name }}</td>
            <td class="text-right">{{ user.email }}</td>
            <td class="text-right">{{ user.rol }}</td>
            <td class="text-right">
              <q-btn
                icon="edit"
                class="text-primary q-mr-md"
                @click="() => handleEditUserMenuOpen(user)"
              />
              <q-btn
                icon="delete"
                class="text-negative"
                @click="() => handleDeleteUserMenuOpen(user.id)"
              />
            </td>
          </template>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { ref } from "vue";
import ValidDeleteUserMenu from "src/components/ValidDeleteUserMenu.vue";
import EditUser from "src/components/EditUser.vue";
import CreateUser from "src/components/CreateUser.vue";

export default {
  components: {
    ValidDeleteUserMenu,
    CreateUser,
    EditUser,
  },
  setup() {
    const isLoading = ref(true);
    const users = ref([]);
    const user = ref(null);

    const search = ref("");

    const validDeleteMenu = ref(false);
    const createUser = ref(false);
    const editUser = ref(false);
    const id_user_delete = ref(null);

    const handleDeleteUser = (id) => {
      api.delete(`admin/users/${id}}`).then((response) => {
        if (response.status === 200) {
          users.value = users.value.filter((user) => user.id !== id);
        }
      });
    };

    const handleDeleteUserMenuOpen = (id) => {
      id_user_delete.value = id;
      validDeleteMenu.value = true;
    };

    const handleDeleteUserMenuClose = () => {
      validDeleteMenu.value = false;
    };

    const handleDeleteUserMenuAccept = () => {
      validDeleteMenu.value = false;
      handleDeleteUser(id_user_delete.value);
      id_user_delete.value = null;
    };

    const fetchUsers = (role = undefined) => {
      const params = {
        role,
      };

      api.get("admin/users", { params }).then((response) => {
        isLoading.value = false;
        users.value = response.data;
      });
    };

    fetchUsers();

    const handleEditUserMenuClose = () => {
      fetchUsers();
      editUser.value = false;
    };

    const handleEditUserMenuOpen = (user_table) => {
      user.value = user_table;
      editUser.value = true;
    };

    const handleCreateUserMenuClose = () => {
      fetchUsers();
      createUser.value = false;
    };
    const handleCreateUserMenuOpen = () => {
      createUser.value = true;
    };

    return {
      fetchUsers,
      users,
      isLoading,
      handleDeleteUser,
      validDeleteMenu,
      handleDeleteUserMenuClose,
      handleDeleteUserMenuOpen,
      handleDeleteUserMenuAccept,
      handleEditUserMenuClose,
      handleEditUserMenuOpen,
      editUser,
      handleCreateUserMenuClose,
      handleCreateUserMenuOpen,
      createUser,
      user,
      search,
    };
  },
};
</script>
