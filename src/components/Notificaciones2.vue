<template>
    <!-- Header -->
    <div class="header">
      <q-toolbar class="bg-grey-3 text-black">
        <q-btn round flat>
          <q-avatar>
            <img :src="currentNotification.avatar">
          </q-avatar>
        </q-btn>
  
        <span class="q-subtitle-1 q-pl-md">
          {{ currentNotification.title }}
        </span>
  
        <q-space />
  
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-toolbar>
    </div>
  
    <!-- Sidebar / Drawer -->
    <div class="Drawer">
      <q-toolbar class="bg-grey-3">
        <q-avatar class="cursor-pointer">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
        </q-avatar>
        <q-space />
      </q-toolbar>
  
      <q-toolbar class="bg-grey-2">
        <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search" placeholder="Search notifications">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
  
      <q-scroll-area style="height: calc(100% - 100px)">
        <q-list>
          <q-item
            v-for="(notification, index) in notifications"
            :key="notification.id"
            clickable
            v-ripple
            @click="setCurrentNotification(index)"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="notification.avatar">
              </q-avatar>
            </q-item-section>
  
            <q-item-section>
              <q-item-label lines="1">
                {{ notification.title }}
              </q-item-label>
              <q-item-label class="notification__summary" caption>
                {{ notification.description }}
              </q-item-label>
            </q-item-section>
  
            <q-item-section side>
              <q-item-label caption>
                {{ notification.time }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  
    <!-- Notifications Area -->
    <q-page-container class="bg-grey-5 notifications-area">
      <q-scroll-area class="details-area">
        <q-list>
          <q-item v-for="(detail, index) in currentNotification.details" :key="index" class="notification-item">
            <q-item-section>
              <q-item-label>{{ detail.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-page-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Datos de ejemplo para las notificaciones
  const notifications = ref([
    {
      id: 1,
      title: 'Sistema Actualizado',
      avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
      description: 'Se ha completado la actualización del sistema.',
      time: '15:00',
      details: [{ text: 'Se realizó la actualización a la versión 2.1.0' }]
    },
    {
      id: 2,
      title: 'Nueva Función Agregada',
      avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
      description: 'Se ha agregado una nueva función a tu panel de control.',
      time: '16:00',
      details: [{ text: 'La función de reportes ahora está disponible.' }]
    }
  ])
  
  const currentNotificationIndex = ref(0)
  const currentNotification = computed(() => {
    return notifications.value[currentNotificationIndex.value]
  })
  
  const search = ref('')
  
  function setCurrentNotification(index) {
    currentNotificationIndex.value = index
  }
  </script>
  
  <style scoped>
  .Drawer {
    width: 25%;
    height: 100%;
    background-color: white;
    color: #000;
    top: 0%;
    position: absolute;
    z-index: 8;
  }
  
  .header {
    right: 0%;
    top: 0;
    width: 75%;
    height: 8%;
    position: absolute;
    z-index: 10;
  }
  
  .notifications-area {
    width: 88%;
    height: calc(100% - 9%);
    position: absolute;
    top: 0;
    right: 0;
    color: #000;
  }
  
  .details-area {
    height: 100%;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  
  .notification-item {
    max-width: 50%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  </style>
  