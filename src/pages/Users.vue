<template>
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
        >Crear</q-btn
      >

      <q-btn-dropdown color="#000000" :label="role === null? 'Todos': role" text-color="#000000">
        <q-list>
          <q-item clickable v-close-popup @click="role = null">
            <q-item-section>
              <q-item-label>Todos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="role = 'Admin'">
            <q-item-section>
              <q-item-label>Admins</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="role = 'Enterprise'">
            <q-item-section>
              <q-item-label>Empresarios</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="role = 'Guard'">
            <q-item-section>
              <q-item-label>Guardias</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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
      <tbody v-if="!isLoading">
        <UserItem
          v-for="user in users"
          :key="user.id"
          :user="user"
          @refetch="refetch"
        />
      </tbody>
    </q-markup-table>

    <Pagination
      v-if="!isLoading"
      :currentPage="paginate.current_page"
      :maxPages="paginate.last_page"
      @handleRefetchPage="handleRefetchPage"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import CreateUser from "src/components/CreateUser.vue";
import Pagination from "src/components/helpers/Pagination.vue";
import UserItem from "src/components/users/UserItem.vue";
import { useUsers } from "src/hooks/api/users.hooks.js";

export default {
  components: {
    UserItem,
    CreateUser,
    Pagination,
    UserItem,
  },
  setup() {
    const { isLoading, refetch, users, paginate } = useUsers();
    const search = ref("");

    const role = ref(null)

    watch([role, search], () => {
      console.log(role.value)
      refetch({
        role: role.value,
        search: search.value,
      })
    })

    const handleRefetchPage = (page) => {
      refetch({role: role.value, page});
    };

    return {
      refetch,
      users,
      role,
      paginate,
      handleRefetchPage,
      isLoading,
      search,
    };
  },
};
</script>
