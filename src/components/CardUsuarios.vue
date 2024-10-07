<template>
    <q-card class="my-card q-mb-md">
      <q-card-section>
        <div class="row items-center q-gutter-sm">
          <!-- Avatar del usuario (Opcional) -->
          <q-avatar icon="person" color="primary" />
          <!-- Información básica del usuario -->
          <div class="column">
            <div class="text-h6">{{ usuario.name }}</div>
            <div class="text-subtitle1">{{ usuario.email }}</div>
            <div class="text-caption">{{ usuario.rol }}</div>
          </div>
        </div>
      </q-card-section>
  
      <q-card-actions align="right">
        <!-- Botón para editar el usuario -->
        <q-btn flat icon="edit" color="primary" @click="editUser(usuario)">
          Editar
        </q-btn>
        <!-- Botón para eliminar el usuario -->
        <q-btn flat icon="delete" color="negative" @click="deleteUser(usuario)">
          Eliminar
        </q-btn>
      </q-card-actions>
    </q-card>
  </template>
  
  <script>
  export default {
    props: {
      usuario: {
        type: Object,
        required: true,
      },
    },
    methods: {
      // Método para editar un usuario (puede abrir un modal o navegar a una página de edición)
      editUser(usuario) {
        // Aquí iría la lógica para editar el usuario
        this.$emit('edit', usuario); // Emitir un evento para manejar la edición en el componente padre
      },
      // Método para eliminar un usuario (emitir un evento o hacer una solicitud API)
      deleteUser(usuario) {
        if (confirm(`¿Estás seguro de que deseas eliminar a ${usuario.name}?`)) {
          this.$emit('delete', usuario); // Emitir un evento para manejar la eliminación en el componente padre
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .my-card {
    max-width: 400px;
  }
  </style>
  