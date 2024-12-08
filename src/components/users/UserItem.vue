<template>
  <ValidDeleteUserMenu
    :show="validDeleteMenu"
    @handleDeleteMenuClose="handleDeleteUserMenuClose"
    @handleDeleteMenuAccept="handleDeleteUserMenuAccept"
  />

  <EditUser
    v-if="editUser"
    :show="editUser"
    @handleCloseEditUser="handleEditUserMenuClose"
    :user="user"
  />

  <tr class="cursor-pointer">
    <td class="text-left">{{ user.name }}</td>
    <td class="text-right">{{ user.email }}</td>
    <td class="text-right">{{ user.rol }}</td>
    <td class="text-right">
      <q-btn
        icon="edit"
        class="text-primary q-mr-md"
        @click="editUser = true"
      />
      <q-btn
        icon="delete"
        class="text-negative"
        @click="validDeleteMenu = true"
      />
    </td>
  </tr>
</template>

<script>
import { ref } from "vue";
import ValidDeleteUserMenu from "src/components/ValidDeleteMenu.vue";
import EditUser from "src/components/EditUser.vue";
import { useDeleteUser } from "src/hooks/api/users.hooks"

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    ValidDeleteUserMenu,
    EditUser,
  },
  setup(props, { emit }) {
    const editUser = ref(false);
    const validDeleteMenu = ref(false);

    const handleDeleteUser = async (id) => {
      await useDeleteUser(id);
    };

    const handleDeleteUserMenuClose = () => {
      validDeleteMenu.value = false;
    };

    const handleDeleteUserMenuAccept = () => {
      validDeleteMenu.value = false;
      handleDeleteUser(props.user.id);
      emit("refetch");
    };

    const handleEditUserMenuClose = () => {
      emit("refetch");
      editUser.value = false;
    };

    return {
      editUser,
      validDeleteMenu,
      handleDeleteUserMenuAccept,
      handleDeleteUserMenuClose,
      handleEditUserMenuClose,
    };
  },
};
</script>
