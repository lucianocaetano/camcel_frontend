<template>
    <h1>Holaaass</h1>
    
    <div class="fecha-hora-input">
      <div class="row">
        <q-input class="col-6" v-model="fechaInicio" label="Fecha Inicio" type="date" />
        <q-input class="col-6" v-model="fechaFin" label="Fecha Fin" type="date" />
      </div>
      <div class="row">
        <q-input filled v-model="timeE" label="Hora de entrada" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="timeE">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
  
        <q-input filled v-model="timeS" label="Hora de salida" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="timeS">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
 
  </script>
  
  <style scoped>
 
  </style>