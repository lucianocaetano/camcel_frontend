<template>
  <q-page padding class="q-pa-md flex flex-center">
    <q-card class="q-pa-md" style="width: 100%; max-width: 1000px; min-height: 600px;">
      <q-card-section>
        <div class="text-h4 text-center q-mb-md">Configuración de Usuario</div>
      </q-card-section>

      <q-separator />

      <!-- Foto de perfil -->
      <q-card-section class="text-center">
        <div class="q-mb-lg">
          <q-avatar size="150px" rounded>
            <img :src="userProfile.photoUrl" alt="Foto de perfil" />
          </q-avatar>
        </div>
        <q-btn flat color="primary" label="Cambiar foto de perfil" icon="camera_alt" @click="triggerFileInput" />
        <input type="file" ref="fileInput" accept="image/*" @change="onFileSelected" style="display: none" />
      </q-card-section>

      <q-separator />

      <!-- Nombre -->
      <q-card-section class="q-px-lg">
        <div class="row items-center justify-between">
          <div class="col-auto text-body1 text-grey-8">
            <q-icon name="person" color="primary" class="q-mr-sm" /> Nombre
          </div>
          <div class="col text-center" style="display: flex; justify-content: flex-end;">
            <div v-if="!editField.name" class="text-right text-h6" style="flex-grow: 1;">{{ userProfile.name }}</div>
            <q-input
              v-else
              v-model="userProfile.name"
              label="Nombre"
              outlined
              dense
              class="q-mb-none"
              style="max-width: 500px; flex-grow: 1;"
            />
          </div>
          <q-icon
            name="edit"
            color="primary"
            @click="toggleEdit('name')"
            class="cursor-pointer q-ml-sm"
          />
        </div>
      </q-card-section>

      <q-separator />

      <!-- Correo Electrónico -->
      <q-card-section class="q-px-lg">
        <div class="row items-center justify-between">
          <div class="col-auto text-body1 text-grey-8">
            <q-icon name="email" color="primary" class="q-mr-sm" /> Correo Electrónico
          </div>
          <div class="col text-center" style="display: flex; justify-content: flex-end;">
            <div v-if="!editField.email" class="text-right text-h6" style="flex-grow: 1;">{{ userProfile.email }}</div>
            <q-input
              v-else
              v-model="userProfile.email"
              label="Correo Electrónico"
              outlined
              dense
              type="email"
              class="q-mb-none"
              style="max-width: 500px; flex-grow: 1;"
            />
          </div>
          <q-icon
            name="edit"
            color="primary"
            @click="toggleEdit('email')"
            class="cursor-pointer q-ml-sm"
          />
        </div>
      </q-card-section>

      <q-separator />

      <!-- Contraseña y Confirmar Contraseña -->
      <q-card-section class="q-px-lg">
        <div class="row items-center justify-between">
          <div class="col-auto text-body1 text-grey-8">
            <q-icon name="lock" color="primary" class="q-mr-sm" /> Contraseña
          </div>
          <div class="col text-center" style="display: flex; justify-content: flex-end;">
            <div v-if="!editField.password" class="text-right text-h6" style="flex-grow: 1;">********</div>
            <div v-else class="q-gutter-md row items-center justify-center" style="flex-grow: 1;">
              <q-input
                v-model="userProfile.password"
                label="Contraseña"
                outlined
                dense
                type="password"
                class="q-mb-none"
                style="max-width: 320px;"
              />
              <q-input
                v-model="userProfile.confirmPassword"
                label="Confirmar Contraseña"
                outlined
                dense
                type="password"
                class="q-mb-none"
                style="max-width: 320px;"
              />
            </div>
          </div>
          <q-icon
            name="edit"
            color="primary"
            @click="toggleEdit('password')"
            class="cursor-pointer q-ml-sm"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-center">
        <q-btn
          label="Guardar Cambios"
          color="primary"
          @click="saveChanges"
          :disable="isSaveDisabled"
          class="q-mt-md q-px-md"
          icon="save"
          push
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { useQuasar } from "quasar";

// Instancia de Quasar
const $q = useQuasar();

// Datos reactivos
const userProfile = reactive({
  name: "Juan Pérez",
  photoUrl: "https://via.placeholder.com/100", // URL inicial de ejemplo
  email: "juan.perez@example.com",
  password: "123456",
  confirmPassword: "",
});

// Control de edición para cada campo
const editField = reactive({
  name: false,
  email: false,
  password: false,
});

// Referencia para el input de archivo
const fileInput = ref(null);

// Computed para verificar si el botón de guardar está deshabilitado
const isSaveDisabled = computed(() => {
  return (
    (editField.password && userProfile.password !== userProfile.confirmPassword) ||
    !userProfile.name ||
    !userProfile.email
  );
});

// Métodos
function toggleEdit(field) {
  editField[field] = !editField[field];
}

function triggerFileInput() {
  fileInput.value.click();
}

function onFileSelected(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      userProfile.photoUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

function saveChanges() {
  if (editField.password && userProfile.password !== userProfile.confirmPassword) {
    $q.notify({
      color: "negative",
      position: "top",
      message: "Las contraseñas no coinciden",
      icon: "warning",
    });
    return;
  }

  $q.notify({
    color: "positive",
    position: "top",
    message: "Cambios guardados exitosamente",
    icon: "check",
  });

  // Desactivar todos los modos de edición después de guardar
  editField.name = false;
  editField.email = false;
  editField.password = false;
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>