<template>
    <!-- Botón para abrir la ventana emergente de notificaciones -->
    <q-btn flat   icon="mdi-bell" @click="showNotifications = true"/>
  
    <!-- Ventana emergente de notificaciones -->
    <q-dialog v-model="showNotifications" persistent>
      <q-card class="q-pa-md" style="min-width: 400px">
        <q-toolbar class="bg-grey-3 text-black">
          <q-toolbar-title>Notificaciones</q-toolbar-title>
  
          <q-btn icon="close" flat round @click="showNotifications = false" />
        </q-toolbar>
  
        <!-- Buscador de notificaciones -->
        <q-input rounded outlined dense class="q-mb-md" bg-color="white" v-model="search" placeholder="Buscar notificaciones">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
  
        <!-- Lista de notificaciones -->
        <q-list>
          <q-item
            v-for="(notification, index) in filteredNotifications"
            :key="notification.id"
            clickable
            v-ripple
            @click="showNotificationDetails(index)"
          >
            <q-item-section>
              <q-item-label>{{ notification.title }}</q-item-label>
              <q-item-label caption>{{ notification.description }}</q-item-label>
            </q-item-section>
  
            <q-item-section side>
              <q-item-label caption>{{ notification.time }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
  
        <!-- Detalles de la notificación seleccionada -->
        <q-card-section v-if="selectedNotification">
          <q-separator spaced />
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedNotification.title }}</q-item-label>
              <q-item-label caption>{{ selectedNotification.description }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-list>
            <q-item v-for="(detail, index) in selectedNotification.details" :key="index">
              <q-item-section>
                <q-item-label>{{ detail.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Controla la visibilidad de la ventana emergente
  const showNotifications = ref(false)
  
  // Datos de ejemplo para las notificaciones
  const notifications = ref([
    {
      id: 1,
      title: 'Sistema Actualizado',
      description: 'Se ha completado la actualización del sistema.',
      time: '15:00',
      details: [{ text: 'Se realizó la actualización a la versión 2.1.0' }]
    },
    {
      id: 2,
      title: 'Nueva Función Agregada',
      description: 'Se ha agregado una nueva función a tu panel de control.',
      time: '16:00',
      details: [{ text: 'La función de reportes ahora está disponible.' }]
    }
  ])
  
  const search = ref('') // Control del texto de búsqueda
  const selectedNotification = ref(null) // Almacena la notificación seleccionada
  
  // Filtra las notificaciones basado en la búsqueda
  const filteredNotifications = computed(() => {
    return notifications.value.filter(notification => 
      notification.title.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  
  // Muestra los detalles de la notificación seleccionada
  function showNotificationDetails(index) {
    selectedNotification.value = notifications.value[index]
  }
  </script>
  
  <style scoped>
  /* Ajustes simples de estilos para la ventana emergente */
  .q-card {
    max-height: 80vh;
    overflow-y: auto;
  }
  </style>
  