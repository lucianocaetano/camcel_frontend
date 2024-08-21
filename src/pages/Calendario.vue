<template>
    <q-page class="q-pa-md">
      <div class="row">
        <div class="col-6">
          <q-calendar
            v-model="selectedDate"
            @click-date="onDateClick"
            bordered
            color="primary"
            style="height: 50vh; width: 100%;
                   background-color: yellow;
                   display: inline-block;"
          />
        </div>
        <div class="col-6">
          <q-card style="height: 50vh;">
            <q-card-section>
              <div class="text-h6">Actividades para {{ selectedDate }}</div>
              <q-list bordered padding>
                <q-item
                  v-for="(activity, index) in activities[selectedDate] || []"
                  :key="index"
                  clickable
                  v-ripple
                >
                  <q-item-section>{{ activity }}</q-item-section>
                  <q-item-section side>
                    <q-btn dense icon="delete" @click="removeActivity(index)" />
                  </q-item-section>
                </q-item>
              </q-list>
              <div class="q-pa-sm">
                <q-input
                  v-model="newActivity"
                  label="Nueva Actividad"
                  outlined
                  dense
                  @keyup.enter="addActivity"
                />
                <q-btn
                  class="q-mt-sm"
                  label="Agregar Actividad"
                  color="primary"
                  @click="addActivity"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  const selectedDate = ref(new Date().toISOString().slice(0, 10)); // Fecha actual en formato ISO (YYYY-MM-DD)
  const newActivity = ref('');
  const activities = reactive({});
  
  function onDateClick(date) {
    selectedDate.value = date;
  }
  
  function addActivity() {
    if (newActivity.value.trim()) {
      if (!activities[selectedDate.value]) {
        activities[selectedDate.value] = [];
      }
      activities[selectedDate.value].push(newActivity.value);
      newActivity.value = '';
    }
  }
  
  function removeActivity(index) {
    activities[selectedDate.value].splice(index, 1);
  }
  </script>
